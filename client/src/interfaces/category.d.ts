import { BaseKey } from "@refinedev/core";

export interface CategoryFormFieldProp {
  title: string,
  labelName: string
}

export interface CategoryFormValues {
    title: string,
    description: string,
    category: string,
    quantity: string,
    price: number | undefined,
}

export interface CategoryCardProps {
  id?: BaseKey | undefined,
  name: string,
  description: string,
  email: string,
}

export interface CategoryBarProps {
  icon: ReactNode,
  name: string
}

