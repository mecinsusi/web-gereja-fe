import { ChurchIncomeTypeCreateParams } from "../types/churchIncomeType";
import {
  createChurchIncomeType,
  deleteChurchIncomeType,
  getChurchIncomeType,
  updateChurchIncomeType,
  getAllChurchIncomeType,
} from "../repository/churchIncomeType";

export const createChurchIncomeTypeService = async (
  incomeType: ChurchIncomeTypeCreateParams,
) => {
  const newIncomeType = await createChurchIncomeType(incomeType);
  return newIncomeType;
};

export const updateChurchIncomeTypeService = async (
  incomeTypeId: bigint,
  incomeType: any,
) => {
  const updatedIncomeType = await updateChurchIncomeType(
    incomeTypeId,
    incomeType,
  );
  return updatedIncomeType;
};

export const deleteChurchIncomeTypeService = async (incomeTypeId: bigint) => {
  const deletedIncomeType = await deleteChurchIncomeType(incomeTypeId);
  return deletedIncomeType;
};

export const getChurchIncomeTypeService = async (incomeTypeId: bigint) => {
  const incomeType = await getChurchIncomeType(incomeTypeId);
  return incomeType;
};

export const getAllChurchIncomeTypeService = async () => {
  const allIncomeType = await getAllChurchIncomeType();

  return allIncomeType.sort((a, b) => {
    const aParts = a.code.split(".").map(Number);
    const bParts = b.code.split(".").map(Number);
    const len = Math.max(aParts.length, bParts.length);
    for (let i = 0; i < len; i++) {
      const aVal = aParts[i] ?? 0;
      const bVal = bParts[i] ?? 0;
      if (aVal !== bVal) return aVal - bVal;
    }
    return 0;
  });
};
