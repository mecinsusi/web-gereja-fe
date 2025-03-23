import prisma from "../configuration/db";

export const createStoreIncome = async (storeIncome: any) => {
  const newStoreIncome = await prisma.$transaction(async (prisma) => {
    const createStoreIncome = await prisma.storeIncome.create({
      data: {
        id: storeIncome.id,
        detail: storeIncome.detail,
        funds: storeIncome.funds,
        storeIncomeTypeIdRel: {
          connectOrCreate: {
            where: {
              id: storeIncome.incomeTypeId,
            },
            create: {
              incomeTypeName: storeIncome.incomeTypeName,
              code: storeIncome.code,
              description: storeIncome.description,
            },
          },
        },
      }
    });
    return createStoreIncome;
  });
  return newStoreIncome;
};

export const updateStoreIncome = async (
  storeIncomeId: bigint,
  storeIncome: any,
) => {
  const newUpdatedStoreIncome = await prisma.$transaction(async (prisma) => {
    const currentStoreIncome = await prisma.storeIncome.findUnique({
      where: { id: storeIncomeId },
      include: {
        storeIncomeTypeIdRel: true,
      },
    });
    if (!currentStoreIncome) {
      throw new Error("StoreIncome not found.");
    }
    const updatedStoreIncome = await prisma.storeIncome.update({
      where: { id: storeIncomeId },
      data: {
        id: storeIncome.id,
        detail: storeIncome.detail,
        funds: storeIncome.funds,
        storeIncomeTypeIdRel: {
          update: {
            data: {
              incomeTypeName: storeIncome.incomeTypeName,
              description: storeIncome.description,
              code: storeIncome.code
            },
          },
        },
      }
    });
    await prisma.storeIncomeHistory.create({
      data: {
        id: currentStoreIncome.id,
        detail: currentStoreIncome.detail,
        funds: currentStoreIncome.funds,
        incomeTypeId: currentStoreIncome.incomeTypeId,
        createAt: currentStoreIncome.createAt,
        updatedAt: new Date(),
      },
    });
    return updatedStoreIncome;
  });
  return newUpdatedStoreIncome;
};

export const patchStoreIncome = async (
  storeIncomeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedStoreIncome = await prisma.storeIncome.update({
    where: { id: storeIncomeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedStoreIncome;
};

export const deleteStoreIncome = async (storeIncomeId: bigint) => {
  const deletedStoreIncome = await prisma.storeIncome.delete({
    where: { id: storeIncomeId },
  });
  console.log(`DELETE_INCOME_`, deletedStoreIncome);
  return deletedStoreIncome;
};

export const getStoreIncome = async (storeIncomeId: bigint) => {
  const storeIncome = await prisma.storeIncome.findUnique({
    where: { id: storeIncomeId },
    include: {
      storeIncomeTypeIdRel: true,
    },
  });
  return storeIncome;
};

export const getAllStoreIncome = async (props: {
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
  const allStoreIncome = await prisma.storeIncome.findMany({
    where: {
      ...filter,
    },
    include: {
      storeIncomeTypeIdRel: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return allStoreIncome;
}

