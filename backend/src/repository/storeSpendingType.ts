import prisma from "../configuration/db";

export const createStoreSpendingType = async (storeSpendingType: any) => {
  const newStoreSpendingType = await prisma.$transaction(async (prisma) => {
    const createStoreSpendingType = await prisma.storeSpendingType.create({
      data: {
        id: storeSpendingType.id,
        spendingTypeName: storeSpendingType.incomeTypeName,
        code: storeSpendingType.code,
        description: storeSpendingType.description,
      }
    });
    return createStoreSpendingType;
  });
  return newStoreSpendingType;
};

export const updateStoreSpendingType = async (
  incomeTypeId: bigint,
  incomeType: any,
) => {
  const updatedIncomeType = await prisma.storeSpendingType.update({
    where: { id: incomeTypeId },
    data: {
      spendingTypeName: incomeType?.spendingTypeName,
      code: incomeType?.code,
      description: incomeType?.description,
    },
  });
  return updatedIncomeType;
};

export const patchStoreSpendingType = async (
  storeSpendingTypeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedStoreSpendingType = await prisma.storeIncomeType.update({
    where: { id: storeSpendingTypeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedStoreSpendingType;
};

export const deleteStoreSpendingType = async (storeSpendingTypeId: bigint) => {
  const deletedStoreSpendingType = await prisma.storeIncomeType.delete({
    where: { id: storeSpendingTypeId },
  });
  console.log(`DELETE_SPENDING_`, deletedStoreSpendingType);
  return deletedStoreSpendingType;
};

export const getStoreSpendingType = async (storeSpendingTypeId: bigint) => {
  const storeSpendingTypeType = await prisma.storeSpendingType.findUnique({
    where: { id: storeSpendingTypeId },
  });
  return storeSpendingTypeType;
};

export const getAllStoreSpendingType = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.search) {
    filter.spendingTypeName = { contains: props.search, mode: "insensitive" };
  }
  const allIncomeType = await prisma.storeSpendingType.findMany({
    where: { ...filter },
    orderBy: { spendingTypeName: "asc" },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalIncomeType = await prisma.storeSpendingType.count({
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
  const newSpendingType = await prisma.storeSpendingType.findFirst({
    where: {
      spendingTypeName: spendingType.spendingTypeName,
    },
  });
  return newSpendingType;
};

export const checkSpendingTypeExists = async (
  spendingTypeId: bigint,
): Promise<boolean> => {
  const count = await prisma.storeSpendingType.count({
    where: {
      id: spendingTypeId,
    },
  });
  return count > 0;
};
