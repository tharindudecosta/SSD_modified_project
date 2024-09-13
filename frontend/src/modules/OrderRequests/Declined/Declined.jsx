import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

import { axiosclient } from "../../../api";
import { AdminLayout } from "../../../layouts";

const DeclinedOrders = () => {
  const [declinedOrders, setDeclinedOrders] = useState([]);

  useEffect(() => {
    axiosclient
      .get("/api/orderrequests/declined")
      .then((res) => {
        setDeclinedOrders(res.data);
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
          Approved Orders
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
                  Supplier
                </th>
                <th scope="col" class="py-3 px-6">
                  Amount
                </th>
                <th scope="col" class="py-3 px-6">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {declinedOrders.map((orders) => (
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
                    {orders.supplier?.email}
                  </td>
                  <td class="py-4 px-6 cursor-pointer">
                    {orders?.totalAmount}
                  </td>
                  <td class="py-4 px-6 cursor-pointer">
                    {orders.date.substring(0, 10)}
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

export default DeclinedOrders;
