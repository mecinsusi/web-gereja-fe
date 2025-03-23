import { DataType } from "../types/dataType";
type Response = {
  meta: {
    message: string;
    status: string;
    dataType: DataType;
    access_token?: string;
  };
  data: any;
};
export const normalize = (
  message: string,
  status: string,
  dataType: DataType,
  data: any,
  access_token?: string,
) => {
  const response: Response = {
    meta: {
      message: message,
      status: status,
      dataType: dataType,
    },
    data: data,
  };
  if (access_token) {
    response.meta.access_token = access_token;
  }
  return response;
};
