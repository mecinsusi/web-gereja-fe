import prisma from "../configuration/db";

export const createChurchSpending = async (churchSpending: any) => {
  const newChurchSpending = await prisma.$transaction(async (prisma) => {
    const createChurchSpending = await prisma.churchSpending.create({
      data: {
        id: churchSpending.id,
        detail: churchSpending.detail,
        funds: churchSpending.funds,
        bill: churchSpending.bill,
        billNumber: churchSpending.billNumber,
        churchSpendingTypeIdRel: {
          connectOrCreate: {
            where: {
              id: churchSpending.incomeTypeId,
            },
            create: {
              spendingTypeName: churchSpending.spendingTypeName,
              code: churchSpending.code,
              description: churchSpending.description,
            },
          },
        },
      }
    });
    return createChurchSpending;
  });
  return newChurchSpending;
};

export const updateChurchSpending = async (
  churchSpendingId: bigint,
  churchSpending: any,
) => {
  const newUpdatedChurchSpending = await prisma.$transaction(async (prisma) => {
    const currentChurchSpending = await prisma.churchSpending.findUnique({
      where: { id: churchSpendingId },
      include: {
        churchSpendingTypeIdRel: true,
      },
    });
    if (!currentChurchSpending) {
      throw new Error("ChurchSpending not found.");
    }
    const updatedChurchSpending = await prisma.churchSpending.update({
      where: { id: churchSpendingId },
      data: {
        id: churchSpending.id,
        detail: churchSpending.detail,
        funds: churchSpending.funds,
        bill: churchSpending.bill,
        billNumber: churchSpending.billNumber,
        churchSpendingTypeIdRel: {
          update: {
            data: {
              spendingTypeName: churchSpending.spendingTypeName,
              description: churchSpending.description,
              code: churchSpending.code
            },
          },
        },
      }
    });
    await prisma.churchSpendingHistory.create({
      data: {
        id: currentChurchSpending.id,
        detail: currentChurchSpending.detail,
        funds: currentChurchSpending.funds,
        bill: currentChurchSpending.bill,
        billNumber: currentChurchSpending.billNumber,
        spendingTypeId: currentChurchSpending.spendingTypeId,
        createAt: currentChurchSpending.createAt,
        updatedAt: new Date(),
      },
    });
    return updatedChurchSpending;
  });
  return newUpdatedChurchSpending;
};

export const patchChurchSpending = async (
  churchSpendingId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedChurchSpending = await prisma.churchSpending.update({
    where: { id: churchSpendingId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedChurchSpending;
};

export const deleteChurchSpending = async (churchSpendingId: bigint) => {
  const deletedChurchSpending = await prisma.churchSpending.delete({
    where: { id: churchSpendingId },
  });
  console.log(`DELETE_SPENDING_`, deletedChurchSpending);
  return deletedChurchSpending;
};

export const getChurchSpending = async (churchSpendingId: bigint) => {
  const churchSpending = await prisma.churchSpending.findUnique({
    where: { id: churchSpendingId },
    include: {
      churchSpendingTypeIdRel: true,
    },
  });
  return churchSpending;
};

export const getAllChurchSpending = async (props: {
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
    filter.inventoryName = { contains: props.search, mode: "insensitive" };
  }
  const allChurchSpending = await prisma.churchSpending.findMany({
    where: {
      ...filter,
    },
    include: {
      churchSpendingTypeIdRel: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return allChurchSpending;
}

