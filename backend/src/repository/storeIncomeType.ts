import prisma from "../configuration/db";

export const createStoreIncomeType = async (storeIncomeType: any) => {
  const newStoreIncomeType = await prisma.$transaction(async (prisma) => {
    const createStoreIncomeType = await prisma.storeIncomeType.create({
      data: {
        id: storeIncomeType.id,
        incomeTypeName: storeIncomeType.incomeTypeName,
        code: storeIncomeType.code,
        description: storeIncomeType.description,
      }
    });
    return createStoreIncomeType;
  });
  return newStoreIncomeType;
};

export const updateStoreIncomeType = async (
  incomeTypeId: bigint,
  incomeType: any,
) => {
  const updatedIncomeType = await prisma.storeIncomeType.update({
    where: { id: incomeTypeId },
    data: {
      incomeTypeName: incomeType?.incomeTypeName,
      code: incomeType?.code,
      description: incomeType?.description,
    },
  });
  return updatedIncomeType;
};

export const patchStoreIncomeType = async (
  storeIncomeTypeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedStoreIncomeType = await prisma.storeIncomeType.update({
    where: { id: storeIncomeTypeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedStoreIncomeType;
};

export const deleteStoreIncomeType = async (storeIncomeTypeId: bigint) => {
  const deletedStoreIncomeType = await prisma.storeIncomeType.delete({
    where: { id: storeIncomeTypeId },
  });
  console.log(`DELETE_INCOME_`, deletedStoreIncomeType);
  return deletedStoreIncomeType;
};

export const getStoreIncomeType = async (storeIncomeTypeTypeId: bigint) => {
  const storeIncomeTypeType = await prisma.churchIncomeType.findUnique({
    where: { id: storeIncomeTypeTypeId },
  });
  return storeIncomeTypeType;
};

export const getAllStoreIncomeType = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.search) {
    filter.incomeTypeName = { contains: props.search, mode: "insensitive" };
  }
  const allIncomeType = await prisma.storeIncomeType.findMany({
    where: { ...filter },
    orderBy: { incomeTypeName: "asc" },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalIncomeType = await prisma.storeIncomeType.count({
    where: { ...filter },
  });
  return {
    incomeType: allIncomeType,
    currentPage: page,
    totalPage: Math.ceil(totalIncomeType / limit),
  };
};


export const checkIcomeTypeName = async (incomeType: {
  incomeTypeName: string;
}) => {
  const newIncomeType = await prisma.storeIncomeType.findFirst({
    where: {
      incomeTypeName: incomeType.incomeTypeName,
    },
  });
  return newIncomeType;
};

export const checkIncomeTypeExists = async (
  incomeTypeId: bigint,
): Promise<boolean> => {
  const count = await prisma.storeIncomeType.count({
    where: {
      id: incomeTypeId,
    },
  });
  return count > 0;
};
