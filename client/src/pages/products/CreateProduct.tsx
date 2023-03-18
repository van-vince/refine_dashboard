import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ProductForm from "components/common/ProductForm";
import { Create, Breadcrumb, ListButton } from "@refinedev/mui";


const CreateProduct = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity({
      v3LegacyAuthProviderCompatible: true
  });
  const [productImage, setProductImage] = useState({ name: "", url: "" });

  const {
      refineCore: { onFinish, formLoading },
      register,
      handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
        new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsDataURL(readFile);
        });

      reader(file).then((result: string) =>
          setProductImage({ name: file?.name, url: result }),
      );
  };

  const onFinishHandler = async (data: FieldValues) => {
      if (!productImage.name) return alert("Please select an image");

      await onFinish({
          ...data,
          photo: productImage.url,
          email: user.email,
      });
  };


  return (
    <Create resource="products" isLoading={true}
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
    <ProductForm
    type="Create"
    register={register}
    onFinish={onFinish}
    formLoading={formLoading}
    handleSubmit={handleSubmit}
    handleImageChange={handleImageChange}
    onFinishHandler={onFinishHandler}
    productImage={productImage}
/>
</Create>
  )
}

export default CreateProduct