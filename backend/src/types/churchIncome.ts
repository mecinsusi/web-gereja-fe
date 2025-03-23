export interface ChurchIncomeCreateParams {
  id: bigint;
  detail: string;
  funds: bigint;
  incomeTypeId: bigint;
  incomeTypeName: string;
  description: string;
  code: string;
}

export interface ChurchIncomeUpdateParams {
  id: bigint;
  detail: string;
  funds: bigint;
  incomeTypeId: bigint;
  incomeTypeName: string;
  description: string;
  code: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: bigint;
}

