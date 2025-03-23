import prisma from "../configuration/db";

export const createChurchIncomeType = async (churchIncomeType: any) => {
  const newChurchIncomeType = await prisma.$transaction(async (prisma) => {
    const createChurchIncomeType = await prisma.churchIncomeType.create({
      data: {
        id: churchIncomeType.id,
        incomeTypeName: churchIncomeType.incomeTypeName,
        code: churchIncomeType.code,
        description: churchIncomeType.description,
      }
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
export const getAllChurchIncomeType = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.search) {
    filter.incomeTypeName = { contains: props.search, mode: "insensitive" };
  }
  const allIncomeType = await prisma.churchIncomeType.findMany({
    where: { ...filter},
    orderBy: { incomeTypeName: "asc" },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalIncomeType = await prisma.churchIncomeType.count({
    where: { ...filter},
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
