import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

import { axiosclient } from "../../../api";
import { AdminLayout } from "../../../layouts";
import { useGlobalState } from "../../../utils";

const PlacedOrders = () => {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [supplierId, setSupplierId] = useGlobalState("supplierId");

  useEffect(() => {
    axiosclient
      // Remove the hardcoded supplier id and
      .get(`/api/supplier/orders/placed/${supplierId}`)
      .then((res) => {
        setPlacedOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDeliver = (order) => {
    axiosclient.post(`/api/deliveryadvice`, { order }).then(() => {
      Swal.fire(
        "Marked as delivered",
        "Order delivery advice sent successfully!",
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
          Received Orders
        </h2>
        <div class="overflow-x-auto  relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-[#ffb300] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ID
                </th>
                <th scope="col" class="py-3 px-6">
                  Placed By
                </th>

                <th scope="col" class="py-3 px-6">
                  Amount
                </th>
                <th scope="col" class="py-3 px-6">
                  Date
                </th>
                <th scope="col" class="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {placedOrders.map((orders) => (
                <tr
                  key={uuid()}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {orders._id}
                  </th>
                  <td class="py-4 px-6 cursor-pointer">
                    {orders.siteManager?.email}
                  </td>
                  <td class="py-4 px-6 cursor-pointer">
                    {orders?.totalAmount}
                  </td>
                  <td class="py-4 px-6 cursor-pointer">
                    {orders.date.substring(0, 10)}
                  </td>
                  <td class="py-4 px-6 cursor-pointer">
                    <button
                      type="button"
                      onClick={() => {
                        onDeliver(orders._id);
                      }}
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Deliver
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

export default PlacedOrders;
