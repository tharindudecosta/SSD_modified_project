import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { axiosclient } from "../../../api";
import { AdminLayout } from "../../../layouts";

const ApprovedDeliveryAdvice = () => {
  const [pendingDeliveryAdvices, setPendingDeliveryAdvices] = useState([]);

  useEffect(() => {
    axiosclient
      .get("/api/deliveryadvice/approved")
      .then((res) => {
        setPendingDeliveryAdvices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AdminLayout>
      <div className="dark:bg-gray-900 h-full p-10 overflow-x-auto">
        <div className="flex justify-end gap-2"></div>
        <h2 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
          Delivery Advices - Drafts
        </h2>
        <div class="overflow-x-auto  relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-[#ffb300] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  ID
                </th>
                <th scope="col" class="py-3 px-6">
                  Order ID
                </th>
                <th scope="col" class="py-3 px-6">
                  Delivered Date
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingDeliveryAdvices.map((deliveryadvices) => (
                <tr
                  key={uuid()}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {deliveryadvices._id}
                  </th>
                  <td class="py-4 px-6 cursor-pointer">
                    {deliveryadvices.order._id}
                  </td>
                  <td class="py-4 px-6 cursor-pointer">
                    {deliveryadvices.deliveredDate.substring(0, 10)}
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

export default ApprovedDeliveryAdvice;
