import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { axiosclient } from "../../../api";
import { AdminLayout } from "../../../layouts";
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidString,
} from "../../../utils";

const AddSiteManager = () => {
  const navigate = useNavigate();

  const [siteManger, setSiteManager] = useState({
    employeeName: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const initialErrors = {
    employeeName: "",
    contactNumber: "",
    email: "",
    password: "",
  };

  const [siteMangerError, setSiteMangerError] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (siteMangerError[name]?.length) {
      setSiteMangerError(initialErrors);
    }

    setSiteManager({
      ...siteManger,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    let isFormError = false;
    if (!isValidString(siteManger.employeeName)) {
      isFormError = true;
      setSiteMangerError((prevState) => {
        return {
          ...prevState,
          employeeName: "Sitemanager name cannot be empty",
        };
      });
    }

    if (!isValidPhoneNumber(siteManger.contactNumber)) {
      isFormError = true;
      setSiteMangerError((prevState) => {
        return {
          ...prevState,
          contactNumber: "Contact number should be in valid format",
        };
      });
    }

    if (!isValidEmail(siteManger.email)) {
      isFormError = true;
      setSiteMangerError((prevState) => {
        return {
          ...prevState,
          email: "Email should be in valid format",
        };
      });
    }

    if (!isValidPassword(siteManger.password)) {
      isFormError = true;
      setSiteMangerError((prevState) => {
        return {
          ...prevState,
          password:
            "Password should contain at least minimum 8 characters, one letter and a number",
        };
      });
    }

    if (isFormError === true) return;

    axiosclient.post("/api/sitemanagers", siteManger).then(() => {
      Swal.fire(
        "Sitemanager Added",
        "Sitemanager has been added successfully!",
        "success"
      ).then(() => {
        navigate("/sitemanagers");
      });
    });
  };

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full overflow-y-auto">
        <form class="flex flex-col gap-4 px-60 py-10" onSubmit={onFormSubmit}>
          <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
            Sitemanager - Add a Sitemanager
          </h3>
          <div>
            <input
              name="employeeName"
              type="text"
              id="desname"
              class={`input ${
                siteMangerError.employeeName.length > 0 && "input-error"
              }`}
              placeholder="Enter Site Manager Name"
              value={siteManger.employeeName}
              onChange={handleChange}
            />
            {siteMangerError.employeeName.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {siteMangerError.employeeName}
              </p>
            )}
          </div>

          <div>
            <input
              name="contactNumber"
              type="text"
              id="country"
              class={`input ${
                siteMangerError.contactNumber.length > 0 && "input-error"
              }`}
              placeholder="Contact Number"
              value={siteManger.contactNumber}
              onChange={handleChange}
            />

            {siteMangerError.contactNumber.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {siteMangerError.contactNumber}
              </p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="text"
              id="country"
              class={`input ${
                siteMangerError.email.length > 0 && "input-error"
              }`}
              placeholder="Enter Email"
              value={siteManger.email}
              onChange={handleChange}
            />

            {siteMangerError.email.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {siteMangerError.email}
              </p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="text"
              id="email"
              class={`input ${
                siteMangerError.password.length > 0 && "input-error"
              }`}
              placeholder="Enter Password"
              value={siteManger.password}
              onChange={handleChange}
            />

            {siteMangerError.password.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {siteMangerError.password}
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

export default AddSiteManager;
