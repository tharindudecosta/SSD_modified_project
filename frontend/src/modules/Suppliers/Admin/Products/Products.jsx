import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { axiosclient } from "../../../../api";
import { AdminLayout } from "../../../../layouts";
import Purchase from "../../../../components/Purchase/Purchase";
import { useGlobalState } from "../../../../utils";
import { STAFF } from "../../../../utils/string";

const Suppliers = () => {
  const { supplierId } = useParams();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useGlobalState("user");

  useEffect(() => {
    axiosclient
      .get(`/api/supplier/${supplierId}`)
      .then((res) => {
        setProducts(
          res.data.materials.filter(
            (material) =>
              material.hasQuoted === true && material.isApproved === true
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [supplierId]);

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full p-10 overflow-x-auto">
        <div className="flex justify-end gap-2">
          {user === STAFF && (
            <Link to={`/suppliers/products/add/${supplierId}`}>
              <button
                type="button"
                class="h-10 focus:outline-none text-white bg-[#ffb300] hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
              >
                Add a Product
              </button>
            </Link>
          )}
        </div>
        <h2 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
          Supplier Products
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
                  Purchase
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

                  <Purchase product={product} supplier={supplierId} />
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
