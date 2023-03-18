import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues, Control, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import InvoiceForm from "components/common/InvoiceForm";
import { Create, Breadcrumb, ListButton } from "@refinedev/mui";
import { invoiceFormValues} from "interfaces/common";


const CreateInvoice = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity({
      v3LegacyAuthProviderCompatible: true
  });
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

