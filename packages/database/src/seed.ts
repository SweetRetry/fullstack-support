// generate db init
import { prisma } from "./client";

function initUser() {
  return prisma.user.create({
    data: {
      email: "admin@test.com",
      password: "admintest",
    },
  });
}

initUser();
