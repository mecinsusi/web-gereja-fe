import {
  createChurchIncomeType,
  deleteChurchIncomeType,
  getChurchIncomeType,
  updateChurchIncomeType,
  getAllChurchIncomeType
} from "../repository/churchIncomeType";

export const createChurchIncomeTypeService = async (
  incomeType: any,
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

export const getAllChurchIncomeTypeService = async (props: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const allIncomeType = await getAllChurchIncomeType({
    page: props.page,
    limit: props.limit,
    search: props.search,
  });
  return allIncomeType;
};
