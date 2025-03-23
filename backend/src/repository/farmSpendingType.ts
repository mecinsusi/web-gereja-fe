import prisma from "../configuration/db";

export const createFarmSpendingType = async (farmSpendingType: any) => {
  const newFarmSpendingType = await prisma.$transaction(async (prisma) => {
    const createFarmSpendingType = await prisma.farmSpendingType.create({
      data: {
        id: farmSpendingType.id,
        spendingTypeName: farmSpendingType.incomeTypeName,
        code: farmSpendingType.code,
        description: farmSpendingType.description,
      }
    });
    return createFarmSpendingType;
  });
  return newFarmSpendingType;
};

export const updateFarmSpendingType = async (
  incomeTypeId: bigint,
  incomeType: any,
) => {
  const updatedIncomeType = await prisma.farmSpendingType.update({
    where: { id: incomeTypeId },
    data: {
      spendingTypeName: incomeType?.spendingTypeName,
      code: incomeType?.code,
      description: incomeType?.description,
    },
  });
  return updatedIncomeType;
};

export const patchFarmSpendingType = async (
  farmSpendingTypeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedFarmSpendingType = await prisma.farmIncomeType.update({
    where: { id: farmSpendingTypeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedFarmSpendingType;
};

export const deleteFarmSpendingType = async (farmSpendingTypeId: bigint) => {
  const deletedFarmSpendingType = await prisma.farmIncomeType.delete({
    where: { id: farmSpendingTypeId },
  });
  console.log(`DELETE_SPENDING_`, deletedFarmSpendingType);
  return deletedFarmSpendingType;
};

export const getFarmSpendingType = async (farmSpendingTypeId: bigint) => {
  const farmSpendingTypeType = await prisma.farmSpendingType.findUnique({
    where: { id: farmSpendingTypeId },
  });
  return farmSpendingTypeType;
};

export const getAllFarmSpendingType = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.search) {
    filter.spendingTypeName = { contains: props.search, mode: "insensitive" };
  }
  const allIncomeType = await prisma.farmSpendingType.findMany({
    where: { ...filter },
    orderBy: { spendingTypeName: "asc" },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalIncomeType = await prisma.farmSpendingType.count({
    where: { ...filter },
  });
  return {
    incomeType: allIncomeType,
    currentPage: page,
    totalPage: Math.ceil(totalIncomeType / limit),
  };
};

export const checkSpendingTypeName = async (spendingType: {
  spendingTypeName: string;
}) => {
  const newSpendingType = await prisma.farmSpendingType.findFirst({
    where: {
      spendingTypeName: spendingType.spendingTypeName,
    },
  });
  return newSpendingType;
};

export const checkSpendingTypeExists = async (
  spendingTypeId: bigint,
): Promise<boolean> => {
  const count = await prisma.farmSpendingType.count({
    where: {
      id: spendingTypeId,
    },
  });
  return count > 0;
};
