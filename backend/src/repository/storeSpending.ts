import prisma from "../configuration/db";

export const createStoreSpending = async (storeSpending: any) => {
  const newStoreSpending = await prisma.$transaction(async (prisma) => {
    const createStoreSpending = await prisma.storeSpending.create({
      data: {
        id: storeSpending.id,
        detail: storeSpending.detail,
        funds: storeSpending.funds,
        storeSpendingTypeIdRel: {
          connectOrCreate: {
            where: {
              id: storeSpending.incomeTypeId,
            },
            create: {
              spendingTypeName: storeSpending.spendingTypeName,
              code: storeSpending.code,
              description: storeSpending.description,
            },
          },
        },
      }
    });
    return createStoreSpending;
  });
  return newStoreSpending;
};

export const updateStoreSpending = async (
  storeSpendingId: bigint,
  storeSpending: any,
) => {
  const newUpdatedStoreSpending = await prisma.$transaction(async (prisma) => {
    const currentStoreSpending = await prisma.storeSpending.findUnique({
      where: { id: storeSpendingId },
      include: {
        storeSpendingTypeIdRel: true,
      },
    });
    if (!currentStoreSpending) {
      throw new Error("StoreSpending not found.");
    }
    const updatedStoreSpending = await prisma.storeSpending.update({
      where: { id: storeSpendingId },
      data: {
        id: storeSpending.id,
        detail: storeSpending.detail,
        funds: storeSpending.funds,
        storeSpendingTypeIdRel: {
          update: {
            data: {
              spendingTypeName: storeSpending.spendingTypeName,
              description: storeSpending.description,
              code: storeSpending.code
            },
          },
        },
      }
    });
    await prisma.storeSpendingHistory.create({
      data: {
        id: currentStoreSpending.id,
        detail: currentStoreSpending.detail,
        funds: currentStoreSpending.funds,
        spendingTypeId: currentStoreSpending.spendingTypeId,
        createAt: currentStoreSpending.createAt,
        updatedAt: new Date(),
      },
    });
    return updatedStoreSpending;
  });
  return newUpdatedStoreSpending;
};

export const patchStoreSpending = async (
  storeSpendingId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedStoreSpending = await prisma.storeSpending.update({
    where: { id: storeSpendingId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedStoreSpending;
};

export const deleteStoreSpending = async (storeSpendingId: bigint) => {
  const deletedStoreSpending = await prisma.storeSpending.delete({
    where: { id: storeSpendingId },
  });
  console.log(`DELETE_SPENDING_`, deletedStoreSpending);
  return deletedStoreSpending;
};

export const getStoreSpending = async (storeSpendingId: bigint) => {
  const storeSpending = await prisma.storeSpending.findUnique({
    where: { id: storeSpendingId },
    include: {
      storeSpendingTypeIdRel: true,
    },
  });
  return storeSpending;
};

export const getAllStoreSpending = async (props: {
  spendingTypeId: bigint | null;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { page = 1, limit = 10 } = props;
  const filter = {} as any;
  if (props.spendingTypeId != null) {
    filter.spendingTypeId = props.spendingTypeId;
  }
  if (props.search) {
    filter.spendingTypeName = { contains: props.search, mode: "insensitive" };
  }
  const allStoreSpending = await prisma.storeSpending.findMany({
    where: {
      ...filter,
    },
    include: {
      storeSpendingTypeIdRel: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return allStoreSpending;
}

