import {
  createChurchSpending,
  updateChurchSpending,
  deleteChurchSpending,
  getAllChurchSpending,
  getChurchSpending,
  patchChurchSpending
} from "../repository/churchSpending";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import { checkSpendingTypeName, createChurchSpendingType, getChurchSpendingType } from "../repository/churchSpendingType";

export const createChurchSpendingService = async (
  spending: any,
) => {
  let spendingType;
  const existsSpendingType = await checkSpendingTypeName({
    spendingTypeName: spending.spendingTypeName,
  });
  if (existsSpendingType) {
    spendingType = await getChurchSpendingType(spending.spendingTypeId);
  } else {
    spendingType = await createChurchSpendingType({
      id: spending.spendingTypeId,
      spendingTypeName: spending.incomeTypeName,
      description: spending.description,
      code: spending.code
    });
  }
  if (!spendingType || !spendingType.id) {
    throw new Error("Failed to retrieve or create a valid spending type");
  }
  try {
    const newSpendingType = await createChurchSpending({
      ...spending,
      spendingTypeId: spendingType.id,
    });
    return newSpendingType;
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const updateChurchSpendingService = async (
  spendingId: bigint,
  spending: any,
) => {
  const updatedSpending = await updateChurchSpending(spendingId, spending);
  return updatedSpending;
};

export const patchChurchSpendingService = async (
  spendingId: bigint,
  operation: {
    op: string;
    path: string;
    value: string;
  },
) => {
  const { op, path, value } = operation;
  const field = path.split("/").pop();
  if (field === undefined) {
    throw new Error("Invalid field");
  }
  try {
    const patchedInventory = await patchChurchSpending(
      spendingId,
      op,
      field,
      value,
    );
    return patchedInventory;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const deleteChurchSpendingService = async (spendingId: bigint) => {
  const deletedSpending = await deleteChurchSpending(spendingId);
  console.log(`DELETE_CHURCH_SPENDING`);
  return deletedSpending;
};

export const getChurchSpendingService = async (spendingId: bigint) => {
  const spending = await getChurchSpending(spendingId);
  return spending;
};

export const getAllChurchSpendingService = async (props: {
  spendingTypeId: bigint | null;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allSpending = await getAllChurchSpending({
    spendingTypeId: props.spendingTypeId,
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  console.log(`ALL_CHURCH_SPENDING`, allSpending);
  return allSpending;
};
