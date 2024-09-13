const axios = require("axios");
var mongoose = require('mongoose');

describe("Testing the Site Manager  API", () => {

    const customId = "8B7D2A89B2D9497B89D993C3"
    const employeeName =  "Site Manager Test"
    const contactNumber =  "1234325678"
    const email =  "manager123@test.com"
    const password =  "password123"
  
    const newContactNumber =  "1233445678"
    const newEmail =  "manager123New@test.com"
  
    it("GET/SiteManagers -> get an array of managers", async () => {
      const response = await axios.get(
        "http://localhost:5000/api/sitemanagers"
      );
      expect(response.status).toBe(200);
    });
  
    it("POST/SiteManagers/ -> add a manager", async () => {
  
      const sitemanager = {
        customId: customId,
        employeeName: employeeName,
        contactNumber: contactNumber,
        email: email,
        password: password
      };
  
      const response = await axios.post(
        "http://localhost:5000/api/sitemanagers",
        sitemanager
      );
      expect(response.status).toBe(201);
    });
  
    it("PATCH /SiteManagers/Update -> add a manager", async () => {
  
      const sitemanagerUpdate = {
        customId: customId,
        employeeName: employeeName,
        contactNumber: newContactNumber,
        email: newEmail,
        password: password
      };
  
      const response = await axios.patch(
        "http://localhost:5000/api/sitemanagers/update",
        sitemanagerUpdate
      );
      expect(response.status).toBe(201);
    });
  
  
    it("DELETE /SiteManagers/delete -> Delete a manager", async () => {
      const response = await axios.delete(
        `http://localhost:5000/api/sitemanagers/delete/${customId}`
      );
      expect(response.status).toBe(201);
    });
  
  });
  