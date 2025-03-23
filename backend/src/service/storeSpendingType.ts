import {
  createStoreSpendingType,
  deleteStoreSpendingType,
  getStoreSpendingType,
  updateStoreSpendingType,
  getAllStoreSpendingType
} from "../repository/storeSpendingType";

export const createStoreSpendingTypeService = async (
  spendingType: any,
) => {
  const newSpendingType = await createStoreSpendingType(spendingType);
  return newSpendingType;
};

export const updateStoreSpendingTypeService = async (
  spendingTypeId: bigint,
  spendingType: any,
) => {
  const updatedSpendingType = await updateStoreSpendingType(
    spendingTypeId,
    spendingType,
  );
  return updatedSpendingType;
};

export const deleteStoreSpendingTypeService = async (spendingTypeId: bigint) => {
  const deletedSpendingType = await deleteStoreSpendingType(spendingTypeId);
  return deletedSpendingType;
};

export const getStoreSpendingTypeService = async (spendingTypeId: bigint) => {
  const spendingType = await getStoreSpendingType(spendingTypeId);
  return spendingType;
};

export const getAllStoreSpendingTypeService = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allSpendingType = await getAllStoreSpendingType({
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  return allSpendingType;
};
