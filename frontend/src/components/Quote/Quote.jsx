import React, { useState } from "react";
import { axiosclient } from "../../api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Quote = ({ product, supplier }) => {
  const [price, setPrice] = useState();
  const navigate = useNavigate();

  const handleClick = () => {
    axiosclient
      .put(`/api/supplier/quotation/${product._id}`, {
        price,
      })
      .then(() => {
        Swal.fire(
          "Quotation Placed!",
          "Quotation has been placed successfully!",
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
          placeholder="Enter your quotation"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </td>

      <td class="py-4 px-6">
        <button
          onClick={handleClick}
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Quote
        </button>
      </td>
    </>
  );
};

export default Quote;
