import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

import { axiosclient } from "../../../api";
import { AdminLayout } from "../../../layouts";

const ManagerQuotations = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosclient
      .get(`/api/managers/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleApprove = (id) => {
    axiosclient.post(`/api/managers/products/${id}`).then(() => {
      Swal.fire(
        "Product Quotations Approved",
        "Product Quotations Approved By The Manager!",
        "success"
      ).then(() => {
        //   navigate("/suppliers");
      });
    });
  };

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full p-10 overflow-x-auto">
        <div className="flex justify-end gap-2"></div>
        <h2 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
          Approve Quotations - Manager
        </h2>
        <div class="overflow-x-auto  relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-[#ffb300] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ID
                </th>
                <th scope="col" class="py-3 px-6">
                  Product Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Unit of Measure
                </th>
                <th scope="col" class="py-3 px-6">
                  Quantity
                </th>
                <th scope="col" class="py-3 px-6">
                  Unit Price
                </th>
                <th scope="col" class="py-3 px-6">
                  Actions
                </th>

                <th scope="col" class="py-3 px-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr
                  key={uuid()}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product._id}
                  </th>
                  <td class="py-4 px-6">{product.productName}</td>
                  <td class="py-4 px-6">{product.unitOfMeasure}</td>
                  <td class="py-4 px-6">{product.qty}</td>
                  <td class="py-4 px-6">{product.unitPrice}</td>
                  <td class="py-4 px-6 cursor-pointer">
                    <button
                      type="button"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={() => {
                        handleApprove(product._id);
                      }}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManagerQuotations;
