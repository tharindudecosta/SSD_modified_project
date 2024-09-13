import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { axiosclient } from "../../../api";
import { useGlobalState } from "../../../utils";
import {
  LOGIN,
  LOGINSITEMANAGER,
  LOGIN_SUCCCESSFUL,
  MANAGERS,
  SITEMANAGER,
  SUCCESS
} from "../../../utils/string";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useGlobalState("user");
  const [siteMangerId, setSiteManagerId] = useGlobalState("siteManagerId");

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosclient.post(LOGINSITEMANAGER, login).then((res) => {
      Swal.fire(LOGIN, LOGIN_SUCCCESSFUL, SUCCESS).then(() => {
        setUser(SITEMANAGER);
        navigate(MANAGERS);
        setSiteManagerId(res.data._id);
      });
    });
  };

  return (
    <div className="dark:bg-gray-900 h-full overflow-y-auto">
      <form class="flex flex-col gap-4 px-60 py-10" onSubmit={onSubmit}>
        <h3 class="text-2xl text-gray-900 my-4 font-extrabold font-primary dark:text-white">
          Sitemanager - Login
        </h3>

        <div>
          <input
            name="email"
            type="text"
            id="country"
            class={`input`}
            placeholder="Email"
            value={login.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="password"
            type="text"
            id="country"
            class={`input`}
            placeholder="Password"
            value={login.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          class="h-10 w-full focus:outline-none text-white bg-[#ffb300] hover:bg-orange-600  font-medium rounded text-sm px-5 py-2.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
