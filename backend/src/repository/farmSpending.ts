import prisma from "../configuration/db";

export const createFarmSpending = async (farmSpending: any) => {
  const newFarmSpending = await prisma.$transaction(async (prisma) => {
    const createFarmSpending = await prisma.farmSpending.create({
      data: {
        id: farmSpending.id,
        detail: farmSpending.detail,
        funds: farmSpending.funds,
        farmSpendingTypeIdRel: {
          connectOrCreate: {
            where: {
              id: farmSpending.incomeTypeId,
            },
            create: {
              spendingTypeName: farmSpending.spendingTypeName,
              code: farmSpending.code,
              description: farmSpending.description,
            },
          },
        },
      }
    });
    return createFarmSpending;
  });
  return newFarmSpending;
};

export const updateFarmSpending = async (
  farmSpendingId: bigint,
  farmSpending: any,
) => {
  const newUpdatedFarmSpending = await prisma.$transaction(async (prisma) => {
    const currentFarmSpending = await prisma.farmSpending.findUnique({
      where: { id: farmSpendingId },
      include: {
        farmSpendingTypeIdRel: true,
      },
    });
    if (!currentFarmSpending) {
      throw new Error("FarmSpending not found.");
    }
    const updatedFarmSpending = await prisma.farmSpending.update({
      where: { id: farmSpendingId },
      data: {
        id: farmSpending.id,
        detail: farmSpending.detail,
        funds: farmSpending.funds,
        farmSpendingTypeIdRel: {
          update: {
            data: {
              spendingTypeName: farmSpending.spendingTypeName,
              description: farmSpending.description,
              code: farmSpending.code
            },
          },
        },
      }
    });
    await prisma.farmSpendingHistory.create({
      data: {
        id: currentFarmSpending.id,
        detail: currentFarmSpending.detail,
        funds: currentFarmSpending.funds,
        spendingTypeId: currentFarmSpending.spendingTypeId,
        createAt: currentFarmSpending.createAt,
        updatedAt: new Date(),
      },
    });
    return updatedFarmSpending;
  });
  return newUpdatedFarmSpending;
};

export const patchFarmSpending = async (
  farmSpendingId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedFarmSpending = await prisma.farmSpending.update({
    where: { id: farmSpendingId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedFarmSpending;
};

export const deleteFarmSpending = async (farmSpendingId: bigint) => {
  const deletedFarmSpending = await prisma.farmSpending.delete({
    where: { id: farmSpendingId },
  });
  console.log(`DELETE_SPENDING_`, deletedFarmSpending);
  return deletedFarmSpending;
};

export const getFarmSpending = async (farmSpendingId: bigint) => {
  const farmSpending = await prisma.farmSpending.findUnique({
    where: { id: farmSpendingId },
    include: {
      farmSpendingTypeIdRel: true,
    },
  });
  return farmSpending;
};

export const getAllFarmSpending = async (props: {
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
  const allFarmSpending = await prisma.farmSpending.findMany({
    where: {
      ...filter,
    },
    include: {
      farmSpendingTypeIdRel: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return allFarmSpending;
}

