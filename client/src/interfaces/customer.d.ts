import { BaseKey } from '@pankod/refine-core';

export interface CustomerFormFieldProp {
  name: string,
  labelName: string
}

export interface CustomerFormValues {
    name: string,
    location: string,
    contact: string,
}

export interface CustomerCardProps {
  id?: BaseKey | undefined,
  contact: string,
  location: string,
}
export interface CustomerProps {
  id?: BaseKey | undefined,
  contact: string,
  location: string,
}