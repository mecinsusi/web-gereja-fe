import {
  ChurchSpendingCreateParams,
  ChurchSpendingUpdateParams,
} from "..//types/churchSpending";
import prisma from "../configuration/db";

export const createChurchSpending = async (
  churchSpending: ChurchSpendingCreateParams,
) => {
  const newChurchSpending = await prisma.$transaction(async (prisma) => {
    const createChurchSpending = await prisma.churchSpending.create({
      data: {
        id: churchSpending.id,
        detail: churchSpending.detail,
        funds: churchSpending.funds,
        date: churchSpending.date,
        bill: churchSpending.bill || "",
        billNumber: churchSpending.billNumber || "",
        churchSpendingTypeIdRel: {
          connectOrCreate: {
            where: {
              id: churchSpending.spendingTypeId,
            },
            create: {
              spendingTypeName: churchSpending.spendingTypeName,
              code: churchSpending.code,
              description: churchSpending.description,
            },
          },
        },
      },
    });
    return createChurchSpending;
  });
  return newChurchSpending;
};

export const updateChurchSpending = async (
  churchSpendingId: bigint,
  churchSpending: ChurchSpendingUpdateParams,
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
        date: churchSpending.date,
        bill: churchSpending.bill || "",
        billNumber: churchSpending.billNumber || "",
        churchSpendingTypeIdRel: {
          update: {
            data: {
              spendingTypeName: churchSpending.spendingTypeName,
              description: churchSpending.description,
              code: churchSpending.code,
            },
          },
        },
      },
    });
    await prisma.churchSpendingHistory.create({
      data: {
        id: currentChurchSpending.id,
        detail: currentChurchSpending.detail,
        funds: currentChurchSpending.funds,
        date: currentChurchSpending.date,
        bill: currentChurchSpending.bill || "",
        billNumber: currentChurchSpending.billNumber || "",
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

export const getChurchIncome = async (props: {
  incomeTypeId?: bigint | null;
  startDate?: Date;
  endDate?: Date;
}) => {
  const where: any = {};

  if (props.incomeTypeId) {
    where.incomeTypeId = props.incomeTypeId;
  }

  if (props.startDate || props.endDate) {
    where.createAt = {};
    if (props.startDate) where.createAt.gte = props.startDate;
    if (props.endDate) where.createAt.lte = props.endDate;
  }

  return await prisma.churchIncome.findMany({
    where,
    include: { churchIncomeTypeIdRel: true },
  });
};

export const getAllChurchSpending = async () => {
  const where: any = { deleted: false };

  return await prisma.churchSpending.findMany({
    where,
    include: { churchSpendingTypeIdRel: true },
    orderBy: {
      date: "desc",
    },
  });
};
