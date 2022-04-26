import { ICursor, ILocation, IParent } from ".";
import { ISupplier } from "./supplier";
import { IFile } from "./user";

export interface IAsset  {
  id: number;
  name: string;
  parent: IParent | null;
  parent_id: null | number;
  description: string;
  autopilot: boolean;
  type: string | null;
  hour_price: number | null;
  buy_price: number | null;
  relevant_links: IRelevantLink[];
  supplier: ISupplier | null;
  category: ICategory;
  location: ILocation | null;
  hour_price_currency: string;
  buy_price_currency: string;
  status: string;
  created_at: string,
  path: string
  avatar: string,
  files: IFile[]
}






export interface IAssetList {
  data: IAsset[];
  cursor: ICursor;
}

export interface ICategory {
  name: string;
  id: number;
  static: boolean
}


export interface IRelevantLink {
  title: string;
  link: string;
}