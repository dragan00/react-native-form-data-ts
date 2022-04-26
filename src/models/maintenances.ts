import { ICategory } from "./asset";

export interface IMaintenanceCategory {
    name: string;
    id: number;
}

export type IMaintenanceType = ICategory & {
    color: string
}
