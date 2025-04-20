import { ChurchSpendingTypeCreateParams } from "../types/churchSpendingType";
import {
  createChurchSpendingType,
  deleteChurchSpendingType,
  getChurchSpendingType,
  updateChurchSpendingType,
  getAllChurchSpendingType,
} from "../repository/churchSpendingType";

export const createChurchSpendingTypeService = async (
  spendingType: ChurchSpendingTypeCreateParams,
) => {
  const newSpendingType = await createChurchSpendingType(spendingType);
  return newSpendingType;
};

export const updateChurchSpendingTypeService = async (
  spendingTypeId: bigint,
  spendingType: any,
) => {
  const updatedSpendingType = await updateChurchSpendingType(
    spendingTypeId,
    spendingType,
  );
  return updatedSpendingType;
};

export const deleteChurchSpendingTypeService = async (
  spendingTypeId: bigint,
) => {
  const deletedSpendingType = await deleteChurchSpendingType(spendingTypeId);
  return deletedSpendingType;
};

export const getChurchSpendingTypeService = async (spendingTypeId: bigint) => {
  const spendingType = await getChurchSpendingType(spendingTypeId);
  return spendingType;
};

export const getAllChurchSpendingTypeService = async () => {
  const allSpendingType = await getAllChurchSpendingType();
  return allSpendingType.sort((a, b) => {
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
