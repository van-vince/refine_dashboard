export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    handleClick?: () => void
}

export interface ProfileProps {
    type: string,
    name: string,
    avatar: string,
    email: string,
    properties: Array | undefined
}

export interface PropertyProps {
    _id: string,
    title: string,
    description: string,
    location: string,
    price: string,
    photo: string,
    creator: string
}

export interface FormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    propertyImage: { name: string, url: string },
   
}

export interface ProductProps {
    _id: string,
    title: string,
    description: string,
    quantity: string,
    category: string,
    price: string,
    photo: string,
    creator: string
}

export interface ProductFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    productImage: { name: string, url: string },
}


export interface CustomerProps {
    type: string,
    location: string,
    name: string,
    contact: string
 
}

export interface CustomerFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
}

export interface CategoryProps {
    type: string,
    description: string,
    name: string,
 
}

export interface CategoryFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
}
export interface WarehouseProps {
    type: string,
    location: string,
    name: string,
 
}

export interface WarehouseFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
}

export interface invoiceFormValues {
    companyDetails:{
        name: string,
        location: string,
        contact: string,
    },
    customerDetails:{
        name: string,
        location: string,
        contact: string,
    },
    category: string,
    invoiceDetails: {
      name: string;
      price: number;
      quantity: number
      sum: number
    }[],
    subtotal: number,
    tax: number,
    discount: number,
    total: number
  }
  

export interface InvoiceFormProps {
    type: string,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>> | Array| Object,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,

}
