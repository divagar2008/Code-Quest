const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@codequest.com' },
    update: {},
    create: {
      email: 'admin@codequest.com',
      passwordHash: adminPassword,
      name: 'Admin Master',
      role: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    }
  });

  // Seed Student
  const studentPassword = await bcrypt.hash('student123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@codequest.com' },
    update: {},
    create: {
      email: 'student@codequest.com',
      passwordHash: studentPassword,
      name: 'Alex Student',
      role: 'Student',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      xp: 450,
      keys: 2,
      streak: 3
    }
  });

  console.log("Database seeded:", { admin: admin.email, student: student.email });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
