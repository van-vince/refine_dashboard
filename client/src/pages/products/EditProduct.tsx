import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import ProductForm from "components/common/ProductForm";
import { Edit, Breadcrumb } from "@pankod/refine-mui";

const EditProduct = () => {
    const { data: user } = useGetIdentity();
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
        if (productImage.name) {
            await onFinish({
                ...data,
                photo: productImage.url,
                email: user.email,
            });
        }else{
            await onFinish({
                ...data,
                email: user.email,
            });
         };
    }

    return (
        <Edit resource="products" isLoading={true}
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
            type="Edit"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            productImage={productImage}
        />
    </Edit>
    );
};

export default EditProduct;