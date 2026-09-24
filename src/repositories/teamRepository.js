const prisma = require('../lib/prisma');

async function findById(id) {
  return prisma.team.findUnique({ where: { id }, include: { memberships: true } });
}

async function findAll() {
  return prisma.team.findMany();
}

async function create(data) {
  return prisma.team.create({ data });
}

async function update(id, data) {
  return prisma.team.update({ where: { id }, data });
}

async function remove(id) {
  return prisma.team.delete({ where: { id } });
}

module.exports = { findById, findAll, create, update, remove };
