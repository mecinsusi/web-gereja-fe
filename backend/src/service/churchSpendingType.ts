import {
  createChurchSpendingType,
  deleteChurchSpendingType,
  getChurchSpendingType,
  updateChurchSpendingType,
  getAllChurchSpendingType
} from "../repository/churchSpendingType";

export const createChurchSpendingTypeService = async (
  spendingType: any,
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

export const deleteChurchSpendingTypeService = async (spendingTypeId: bigint) => {
  const deletedSpendingType = await deleteChurchSpendingType(spendingTypeId);
  return deletedSpendingType;
};

export const getChurchSpendingTypeService = async (spendingTypeId: bigint) => {
  const spendingType = await getChurchSpendingType(spendingTypeId);
  return spendingType;
};

export const getAllChurchSpendingTypeService = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allSpendingType = await getAllChurchSpendingType({
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  return allSpendingType;
};
