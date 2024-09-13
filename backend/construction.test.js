const axios = require("axios");
var mongoose = require('mongoose');


describe("Testing the contructionSites  API", () => {

    const contructionSiteName = "Test site "
    const contructionSiteAddress = "Kaluthara"
    const contructionSiteBudget = "12000000"
    const contructionSiteManager = "Kumudu"
    const customId = "65432wecwvww212dw"
  
    const newContructionSiteBudget = "23000000"
    const newContructionSiteManager = "Pasindu"
  
    it("GET /contructionSites -> get an array of departments", async () => {
      const response = await axios.get(
        "http://localhost:5000/api/contructionSites"
      );
      expect(response.status).toBe(200);
    });
  
    it("POST /contructionSites/ -> add a contructionSites", async () => {
      const site = {
        contructionSiteName:contructionSiteName,
        contructionSiteAddress:contructionSiteAddress,
        contructionSiteBudget:contructionSiteBudget,
        contructionSiteManager:contructionSiteManager,
        customId:customId
      };
      const response = await axios.post(
        "http://localhost:5000/api/contructionSites",
        site
      );
      expect(response.status).toBe(201);
    });
  
  
    it("PATCH /contructionSites/Update -> add a manager", async () => {
  
      const siteUpdate = {
        contructionSiteName:contructionSiteName,
        contructionSiteAddress:contructionSiteAddress,
        contructionSiteBudget:newContructionSiteBudget,
        contructionSiteManager:newContructionSiteManager,
        customId:customId
      };
  
      const response = await axios.patch(
        "http://localhost:5000/api/contructionSites/update",
        siteUpdate
      );
      expect(response.status).toBe(201);
    });
  
  
    it("DELETE /SiteManagers/delete -> Delete a manager", async () => {
      const response = await axios.delete(
        `http://localhost:5000/api/contructionSites/delete/${customId}`
      );
      expect(response.status).toBe(201);
    });
  });