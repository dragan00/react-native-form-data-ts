import { IAccount, IUser } from "./user";

 
export interface IApiResponse<Data>{
  results: Data,
  message: string
}

 

export interface ITableColumn {
  title: string;
  dataIndex: string;
  render?: (text: string, value: any) => any | undefined;
  visible: boolean;
}

export interface IParent {
  name: string;
  id: number;
}


export interface IDataToApi<Body, OkResponse>{
  body: Body,
  successCallback: (data: OkResponse) => void,
  errorCallback: (error: any) => void,
  id: number,
  queryParams: Record<string, string>
}


export interface InnerMessage {
  token_class: string;
  token_type: string;
  message: string;
}

export interface Message {
  detail: string;
  code: string;
  messages: InnerMessage[];
}

export interface Extra {
}

export interface ILocation {
  name: string;
  id: number;
}


export interface IMe {
  message: Message;
  extra: Extra;
}

export type NewTreeItem<T> = {
  [K in keyof T]: T[K];
} & { children: NewTreeItem<T>[]};


export interface ICursor {
  order_by: string | number;
  ordering: "asc" | "desc";
  limit: number;
  next: string | null | boolean;
  cursor: string | null;
}


 



