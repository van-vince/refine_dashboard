import { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    category: string,
    quantity: string,
    price: number | undefined,
}

export interface PropertyCardProps {
  id?: BaseKey | undefined,
  title: string,
  price: string,
  photo: string,
  location: string,
}
export interface ProductProps {
  id?: BaseKey | undefined,
  // tableRows: array,
  // columns: array
  // rowId: string,
  // row:string,
}

