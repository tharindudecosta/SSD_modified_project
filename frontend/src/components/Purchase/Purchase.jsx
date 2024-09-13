import React, { useState } from "react";
import { axiosclient } from "../../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils";

const Purchase = ({ product, supplier }) => {
  const [qty, setQty] = useState();
  const navigate = useNavigate();
  const [siteManagerId, setSiteManagerId] = useGlobalState("siteManagerId");

  const handleClick = () => {
    const orderRequest = {
      products: [product._id],
      totalAmount: product.unitPrice * qty,
      siteManager: siteManagerId,
      supplier: supplier,
    };

    axiosclient.post(`/api/orderrequests`, orderRequest).then(() => {
      Swal.fire(
        "Order Request Added",
        "Order Request has been added successfully!",
        "success"
      ).then(() => {
        navigate("/suppliers");
      });
    });
  };

  return (
    <>
      <td class="py-4 px-6">
        <input
          name="departmentName"
          type="number"
          id="desname"
          class={`input ${qty > product.qty && "input-error"}`}
          placeholder="Enter Quantity"
          onChange={(e) => {
            setQty(e.target.value);
          }}
        />
      </td>

      <td class="py-4 px-6">
        <button
          onClick={handleClick}
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Purchase
        </button>
      </td>
    </>
  );
};

export default Purchase;
