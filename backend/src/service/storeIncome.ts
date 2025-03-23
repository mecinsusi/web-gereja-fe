import {
  createStoreIncome,
  updateStoreIncome,
  deleteStoreIncome,
  getAllStoreIncome,
  getStoreIncome,
  patchStoreIncome
} from "../repository/storeIncome";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import { checkIcomeTypeName, createStoreIncomeType, getStoreIncomeType } from "../repository/storeIncomeType";

export const createStoreIncomeService = async (
  income: any,
) => {
  let incomeType;
  const existsIncomeType = await checkIcomeTypeName({
    incomeTypeName: income.incomeTypeName,
  });
  if (existsIncomeType) {
    incomeType = await getStoreIncomeType(income.incomeTypeId);
  } else {
    incomeType = await createStoreIncomeType({
      id: income.incomeTypeId,
      incomeTypeName: income.incomeTypeName,
      description: income.description,
      code: income.code
    });
  }
  if (!incomeType || !incomeType.id) {
    throw new Error("Failed to retrieve or create a valid income type");
  }
  try {
    const newIncomeType = await createStoreIncome({
      ...income,
      incomeTypeId: incomeType.id,
    });
    return newIncomeType;
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const updateIncomeService = async (
  incomeId: bigint,
  income: any,
) => {
  const updatedIncome = await updateStoreIncome(incomeId, income);
  return updatedIncome;
};

export const patchStoreIncomeService = async (
  incomeId: bigint,
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
    const patchedInventory = await patchStoreIncome(
      incomeId,
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

export const deleteStoreIncomeService = async (incomeId: bigint) => {
  const deletedIncome = await deleteStoreIncome(incomeId);
  console.log(`DELETE_STORE_INCOME`);
  return deletedIncome;
};

export const getStoreIncomeService = async (incomeId: bigint) => {
  const income = await getStoreIncome(incomeId);
  return income;
};

export const getAllStoreIncomeService = async (props: {
  incomeTypeId: bigint | null;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allIncome = await getAllStoreIncome({
    incomeTypeId: props.incomeTypeId,
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  console.log(`ALL_STORE_INCOME`, allIncome);
  return allIncome;
};
