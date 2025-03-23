import prisma from "../configuration/db";

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
