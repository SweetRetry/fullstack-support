"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// src/client.ts
var client_exports = {};
__export(client_exports, {
  prisma: () => prisma
});
var import_client = require("@prisma/client");
__reExport(client_exports, require("@prisma/client"));
var prisma = global.prisma || new import_client.PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// src/seed.ts
async function main() {
  const createPermission = async (name, description) => {
    return prisma.permission.create({
      data: {
        name,
        description
      }
    });
  };
  const permissions = await Promise.all([
    createPermission("article:edit", "Editing Article"),
    createPermission("article:review", "Reviewing Article"),
    createPermission("article:publish", "Publishing Article"),
    createPermission("article:delete", "Deleting Article"),
    createPermission("role:create", "Creating Role"),
    createPermission("role:edit", "Editing Role"),
    createPermission("role:delete", "Deleting Role"),
    createPermission("user:create", "Creating User"),
    createPermission("user:edit", "Editing User"),
    createPermission("user:delete", "Deleting User"),
    createPermission("user:resetPassword", "Resetting Password")
  ]);
  const role = await prisma.role.create({
    data: {
      name: "superAdmin",
      description: "Super Admin",
      editable: false,
      permissions: {
        connect: permissions
      }
    }
  });
  await prisma.user.create({
    data: {
      email: "admin@test.com",
      password: "admin123",
      role: {
        connect: role
      }
    }
  });
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
