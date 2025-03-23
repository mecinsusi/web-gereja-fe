import prisma from "../configuration/db";

export const createFarmIncomeType = async (farmIncomeType: any) => {
  const newFarmIncomeType = await prisma.$transaction(async (prisma) => {
    const createFarmIncomeType = await prisma.farmIncomeType.create({
      data: {
        id: farmIncomeType.id,
        incomeTypeName: farmIncomeType.incomeTypeName,
        code: farmIncomeType.code,
        description: farmIncomeType.description,
      }
    });
    return createFarmIncomeType;
  });
  return newFarmIncomeType;
};


export const updateFarmIncomeType = async (
  incomeTypeId: bigint,
  incomeType: any,
) => {
  const updatedIncomeType = await prisma.farmIncomeType.update({
    where: { id: incomeTypeId },
    data: {
      incomeTypeName: incomeType?.incomeTypeName,
      code: incomeType?.code,
      description: incomeType?.description,
    },
  });
  return updatedIncomeType;
};

export const patchFarmIncomeType = async (
  farmIncomeTypeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedFarmIncomeType = await prisma.farmIncomeType.update({
    where: { id: farmIncomeTypeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedFarmIncomeType;
};

export const deleteFarmIncomeType = async (farmIncomeTypeId: bigint) => {
  const deletedFarmIncomeType = await prisma.farmIncomeType.delete({
    where: { id: farmIncomeTypeId },
  });
  console.log(`DELETE_INCOME_`, deletedFarmIncomeType);
  return deletedFarmIncomeType;
};

export const getFarmIncomeType = async (farmIncomeTypeTypeId: bigint) => {
  const farmIncomeTypeType = await prisma.churchIncomeType.findUnique({
    where: { id: farmIncomeTypeTypeId },
  });
  return farmIncomeTypeType;
};

export const getAllFarmIncomeType = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.search) {
    filter.incomeTypeName = { contains: props.search, mode: "insensitive" };
  }
  const allIncomeType = await prisma.farmIncomeType.findMany({
    where: { ...filter },
    orderBy: { incomeTypeName: "asc" },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalIncomeType = await prisma.farmIncomeType.count({
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
  const newIncomeType = await prisma.farmIncomeType.findFirst({
    where: {
      incomeTypeName: incomeType.incomeTypeName,
    },
  });
  return newIncomeType;
};

export const checkIncomeTypeExists = async (
  incomeTypeId: bigint,
): Promise<boolean> => {
  const count = await prisma.farmIncomeType.count({
    where: {
      id: incomeTypeId,
    },
  });
  return count > 0;
};
