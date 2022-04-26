import { IParent } from ".";
import { IAsset } from "./assets";

export interface IUser {
  account: IAccount;
  token: IToken;
}

export interface IToken {
  access: string;
  refresh: string;
}

export interface IRole {
  id: number;
  name: string;
}

export interface IFile {
  name: string;
  id: number;
  file: string;
}

export interface ICompany {
  name: string;
  id: number;
}

export interface IAccount {
  id: number,
  name: string;
  email: string;
  assets: Array<IAsset>;
  phone_number: string;
  note: string;
  company: ICompany;
  created_at: string;
  last_login: string; 
  files: Array<IFile>;
  avatar: string;
  price_per_hour: number;
  currency: string;
  language: string;
  show_instruction: number;
  role: IRole;
  permissions: Array<number>;
}

export interface IAddUser {
  role?: number;
  name?: string;
  email?: string;
  assets?: number[];
  phone_number?: string;
  note?: string;
  price_per_hour?: number;
}
