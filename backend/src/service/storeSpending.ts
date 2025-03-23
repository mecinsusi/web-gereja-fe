import {
  createStoreSpending,
  updateStoreSpending,
  deleteStoreSpending,
  getAllStoreSpending,
  getStoreSpending,
  patchStoreSpending
} from "../repository/storeSpending";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import { checkSpendingTypeName, createStoreSpendingType, getStoreSpendingType } from "../repository/storeSpendingType";

export const createStoreSpendingService = async (
  spending: any,
) => {
  let spendingType;
  const existsSpendingType = await checkSpendingTypeName({
    spendingTypeName: spending.spendingTypeName,
  });
  if (existsSpendingType) {
    spendingType = await getStoreSpendingType(spending.spendingTypeId);
  } else {
    spendingType = await createStoreSpendingType({
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
    const newSpendingType = await createStoreSpending({
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

export const updateStoreSpendingService = async (
  spendingId: bigint,
  spending: any,
) => {
  const updatedSpending = await updateStoreSpending(spendingId, spending);
  return updatedSpending;
};

export const patchStoreSpendingService = async (
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
    const patchedInventory = await patchStoreSpending(
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

export const deleteStoreSpendingService = async (spendingId: bigint) => {
  const deletedSpending = await deleteStoreSpending(spendingId);
  console.log(`DELETE_CHURCH_SPENDING`);
  return deletedSpending;
};

export const getStoreSpendingService = async (spendingId: bigint) => {
  const spending = await getStoreSpending(spendingId);
  return spending;
};

export const getAllStoreSpendingService = async (props: {
  spendingTypeId: bigint | null;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allSpending = await getAllStoreSpending({
    spendingTypeId: props.spendingTypeId,
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  console.log(`ALL_CHURCH_SPENDING`, allSpending);
  return allSpending;
};
