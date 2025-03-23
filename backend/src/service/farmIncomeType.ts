import {
  createFarmIncomeType,
  deleteFarmIncomeType,
  getFarmIncomeType,
  updateFarmIncomeType,
  getAllFarmIncomeType
} from "../repository/farmIncomeType";

export const createFarmIncomeTypeService = async (
  incomeType: any,
) => {
  const newIncomeType = await createFarmIncomeType(incomeType);
  return newIncomeType;
};

export const updateFarmIncomeTypeService = async (
  incomeTypeId: bigint,
  incomeType: any,
) => {
  const updatedIncomeType = await updateFarmIncomeType(
    incomeTypeId,
    incomeType,
  );
  return updatedIncomeType;
};

export const deleteFarmIncomeTypeService = async (incomeTypeId: bigint) => {
  const deletedIncomeType = await deleteFarmIncomeType(incomeTypeId);
  return deletedIncomeType;
};

export const getFarmIncomeTypeService = async (incomeTypeId: bigint) => {
  const incomeType = await getFarmIncomeType(incomeTypeId);
  return incomeType;
};

export const getAllFarmIncomeTypeService = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allIncomeType = await getAllFarmIncomeType({
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  return allIncomeType;
};
