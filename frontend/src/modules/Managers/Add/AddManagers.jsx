import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { axiosclient } from "../../../api";
import { AdminLayout } from "../../../layouts";
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidString,
} from "../../../utils";

const AddManager = () => {
  const navigate = useNavigate();

  const [manager, setManager] = useState({
    manName: "",
    department: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const initialErrors = {
    manName:"",
    department: "",
    contactNumber: "",
    email: "",
    password: "",
  };

  const [mangerError, setMangerError] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (mangerError[name]?.length) {
      setMangerError(initialErrors);
    }

    setManager({
      ...manager,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    let isFormError = false;
    if (!isValidString(manager.department)) {
      isFormError = true;
      setMangerError((prevState) => {
        return {
          ...prevState,
          department: "Department cannot be empty",
        };
      });
    }

    if (!isValidPhoneNumber(manager.contactNumber)) {
      isFormError = true;
      setMangerError((prevState) => {
        return {
          ...prevState,
          contactNumber: "Contact number should be in valid format",
        };
      });
    }

    if (!isValidEmail(manager.email)) {
      isFormError = true;
      setMangerError((prevState) => {
        return {
          ...prevState,
          email: "Email should be a valid email",
        };
      });
    }

    if (!isValidPassword(manager.password)) {
      isFormError = true;
      setMangerError((prevState) => {
        return {
          ...prevState,
          password:
            "Password should contain at least minimum 8 characters, one letter and a number",
        };
      });
    }

    if (isFormError === true) return;
    console.log(manager);
    axiosclient.post("/api/managers", manager).then(() => {
      Swal.fire(
        "Manager Added",
        "Manager has been added successfully!",
        "success"
      ).then(() => {
        navigate("/managers");
      });
    });
  };

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full overflow-y-auto">
        <form class="flex flex-col gap-4 px-60 py-10" onSubmit={onFormSubmit}>
          <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
            Manager - Add a Manager
          </h3>

          <div>
            <input
              name="manName"
              type="text"
              id="manName"
              class={`input ${
                mangerError.manName.length > 0 && "input-error"
              }`}
              placeholder="Enter Manager Name"
              value={manager.manName}
              onChange={handleChange}
            />
            {mangerError.manName.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {mangerError.manName}
              </p>
            )}
          </div>

          <div>
            <input
              name="department"
              type="text"
              id="desname"
              class={`input ${
                mangerError.department.length > 0 && "input-error"
              }`}
              placeholder="Enter Department"
              value={manager.department}
              onChange={handleChange}
            />
            {mangerError.department.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {mangerError.department}
              </p>
            )}
          </div>

          <div>
            <input
              name="contactNumber"
              type="text"
              id="country"
              class={`input ${
                mangerError.contactNumber.length > 0 && "input-error"
              }`}
              placeholder="Contact Number"
              value={manager.contactNumber}
              onChange={handleChange}
            />

            {mangerError.contactNumber.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {mangerError.contactNumber}
              </p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="text"
              id="country"
              class={`input ${mangerError.email.length > 0 && "input-error"}`}
              placeholder="Enter Email"
              value={manager.email}
              onChange={handleChange}
            />

            {mangerError.email.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {mangerError.email}
              </p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="text"
              id="email"
              class={`input ${
                mangerError.password.length > 0 && "input-error"
              }`}
              placeholder="Enter Password"
              value={manager.password}
              onChange={handleChange}
            />

            {mangerError.password.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {mangerError.password}
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

export default AddManager;
