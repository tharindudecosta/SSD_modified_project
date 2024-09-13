import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { axiosclient } from "../../../../api";
import { AdminLayout } from "../../../../layouts";
import { isValidString } from "../../../../utils";

const AddProducts = () => {
  const { supplierId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    unitOfMeasure: "",
    qty: "",
    restrictedProduct: "",
  });

  const initialErrors = {
    productName: "",
    unitOfMeasure: "",
    qty: "",
    restrictedProduct: "",
  };

  const [productError, setProductError] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (productError[name]?.length) {
      setProductError({
        ...productError,
        [name]: "",
      });
    }

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    let isFormError = false;
    if (!isValidString(product.productName)) {
      isFormError = true;
      setProductError((prevState) => {
        return {
          ...prevState,
          productName: "Product name cannot be empty",
        };
      });
    }

    if (!isValidString(product.unitOfMeasure)) {
      isFormError = true;
      setProductError((prevState) => {
        return {
          ...prevState,
          unitOfMeasure: "Unit of measure cannot be empty",
        };
      });
    }

    if (!isValidString(product.qty)) {
      isFormError = true;
      setProductError((prevState) => {
        return {
          ...prevState,
          qty: "Qty person cannot be empty",
        };
      });
    }

    if (isFormError === true) return;

    axiosclient
      .post(`/api/supplier/products/${supplierId}`, product)
      .then(() => {
        Swal.fire(
          "Quation Sent",
          "Your quotation has been sent to the supplier successfully!",
          "success"
        ).then(() => {
          navigate("/suppliers");
        });
      });
  };

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full overflow-y-auto">
        <form class="flex flex-col gap-4 px-60 py-10" onSubmit={onFormSubmit}>
          <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
            Supplier - Ask a Quotation
          </h3>
          <div>
            <input
              name="productName"
              type="text"
              id="desname"
              class={`input ${
                productError.productName.length > 0 && "input-error"
              }`}
              placeholder="Enter Product Name"
              value={product.productName}
              onChange={handleChange}
            />
            {productError.productName.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {productError.productName}
              </p>
            )}
          </div>

          <div>
            <input
              name="unitOfMeasure"
              type="text"
              id="country"
              class={`input ${
                productError.unitOfMeasure.length > 0 && "input-error"
              }`}
              placeholder="Unit Of Measure"
              value={product.unitOfMeasure}
              onChange={handleChange}
            />

            {productError.unitOfMeasure.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {productError.unitOfMeasure}
              </p>
            )}
          </div>

          <div>
            <input
              name="qty"
              type="text"
              id="country"
              class={`input ${productError.qty.length > 0 && "input-error"}`}
              placeholder="Quantity"
              value={product.qty}
              onChange={handleChange}
            />

            {productError.qty.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {productError.qty}
              </p>
            )}
          </div>

          <button
            type="submit"
            class="h-10 w-full focus:outline-none text-white bg-[#ffb300] hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
          >
            Submit
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProducts;
