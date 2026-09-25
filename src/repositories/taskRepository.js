const prisma = require('../lib/prisma');

async function findById(id) {
  return prisma.task.findUnique({ where: { id } });
}

async function findByTeam(teamId) {
  return prisma.task.findMany({ where: { teamId } });
}

async function findByAssignee(assignedToId) {
  return prisma.task.findMany({ where: { assignedToId } });
}

async function create(data) {
  return prisma.task.create({ data });
}

async function update(id, data) {
  return prisma.task.update({ where: { id }, data });
}

async function remove(id) {
  return prisma.task.delete({ where: { id } });
}

module.exports = { findById, findByTeam, findByAssignee, create, update, remove };
