import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

import { axiosclient } from "../../../../api";
import { AdminLayout } from "../../../../layouts";
import { useGlobalState } from "../../../../utils";
import { STAFF } from "../../../../utils/string";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useGlobalState("user");

  useEffect(() => {
    axiosclient
      .get("/api/supplier")
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full p-10 overflow-x-auto">
        <div className="flex justify-end gap-2">
          {user === STAFF && (
            <Link to="/suppliers/new">
              <button
                type="button"
                class="h-10 focus:outline-none text-white bg-[#ffb300] hover:bg-[#ffb300]  font-medium rounded text-sm px-5 py-2.5"
              >
                Add a Supplier
              </button>
            </Link>
          )}
        </div>
        <h2 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
          Suppliers
        </h2>
        <div class="overflow-x-auto  relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-[#ffb300] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ID
                </th>
                <th scope="col" class="py-3 px-6">
                  Supplier Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Address
                </th>
                <th scope="col" class="py-3 px-6">
                  Contact Person
                </th>
                <th scope="col" class="py-3 px-6">
                  Email
                </th>
                <th scope="col" class="py-3 px-6">
                  Fax
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr
                  key={uuid()}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {supplier._id}
                  </th>
                  <td
                    class="py-4 px-6 cursor-pointer"
                    onClick={() => {
                      navigate(`/suppliers/products/${supplier._id}`);
                    }}
                  >
                    {supplier.supplierName}
                  </td>
                  <td class="py-4 px-6">{supplier.address.slice(0, 20)}...</td>
                  <td class="py-4 px-6">{supplier.contactPerson}</td>
                  <td class="py-4 px-6">{supplier.email}</td>
                  <td class="py-4 px-6">{supplier.fax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Suppliers;
