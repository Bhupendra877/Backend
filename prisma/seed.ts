import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.notification.deleteMany();
  await prisma.task.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: { email: 'alice@example.com', name: 'Alice', password: 'hashed-password-1' },
  });

  const bob = await prisma.user.create({
    data: { email: 'bob@example.com', name: 'Bob', password: 'hashed-password-2' },
  });

  const team = await prisma.team.create({
    data: { name: 'Backend Mastery Team' },
  });

  await prisma.membership.create({
    data: { userId: alice.id, teamId: team.id, role: 'OWNER' },
  });

  await prisma.membership.create({
    data: { userId: bob.id, teamId: team.id, role: 'MEMBER' },
  });

  const task = await prisma.task.create({
    data: {
      title: 'Set up database schema',
      description: 'Define models and run first migration',
      status: 'DONE',
      teamId: team.id,
      createdById: alice.id,
      assignedToId: bob.id,
    },
  });

  await prisma.notification.create({
    data: {
      type: 'TASK_ASSIGNED',
      message: `You have been assigned: ${task.title}`,
      userId: bob.id,
      taskId: task.id,
    },
  });

  console.log('Seed data created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
