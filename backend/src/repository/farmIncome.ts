import prisma from "../configuration/db";

export const createFarmIncome = async (farmIncome: any) => {
  const newFarmIncome = await prisma.$transaction(async (prisma) => {
    const createFarmIncome = await prisma.farmIncome.create({
      data: {
        id: farmIncome.id,
        detail: farmIncome.detail,
        price: farmIncome.funds,
        amount: farmIncome.amount,
        farmIncomeTypeIdRel: {
          connectOrCreate: {
            where: {
              id: farmIncome.incomeTypeId,
            },
            create: {
              incomeTypeName: farmIncome.incomeTypeName,
              code: farmIncome.code,
              description: farmIncome.description,
            },
          },
        },
      }
    });
    return createFarmIncome;
  });
  return newFarmIncome;
};

export const updateFarmIncome = async (
  farmIncomeId: bigint,
  farmIncome: any,
) => {
  const newUpdatedFarmIncome = await prisma.$transaction(async (prisma) => {
    const currentFarmIncome = await prisma.farmIncome.findUnique({
      where: { id: farmIncomeId },
      include: {
        farmIncomeTypeIdRel: true,
      },
    });
    if (!currentFarmIncome) {
      throw new Error("FarmIncome not found.");
    }
    const updatedFarmIncome = await prisma.farmIncome.update({
      where: { id: farmIncomeId },
      data: {
        id: farmIncome.id,
        detail: farmIncome.detail,
        price: farmIncome.price,
        amount: farmIncome.amount,
        farmIncomeTypeIdRel: {
          update: {
            data: {
              incomeTypeName: farmIncome.incomeTypeName,
              description: farmIncome.description,
              code: farmIncome.code
            },
          },
        },
      }
    });
    await prisma.farmIncomeHistory.create({
      data: {
        id: currentFarmIncome.id,
        detail: currentFarmIncome.detail,
        price: currentFarmIncome.price,
        amount: currentFarmIncome.amount,
        incomeTypeId: currentFarmIncome.incomeTypeId,
        createAt: currentFarmIncome.createAt,
        updatedAt: new Date(),
      },
    });
    return updatedFarmIncome;
  });
  return newUpdatedFarmIncome;
};

export const patchFarmIncome = async (
  farmIncomeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedFarmIncome = await prisma.farmIncome.update({
    where: { id: farmIncomeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedFarmIncome;
};

export const deleteFarmIncome = async (farmIncomeId: bigint) => {
  const deletedFarmIncome = await prisma.farmIncome.delete({
    where: { id: farmIncomeId },
  });
  console.log(`DELETE_INCOME_`, deletedFarmIncome);
  return deletedFarmIncome;
};

export const getFarmIncome = async (farmIncomeId: bigint) => {
  const farmIncome = await prisma.farmIncome.findUnique({
    where: { id: farmIncomeId },
    include: {
      farmIncomeTypeIdRel: true,
    },
  });
  return farmIncome;
};

export const getAllFarmIncome = async (props: {
  incomeTypeId: bigint | null;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.incomeTypeId != null) {
    filter.incomeTypeId = props.incomeTypeId;
  }
  if (props.search) {
    filter.inventoryName = { contains: props.search, mode: "insensitive" };
  }
  const allFarmIncome = await prisma.farmIncome.findMany({
    where: {
      ...filter,
    },
    include: {
      farmIncomeTypeIdRel: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return allFarmIncome;
}

