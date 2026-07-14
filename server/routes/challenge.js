const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/daily', authenticateToken, async (req, res) => {
  try {
    // In a real app, this would fetch based on the date.
    // For prototype, just returning the first one or a mock one.
    let challenge = await prisma.challenge.findFirst();
    
    if (!challenge) {
      // Seed a challenge if DB is empty
      challenge = await prisma.challenge.create({
        data: {
          title: 'Array Reversal Algorithm',
          type: 'Coding Problem',
          difficulty: 'Medium',
          xpReward: 150,
          content: 'Write a function reverse_array(arr) that takes a list of integers and returns a new list with the elements in reverse order.',
        }
      });
    }
    
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const { challengeId, passed, score } = req.body;
    
    // Execute a Prisma transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      const challenge = await tx.challenge.findUnique({ where: { id: challengeId } });
      if (!challenge) throw new Error('Challenge not found');

      // Record submission
      await tx.submission.create({
        data: {
          userId: req.user.userId,
          challengeId,
          status: passed ? 'passed' : 'failed',
          score: score || 0
        }
      });

      if (passed) {
        // Update user XP and Keys
        const updatedUser = await tx.user.update({
          where: { id: req.user.userId },
          data: {
            xp: { increment: challenge.xpReward },
            keys: { increment: 1 },
            streak: { increment: 1 } // Simplified streak logic
          }
        });
        return { success: true, reward: challenge.xpReward, newXp: updatedUser.xp, keys: updatedUser.keys };
      }
      return { success: false };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
