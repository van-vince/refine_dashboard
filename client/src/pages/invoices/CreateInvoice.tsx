import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm, Control, FormProvider  } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";

import InvoiceForm from "components/common/InvoiceForm";
import { Create, Breadcrumb, ListButton } from "@pankod/refine-mui";
import { invoiceFormValues} from "interfaces/common";


const CreateInvoice = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const methods = useForm();

  const {
      refineCore: { onFinish, formLoading },
      handleSubmit,
  } = useForm();

  const onFinishHandler = async (data: invoiceFormValues) => {
      await onFinish({
        ...data,
        email: user.email,
      });
       console.log(data)
  };

  //const onSubmit = (data: invoiceFormValues) => console.log(data);

  return (
    <Create resource="invoices" isLoading={true}
    headerButtons={<ListButton />}
    breadcrumb={
      <div style={{ padding: "3px 6px", border: "1px solid dark", }}>
          <Breadcrumb />
      </div>
  }
  wrapperProps={{
      style: {backgroundColor: "#f5f5f5",padding: "16px",
      },
  }}

  >
  <FormProvider {...methods} >
    <InvoiceForm
       type="Create"
    // register={register}
       onFinish={onFinish}
       formLoading={formLoading}
       handleSubmit={handleSubmit}
       onFinishHandler={onFinishHandler}

/>
</FormProvider>
 </Create>
  )
}

export default CreateInvoice

