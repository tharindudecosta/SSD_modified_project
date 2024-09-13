import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { axiosclient } from "../../../api";
import { AdminLayout } from "../../../layouts";
import { isValidString } from "../../../utils";

const AddContructionSite = () => {
  const navigate = useNavigate();

  const [contructionSite, setContructionSite] = useState({
    contructionSiteName: "",
    contructionSiteAddress: "",
    contructionSiteBudget: "",
    contructionSiteManager: ""
  });

  const initialErrors = {
    contructionSiteName: "",
    contructionSiteAddress: "",
    contructionSiteBudget: "",
    contructionSiteManager: ""

  };

  const [contructionSiteError, setContructionSiteError] = useState(initialErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (contructionSiteError[name]?.length) {
      setContructionSiteError({
        ...contructionSiteError,
        [name]: "",
      });
    }

    setContructionSite({
      ...contructionSite,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    let isFormError = false;
    if (!isValidString(contructionSite.contructionSiteName)) {
      isFormError = true;
      setContructionSiteError((prevState) => {
        return {
          ...prevState,
          contructionSiteName: "ContructionSite name cannot be empty",
        };
      });
    }

    if (isFormError === true) return;

    axiosclient.post("/api/contructionSites", contructionSite).then(() => {
      Swal.fire(
        "ContructionSite Added",
        "ContructionSite has been added successfully!",
        "success"
      ).then(() => {
        navigate("/constructionSites");
      });
    });
  };

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full overflow-y-auto">
        <form class="flex flex-col gap-4 px-60 py-10" onSubmit={onFormSubmit}>
          <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
            ContructionSite - Add a ContructionSite
          </h3>
          <div>
            <input
              name="contructionSiteName"
              type="text"
              id="desname"
              class={`input ${
                contructionSiteError.contructionSiteName.length > 0 && "input-error"
              }`}
              placeholder="Enter Site Name"
              value={contructionSite.contructionSiteName}
              onChange={handleChange}
            />
            {contructionSiteError.contructionSiteName.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {contructionSiteError.contructionSiteName}
              </p>
            )}
          </div>

          <div>
            <input
              name="contructionSiteAddress"
              type="text"
              id="desname"
              class={`input ${
                contructionSiteError.contructionSiteAddress.length > 0 && "input-error"
              }`}
              placeholder="Enter Site Address"
              value={contructionSite.contructionSiteAddress}
              onChange={handleChange}
            />
            {contructionSiteError.contructionSiteAddress.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {contructionSiteError.contructionSiteAddress}
              </p>
            )}
          </div>


          <div>
            <input
              name="contructionSiteBudget"
              type="text"
              id="desname"
              class={`input ${
                contructionSiteError.contructionSiteBudget.length > 0 && "input-error"
              }`}
              placeholder="Enter Site Budget"
              value={contructionSite.contructionSiteBudget}
              onChange={handleChange}
            />
            {contructionSiteError.contructionSiteBudget.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {contructionSiteError.contructionSiteBudget}
              </p>
            )}
          </div>


          <div>
            <input
              name="contructionSiteManager"
              type="text"
              id="desname"
              class={`input ${
                contructionSiteError.contructionSiteManager.length > 0 && "input-error"
              }`}
              placeholder="Enter Site Manager"
              value={contructionSite.contructionSiteManager}
              onChange={handleChange}
            />
            {contructionSiteError.contructionSiteManager.length > 0 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {contructionSiteError.contructionSiteManager}
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

export default AddContructionSite;
