const prisma = require('../lib/prisma');

async function findByUserAndTeam(userId, teamId) {
  return prisma.membership.findUnique({ where: { userId_teamId: { userId, teamId } } });
}

async function findByTeam(teamId) {
  return prisma.membership.findMany({ where: { teamId }, include: { user: true } });
}

async function create(data) {
  return prisma.membership.create({ data });
}

async function updateRole(id, role) {
  return prisma.membership.update({ where: { id }, data: { role } });
}

async function remove(id) {
  return prisma.membership.delete({ where: { id } });
}

module.exports = { findByUserAndTeam, findByTeam, create, updateRole, remove };
