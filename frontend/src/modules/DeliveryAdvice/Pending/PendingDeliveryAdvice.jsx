import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

import { axiosclient } from "../../../api";
import { AdminLayout } from "../../../layouts";

const PendingDeliveryAdvice = () => {
  const [pendingDeliveryAdvices, setPendingDeliveryAdvices] = useState([]);

  useEffect(() => {
    axiosclient
      .get("/api/deliveryadvice/pending")
      .then((res) => {
        setPendingDeliveryAdvices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleApprove = (id) => {
    axiosclient.post(`/api/deliveryadvice/approve/${id}`).then(() => {
      Swal.fire(
        "Delivery Advice Approved",
        "Delivery Advice has been approved successfully!",
        "success"
      ).then(() => {
        //   navigate("/suppliers");
      });
    });
  };

  const handleDecline = (id) => {
    axiosclient.post(`/api/deliveryadvice/decline/${id}`).then(() => {
      Swal.fire(
        "Delivery Advice Declined",
        "Delivery Advice has been declined successfully!",
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
          Pending Delivery Advices
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

                <th scope="col" class="py-3 px-6">
                  Actions
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

                  <td class="py-4 px-6 cursor-pointer">
                    <button
                      type="button"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={() => {
                        handleApprove(deliveryadvices._id);
                      }}
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => {
                        handleDecline(deliveryadvices._id);
                      }}
                    >
                      Decline
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

export default PendingDeliveryAdvice;
