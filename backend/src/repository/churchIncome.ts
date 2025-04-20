import prisma from "../configuration/db";
import {
  ChurchIncomeCreateParams,
  ChurchIncomeUpdateParams,
} from "../types/churchIncome";

export const createChurchIncome = async (
  churchIncome: ChurchIncomeCreateParams,
) => {
  const newChurchIncome = await prisma.$transaction(async (prisma) => {
    const createChurchIncome = await prisma.churchIncome.create({
      data: {
        id: churchIncome.id,
        detail: churchIncome.detail,
        funds: churchIncome.funds,
        date: churchIncome.date,
        churchIncomeTypeIdRel: {
          connectOrCreate: {
            where: {
              id: churchIncome.incomeTypeId,
            },
            create: {
              incomeTypeName: churchIncome.incomeTypeName,
              code: churchIncome.code,
              description: churchIncome.description,
            },
          },
        },
      },
    });
    return createChurchIncome;
  });
  return newChurchIncome;
};

export const updateChurchIncome = async (
  churchIncomeId: bigint,
  churchIncome: ChurchIncomeUpdateParams,
) => {
  const newUpdatedChurchIncome = await prisma.$transaction(async (prisma) => {
    const currentChurchIncome = await prisma.churchIncome.findUnique({
      where: { id: churchIncomeId },
      include: {
        churchIncomeTypeIdRel: true,
      },
    });
    if (!currentChurchIncome) {
      throw new Error("ChurchIncome not found.");
    }
    const updatedChurchIncome = await prisma.churchIncome.update({
      where: { id: churchIncomeId },
      data: {
        id: churchIncome.id,
        detail: churchIncome.detail,
        funds: churchIncome.funds,
        date: churchIncome.date,
        churchIncomeTypeIdRel: {
          update: {
            data: {
              incomeTypeName: churchIncome.incomeTypeName,
              description: churchIncome.description,
              code: churchIncome.code,
            },
          },
        },
      },
    });
    await prisma.churchIncomeHistory.create({
      data: {
        id: currentChurchIncome.id,
        detail: currentChurchIncome.detail,
        funds: currentChurchIncome.funds,
        date: currentChurchIncome.date,
        incomeTypeId: currentChurchIncome.incomeTypeId,
        createAt: currentChurchIncome.createAt,
        updatedAt: new Date(),
      },
    });
    return updatedChurchIncome;
  });
  return newUpdatedChurchIncome;
};

export const patchChurchIncome = async (
  churchIncomeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedChurchIncome = await prisma.churchIncome.update({
    where: { id: churchIncomeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedChurchIncome;
};

export const deleteChurchIncome = async (churchIncomeId: bigint) => {
  const deletedChurchIncome = await prisma.churchIncome.delete({
    where: { id: churchIncomeId },
  });
  console.log(`DELETE_INCOME_`, deletedChurchIncome);
  return deletedChurchIncome;
};

export const getChurchIncome = async (churchIncomeId: bigint) => {
  const churchIncome = await prisma.churchIncome.findUnique({
    where: { id: churchIncomeId },
    include: {
      churchIncomeTypeIdRel: true,
    },
  });
  return churchIncome;
};

export const getAllChurchIncome = async () => {
  const where: any = { deleted: false };

  return await prisma.churchIncome.findMany({
    where,
    include: { churchIncomeTypeIdRel: true },
    orderBy: {
      date: "desc",
    },
  });
};
