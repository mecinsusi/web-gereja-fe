// handling all business logic for income related
import {
  createChurchIncome,
  updateChurchIncome,
  deleteChurchIncome,
  getAllChurchIncome,
  getChurchIncome,
  patchChurchIncome
} from "../repository/churchIncome";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import {
  ChurchIncomeCreateParams,
  ChurchIncomeUpdateParams,
} from "../types/churchIncome";
import { checkIcomeTypeName, createChurchIncomeType, getChurchIncomeType } from "../repository/churchIncomeType";

export const createChurchIncomeService = async (
  income: ChurchIncomeCreateParams,
) => {
  let incomeType;
  const existsIncomeType = await checkIcomeTypeName({
    incomeTypeName: income.incomeTypeName,
  });
  if (existsIncomeType) {
    incomeType = await getChurchIncomeType(income.incomeTypeId);
  } else {
    incomeType = await createChurchIncomeType({
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
    const newIncomeType = await createChurchIncome({
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

export const updateChurchIncomeService = async (
  incomeId: bigint,
  income: ChurchIncomeUpdateParams,
) => {
  const updatedIncome = await updateChurchIncome(incomeId, income);
  return updatedIncome;
};

export const patchChurchIncomeService = async (
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
    const patchedInventory = await patchChurchIncome(
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

export const deleteChurchIncomeService = async (incomeId: bigint) => {
  const deletedIncome = await deleteChurchIncome(incomeId);
  console.log(`DELETE_CHURCH_INCOME`);
  return deletedIncome;
};

export const getChurchIncomeService = async (incomeId: bigint) => {
  const income = await getChurchIncome(incomeId);
  return income;
};

export const getAllChurchIncomeService = async (props: {
  incomeTypeId: bigint | null;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allIncome = await getAllChurchIncome({
    incomeTypeId: props.incomeTypeId,
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  console.log(`ALL_CHURCH_INCOME`, allIncome);
  return allIncome;
};
