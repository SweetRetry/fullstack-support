import { prisma } from "./client";

async function main() {
  // 创建权限
  const createPermission = async (name: string, description: string) => {
    return prisma.permission.create({
      data: {
        name,
        description,
      },
    });
  };

  const permissions = await Promise.all([
    createPermission("article:edit", "Editing Article"),
    createPermission("article:review", "Reviewing Article"),
    createPermission("article:publish", "Publishing Article"),
    createPermission("article:delete", "Deleting Article"),
  ]);

  // 创建角色
  const role = await prisma.role.create({
    data: {
      name: "superAdmin",
      description: "Super Admin",
      permissions: {
        connect: permissions,
      },
    },
  });

  // 创建用户
  await prisma.user.create({
    data: {
      email: "admin@test.com",
      password: "admin123",
      roleId: role.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
