import {
  createStoreIncomeType,
  deleteStoreIncomeType,
  getStoreIncomeType,
  updateStoreIncomeType,
  getAllStoreIncomeType
} from "../repository/storeIncomeType";

export const createStoreIncomeTypeService = async (
  incomeType: any,
) => {
  const newIncomeType = await createStoreIncomeType(incomeType);
  return newIncomeType;
};

export const updateStoreIncomeTypeService = async (
  incomeTypeId: bigint,
  incomeType: any,
) => {
  const updatedIncomeType = await updateStoreIncomeType(
    incomeTypeId,
    incomeType,
  );
  return updatedIncomeType;
};

export const deleteStoreIncomeTypeService = async (incomeTypeId: bigint) => {
  const deletedIncomeType = await deleteStoreIncomeType(incomeTypeId);
  return deletedIncomeType;
};

export const getStoreIncomeTypeService = async (incomeTypeId: bigint) => {
  const incomeType = await getStoreIncomeType(incomeTypeId);
  return incomeType;
};

export const getAllStoreIncomeTypeService = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allIncomeType = await getAllStoreIncomeType({
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  return allIncomeType;
};
