import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { Create, ListButton, Breadcrumb} from "@pankod/refine-mui";
import WarehouseForm from "components/common/WarehouseForm";


const CreateWarehouse = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();


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
    <Create resource="warehouses" isLoading={true}
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
    <WarehouseForm
    type="Create"
    register={register}
    onFinish={onFinish}
    formLoading={formLoading}
    handleSubmit={handleSubmit}
    onFinishHandler={onFinishHandler}
/>
</Create>
  )
}

export default CreateWarehouse