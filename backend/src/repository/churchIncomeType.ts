import { ChurchIncomeTypeCreateParams } from "../types/churchIncomeType";
import prisma from "../configuration/db";

export const createChurchIncomeType = async (
  churchIncomeType: ChurchIncomeTypeCreateParams,
) => {
  const newChurchIncomeType = await prisma.$transaction(async (prisma) => {
    const createChurchIncomeType = await prisma.churchIncomeType.create({
      data: {
        id: churchIncomeType.id,
        incomeTypeName: churchIncomeType.incomeTypeName,
        code: churchIncomeType.code,
        description: churchIncomeType.description,
      },
    });
    return createChurchIncomeType;
  });
  return newChurchIncomeType;
};

export const patchChurchIncomeType = async (
  churchIncomeTypeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedChurchIncomeType = await prisma.churchIncomeType.update({
    where: { id: churchIncomeTypeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedChurchIncomeType;
};
export const updateChurchIncomeType = async (
  incomeTypeId: bigint,
  incomeType: any,
) => {
  const updatedIncomeType = await prisma.churchIncomeType.update({
    where: { id: incomeTypeId },
    data: {
      incomeTypeName: incomeType?.incomeTypeName,
      code: incomeType?.code,
      description: incomeType?.description,
    },
  });
  return updatedIncomeType;
};

export const deleteChurchIncomeType = async (churchIncomeTypeId: bigint) => {
  const deletedChurchIncomeType = await prisma.churchIncomeType.delete({
    where: { id: churchIncomeTypeId },
  });
  console.log(`DELETE_INCOME_`, deletedChurchIncomeType);
  return deletedChurchIncomeType;
};

export const getChurchIncomeType = async (churchIncomeTypeTypeId: bigint) => {
  const churchIncomeTypeType = await prisma.churchIncomeType.findUnique({
    where: { id: churchIncomeTypeTypeId },
  });
  return churchIncomeTypeType;
};

export const getAllChurchIncomeType = async () => {
  const where: any = { deleted: false };
  return await prisma.churchIncomeType.findMany({
    where,
  });
};

export const checkIcomeTypeName = async (incomeType: {
  incomeTypeName: string;
}) => {
  const newIncomeType = await prisma.churchIncomeType.findFirst({
    where: {
      incomeTypeName: incomeType.incomeTypeName,
    },
  });
  return newIncomeType;
};

export const checkIncomeTypeExists = async (
  incomeTypeId: bigint,
): Promise<boolean> => {
  const count = await prisma.churchIncomeType.count({
    where: {
      id: incomeTypeId,
    },
  });
  return count > 0;
};
