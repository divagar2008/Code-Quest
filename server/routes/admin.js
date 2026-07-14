const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/students', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'Student' },
      orderBy: { xp: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        xp: true,
        keys: true,
        streak: true,
        createdAt: true,
        _count: {
          select: { submissions: true }
        }
      }
    });

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
