import {
  createFarmSpending,
  updateFarmSpending,
  deleteFarmSpending,
  getAllFarmSpending,
  getFarmSpending,
  patchFarmSpending
} from "../repository/farmSpending";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import { checkSpendingTypeName, createFarmSpendingType, getFarmSpendingType } from "../repository/farmSpendingType";

export const createFarmSpendingService = async (
  spending: any,
) => {
  let spendingType;
  const existsSpendingType = await checkSpendingTypeName({
    spendingTypeName: spending.spendingTypeName,
  });
  if (existsSpendingType) {
    spendingType = await getFarmSpendingType(spending.spendingTypeId);
  } else {
    spendingType = await createFarmSpendingType({
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
    const newSpendingType = await createFarmSpending({
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

export const updateFarmSpendingService = async (
  spendingId: bigint,
  spending: any,
) => {
  const updatedSpending = await updateFarmSpending(spendingId, spending);
  return updatedSpending;
};

export const patchFarmSpendingService = async (
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
    const patchedInventory = await patchFarmSpending(
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

export const deleteFarmSpendingService = async (spendingId: bigint) => {
  const deletedSpending = await deleteFarmSpending(spendingId);
  console.log(`DELETE_CHURCH_SPENDING`);
  return deletedSpending;
};

export const getFarmSpendingService = async (spendingId: bigint) => {
  const spending = await getFarmSpending(spendingId);
  return spending;
};

export const getAllFarmSpendingService = async (props: {
  spendingTypeId: bigint | null;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allSpending = await getAllFarmSpending({
    spendingTypeId: props.spendingTypeId,
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  console.log(`ALL_CHURCH_SPENDING`, allSpending);
  return allSpending;
};
