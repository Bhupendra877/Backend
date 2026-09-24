const prisma = require('../lib/prisma');

async function findByUser(userId) {
  return prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
}

async function create(data) {
  return prisma.notification.create({ data });
}

async function markAsRead(id) {
  return prisma.notification.update({ where: { id }, data: { isRead: true } });
}

async function remove(id) {
  return prisma.notification.delete({ where: { id } });
}

module.exports = { findByUser, create, markAsRead, remove };
