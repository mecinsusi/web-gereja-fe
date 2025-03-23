import {
  createFarmIncome,
  updateFarmIncome,
  deleteFarmIncome,
  getAllFarmIncome,
  getFarmIncome,
  patchFarmIncome
} from "../repository/farmIncome";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import { checkIcomeTypeName, createFarmIncomeType, getFarmIncomeType } from "../repository/farmIncomeType";

export const createFarmIncomeService = async (
  income: any,
) => {
  let incomeType;
  const existsIncomeType = await checkIcomeTypeName({
    incomeTypeName: income.incomeTypeName,
  });
  if (existsIncomeType) {
    incomeType = await getFarmIncomeType(income.incomeTypeId);
  } else {
    incomeType = await createFarmIncomeType({
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
    const newIncomeType = await createFarmIncome({
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
  const updatedIncome = await updateFarmIncome(incomeId, income);
  return updatedIncome;
};

export const patchFarmIncomeService = async (
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
    const patchedInventory = await patchFarmIncome(
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

export const deleteFarmIncomeService = async (incomeId: bigint) => {
  const deletedIncome = await deleteFarmIncome(incomeId);
  console.log(`DELETE_FARM_INCOME`);
  return deletedIncome;
};

export const getFarmIncomeService = async (incomeId: bigint) => {
  const income = await getFarmIncome(incomeId);
  return income;
};

export const getAllFarmIncomeService = async (props: {
  incomeTypeId: bigint | null;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allIncome = await getAllFarmIncome({
    incomeTypeId: props.incomeTypeId,
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  console.log(`ALL_FARM_INCOME`, allIncome);
  return allIncome;
};
