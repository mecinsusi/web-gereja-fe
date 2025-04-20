import prisma from "../configuration/db";
import { ChurchSpendingTypeCreateParams } from "../types/churchSpendingType";

export const createChurchSpendingType = async (
  churchSpendingType: ChurchSpendingTypeCreateParams,
) => {
  const newChurchSpendingType = await prisma.$transaction(async (prisma) => {
    const createChurchSpendingType = await prisma.churchSpendingType.create({
      data: {
        id: churchSpendingType.id,
        spendingTypeName: churchSpendingType.spendingTypeName,
        code: churchSpendingType.code,
        description: churchSpendingType.description,
      },
    });
    return createChurchSpendingType;
  });
  return newChurchSpendingType;
};

export const updateChurchSpendingType = async (
  incomeTypeId: bigint,
  incomeType: any,
) => {
  const updatedIncomeType = await prisma.churchSpendingType.update({
    where: { id: incomeTypeId },
    data: {
      spendingTypeName: incomeType?.spendingTypeName,
      code: incomeType?.code,
      description: incomeType?.description,
    },
  });
  return updatedIncomeType;
};

export const patchChurchSpendingType = async (
  churchSpendingTypeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedChurchSpendingType = await prisma.churchIncomeType.update({
    where: { id: churchSpendingTypeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedChurchSpendingType;
};

export const deleteChurchSpendingType = async (
  churchSpendingTypeId: bigint,
) => {
  const deletedChurchSpendingType = await prisma.churchSpendingType.delete({
    where: { id: churchSpendingTypeId },
  });
  console.log(`DELETE_SPENDING_`, deletedChurchSpendingType);
  return deletedChurchSpendingType;
};

export const getChurchSpendingType = async (churchSpendingTypeId: bigint) => {
  const churchSpendingTypeType = await prisma.churchSpendingType.findUnique({
    where: { id: churchSpendingTypeId },
  });
  return churchSpendingTypeType;
};

export const getAllChurchSpendingType = async () => {
  const where: any = { deleted: false };
  return await prisma.churchSpendingType.findMany({
    where,
  });
};

export const checkSpendingTypeName = async (spendingType: {
  spendingTypeName: string;
}) => {
  const newSpendingType = await prisma.churchSpendingType.findFirst({
    where: {
      spendingTypeName: spendingType.spendingTypeName,
    },
  });
  return newSpendingType;
};

export const checkSpendingTypeExists = async (
  spendingTypeId: bigint,
): Promise<boolean> => {
  const count = await prisma.churchSpendingType.count({
    where: {
      id: spendingTypeId,
    },
  });
  return count > 0;
};
