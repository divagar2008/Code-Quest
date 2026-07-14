const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { badges: { include: { badge: true } } }
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      xp: user.xp,
      keys: user.keys,
      streak: user.streak,
      badges: user.badges.map(b => b.badge.name)
    };

    res.json(formattedUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
