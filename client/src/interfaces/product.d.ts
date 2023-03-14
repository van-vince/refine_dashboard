import { BaseKey } from '@pankod/refine-core';

export interface ProductFormFieldProp {
  title: string,
  labelName: string
}

export interface ProductFormValues {
    title: string,
    description: string,
    category: string,
    quantity: string,
    price: number | undefined,
}

export interface ProductCardProps {
  id?: BaseKey | undefined,
  title: string,
  price: string,
  photo: string,
  location: string,
}
export interface ProductProps {
  id?: BaseKey | undefined,
  tableRows: array,
  columns: array
  rowId: string,
  row:string,
}

