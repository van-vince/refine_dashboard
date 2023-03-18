import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import CustomerForm from "components/common/CustomerForm";
import { Edit, Breadcrumb } from "@refinedev/mui";


const EditCustomer = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity({
      v3LegacyAuthProviderCompatible: true
  });


  const {
      refineCore: { onFinish, formLoading },
      register,
      handleSubmit,
  } = useForm();


  const onFinishHandler = async (data: FieldValues) => {

      await onFinish({
          ...data,
          email: user.email,
      });
  };


  return (
    <Edit resource="customers" isLoading={true}
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
      <CustomerForm
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      onFinishHandler={onFinishHandler}
      />
  </Edit>
  )
}

export default EditCustomer