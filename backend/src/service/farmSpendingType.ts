import {
  createFarmSpendingType,
  deleteFarmSpendingType,
  getFarmSpendingType,
  updateFarmSpendingType,
  getAllFarmSpendingType
} from "../repository/farmSpendingType";

export const createFarmSpendingTypeService = async (
  spendingType: any,
) => {
  const newSpendingType = await createFarmSpendingType(spendingType);
  return newSpendingType;
};

export const updateFarmSpendingTypeService = async (
  spendingTypeId: bigint,
  spendingType: any,
) => {
  const updatedSpendingType = await updateFarmSpendingType(
    spendingTypeId,
    spendingType,
  );
  return updatedSpendingType;
};

export const deleteFarmSpendingTypeService = async (spendingTypeId: bigint) => {
  const deletedSpendingType = await deleteFarmSpendingType(spendingTypeId);
  return deletedSpendingType;
};

export const getFarmSpendingTypeService = async (spendingTypeId: bigint) => {
  const spendingType = await getFarmSpendingType(spendingTypeId);
  return spendingType;
};

export const getAllFarmSpendingTypeService = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allSpendingType = await getAllFarmSpendingType({
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  return allSpendingType;
};
