import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { axiosclient } from "../../../../api";
import { AdminLayout } from "../../../../layouts";
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidString,
} from "../../../../utils";

const AddSuppliers = () => {
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState({
    supplierName: "",
    address: "",
    contactPerson: "",
    email: "",
    fax: "",
    password: "",
  });

  const initialErrors = {
    supplierName: "",
    address: "",
    contactPerson: "",
    email: "",
    fax: "",
    password: "",
  };

  const [supplierError, setSupplierError] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (supplierError[name]?.length) {
      setSupplierError({
        ...supplierError,
        [name]: "",
      });
    }

    setSupplier({
      ...supplier,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    let isFormError = false;
    if (!isValidString(supplier.supplierName)) {
      isFormError = true;
      setSupplierError((prevState) => {
        return {
          ...prevState,
          supplierName: "Supplier name cannot be empty",
        };
      });
    }

    if (!isValidString(supplier.address)) {
      isFormError = true;
      setSupplierError((prevState) => {
        return {
          ...prevState,
          address: "Supplier address cannot be empty",
        };
      });
    }

    if (!isValidString(supplier.contactPerson)) {
      isFormError = true;
      setSupplierError((prevState) => {
        return {
          ...prevState,
          contactPerson: "Contact person cannot be empty",
        };
      });
    }

    if (!isValidEmail(supplier.email)) {
      isFormError = true;
      setSupplierError((prevState) => {
        return {
          ...prevState,
          email: "Email should be a valid email",
        };
      });
    }

    // if (!isValidPhoneNumber(supplier.fax)) {
    //   isFormError = true;
    //   setSupplierError((prevState) => {
    //     return {
    //       ...prevState,
    //       fax: "Contact fax cannot be empty",
    //     };
    //   });
    // }

    // if (!isValidPassword(supplier.password)) {
    //   isFormError = true;
    //   setSupplierError((prevState) => {
    //     return {
    //       ...prevState,
    //       password:
    //         "Password should contain at least minimum 8 characters, one letter and a number",
    //     };
    //   });
    // }
    console.log(supplier);
    if (isFormError === true) return;

    axiosclient.post("/api/supplier/", supplier).then(() => {
      Swal.fire(
        "Supplier Added",
        "Supplier has been added successfully!",
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
            Supplier - Add a Supplier
          </h3>
          <div>
            <input
              name="supplierName"
              type="text"
              id="desname"
              class={`input ${
                supplierError.supplierName.length > 0 && "input-error"
              }`}
              placeholder="Enter Supplier Name"
              value={supplier.supplierName}
              onChange={handleChange}
            />
            {supplierError.supplierName.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {supplierError.supplierName}
              </p>
            )}
          </div>

          <div>
            <input
              name="address"
              type="text"
              id="country"
              class={`input ${
                supplierError.address.length > 0 && "input-error"
              }`}
              placeholder="Address"
              value={supplier.address}
              onChange={handleChange}
            />

            {supplierError.address.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {supplierError.address}
              </p>
            )}
          </div>

          <div>
            <input
              name="contactPerson"
              type="text"
              id="country"
              class={`input ${
                supplierError.contactPerson.length > 0 && "input-error"
              }`}
              placeholder="Enter Contact Person"
              value={supplier.contactPerson}
              onChange={handleChange}
            />

            {supplierError.contactPerson.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {supplierError.contactPerson}
              </p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="text"
              id="email"
              class={`input ${supplierError.email.length > 0 && "input-error"}`}
              placeholder="Enter Email"
              value={supplier.email}
              onChange={handleChange}
            />

            {supplierError.email.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {supplierError.email}
              </p>
            )}
          </div>

          <div>
            <input
              name="fax"
              type="number"
              id="country"
              class={`input ${supplierError.fax.length > 0 && "input-error"}`}
              placeholder="Fax"
              value={supplier.fax}
              onChange={handleChange}
            />

            {supplierError.fax.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {supplierError.fax}
              </p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="text"
              id="country"
              class={`input ${
                supplierError.password.length > 0 && "input-error"
              }`}
              placeholder="Password"
              value={supplier.password}
              onChange={handleChange}
            />

            {supplierError.password.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {supplierError.password}
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

export default AddSuppliers;
