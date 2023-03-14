import { BaseKey } from '@pankod/refine-core';

export interface WarehouseFormFieldProp {
  title: string,
  labelName: string
}

export interface WarehouseFormValues {
    title: string,
    description: string,
    warehouse: string,
    quantity: string,
    price: number | undefined,
}

export interface WarehouseCardProps {
  id?: BaseKey | undefined,
  name: string,
  location: string,
  email: string,
}

export interface WarehouseBarProps {
  icon: ReactNode,
  name: string
}

