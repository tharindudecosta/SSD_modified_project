import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../utils";
import { MANAGER, SITEMANAGER, STAFF, SUPPLIER } from "../../utils/string";

const AdminLayout = ({ children }) => {
  const [user, setUser] = useGlobalState("user");

  return (
    <div className="flex items-start h-[calc(100vh-10.625rem)]">
      <aside className="w-1/5 h-full" aria-label="Sidebar">
        <div class="h-full overflow-y-auto py-4 px-3 bg-[#ffb300] dark:bg-gray-800">
          <ul class="space-y-2">
            {(user === SITEMANAGER || user === SUPPLIER || user === STAFF) && (
              <>
                <li>
                  <Link
                    to="/suppliers"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3">Suppliers</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/sitemanagers"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3">Site Managers</span>
                  </Link>
                </li>
              </>
            )}

            {user === SITEMANAGER && (
              <>
                <li>
                  <Link
                    to="/deliveryadvices/pending"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3">Pending Delivery Advices</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/deliveryadvices/drafts"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3"> Delivery Advices - Drafts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/deliveryadvices/approved"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3"> Delivery Advices - Approved</span>
                  </Link>
                </li>
              </>
            )}

            {(user === SUPPLIER || user === STAFF) && (
              <>
                <li>
                  <Link
                    to="/quotations"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3"> Products</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/orders/placed"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3">Placed Orders</span>
                  </Link>
                </li>
              </>
            )}

            {(user === MANAGER || user === STAFF) && (
              <>
                <li>
                  <Link
                    to="/constructionSites"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3">Contruction Sites</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/managers"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3">Managers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders/pending"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3">Pending Order Requests</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/orders/approved"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3">Approved Order Requests</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/orders/declined"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3">Declined Order Requests</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/quotations/manager"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span class="ml-3"> Approve Quotations - Manager</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>

      <aside className="w-full h-full">{children}</aside>
    </div>
  );
};

export default AdminLayout;
