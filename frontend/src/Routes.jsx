import React from "react";
import { Routes as AppRoutes, Route } from "react-router-dom";
import {
  AddContructionSite,
  AddManager,
  AddProducts,
  AddSiteManager,
  AddSuppliers,
  ApprovedDeliveryAdvice,
  ApprovedOrders,
  ContructionSites,
  DeclinedOrders,
  DraftsDeliveryAdvice,
  Home,
  ManagerLogin,
  ManagerQuotations,
  Managers,
  PendingDeliveryAdvice,
  PendingOrders,
  PlacedOrders,
  Products,
  Quotation,
  SiteManagers,
  SiteMangerLogin,
  StaffLogin,
  SupplierLogin,
  Suppliers
} from "./modules";

const Routes = () => {
  return (
    <AppRoutes>
      {/* Suppliers Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/suppliers/new" element={<AddSuppliers />} />
      <Route path="/suppliers/products/:supplierId" element={<Products />} />
      <Route
        path="/suppliers/products/add/:supplierId"
        element={<AddProducts />}
      />

      {/* Departments Routes */}
      <Route path="/constructionSites" element={<ContructionSites />} />
      <Route path="/constructionsite/new" element={<AddContructionSite />} />

      {/* Sitemanager Routes */}
      <Route path="/sitemanagers" element={<SiteManagers />} />
      <Route path="/sitemanagers/new" element={<AddSiteManager />} />

      {/* Manager Routes */}
      <Route path="/managers" element={<Managers />} />
      <Route path="/managers/new" element={<AddManager />} />

      {/* Order Routes */}
      <Route path="/orders/pending" element={<PendingOrders />} />
      <Route path="/orders/approved" element={<ApprovedOrders />} />
      <Route path="/orders/declined" element={<DeclinedOrders />} />
      <Route path="/orders/placed" element={<PlacedOrders />} />

      {/* Delivery Advice Routes */}
      <Route
        path="/deliveryadvices/pending"
        element={<PendingDeliveryAdvice />}
      />
      <Route
        path="/deliveryadvices/drafts"
        element={<DraftsDeliveryAdvice />}
      />
      <Route
        path="/deliveryadvices/approved"
        element={<ApprovedDeliveryAdvice />}
      />

      {/* Quotations Routes */}
      <Route path="/quotations" element={<Quotation />} />
      <Route path="/quotations/manager" element={<ManagerQuotations />} />

      <Route path="/manager/login" element={<ManagerLogin />} />
      <Route path="/supplier/login" element={<SupplierLogin />} />
      <Route path="/sitemanager/login" element={<SiteMangerLogin />} />
      <Route path="/staff/login" element={<StaffLogin />} />
    </AppRoutes>
  );
};

export default Routes;
