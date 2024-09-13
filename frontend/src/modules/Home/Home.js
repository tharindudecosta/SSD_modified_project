import React from "react";
import { useNavigate } from "react-router-dom";
import './tiles.css'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="main-body">
      <div className="" style={{ fontSize: "33px", marginLeft: "34px" }}>
        <h2 className="text-">Logins Page</h2>
      </div>{" "}
      <div>
        <div
          className="tiles-common admin-tile"
          onClick={() => {
            navigate("/staff/login");
          }}
        >
          <div className="tile-icon">
          </div>
          <div className="tile-text">Admin login</div>
        </div>

        <div
          className="tiles-common supplier-tile"
          onClick={() => {
            navigate("/supplier/login");
          }}
        >
          <div className="tile-icon">
          </div>
          <div className="tile-text">Supplier</div>
        </div>

        <div
          className="tiles-common manager-tile"
          onClick={() => {
            navigate("/manager/login");
          }}
        >
          <div className="tile-icon">
          </div>
          <div className="tile-text">Manager</div>
        </div>        
        
        <div
          className="tiles-common site-manager-tile"
          onClick={() => {
            navigate("/sitemanager/login");
          }}
        >
          <div className="tile-icon">
          </div>
          <div className="tile-text">Site-manager</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
