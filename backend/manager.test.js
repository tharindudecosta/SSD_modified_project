const axios = require("axios");
var mongoose = require('mongoose');

describe("Testing the Manager  API", () => {

    const manName = "Test manager"
    const department = "63671eccc40249c4a481d7b8"
    const contactNumber = "23424324"
    const email = "test@manager.com"
    const password = "sedef"
    const customId = "qazwsxedcrfv123"
  
    const newContact = "1234567890"
    const newmail = "testNew@manager.com"
  
    it("GET/managers -> get an array of managers", async () => {
      const response = await axios.get(
        "http://localhost:5000/api/managers"
      );
      expect(response.status).toBe(200);
    });
  
    it("POST/Manager/ -> add a manager", async () => {
      const response = await axios.post(
        "http://localhost:5000/api/managers",
        {
          manName:manName,
          department: department,
          contactNumber: contactNumber,
          email: email,
          password: password,
          customId:customId
        }
      );
  
      expect(response.status).toBe(201);
    });
  
    it("update /Manager/ -> update manager", async () => {
      const response = await axios.patch(
        "http://localhost:5000/api/managers/update",
        {
          department: department,
          contactNumber: newContact,
          email: newmail,
          password: password,
          customId:customId
        }
      );
  
      expect(response.status).toBe(201);
    });
  
    it("DELETE /managers/delete -> Delete a manager", async () => {
      const response = await axios.delete(
        `http://localhost:5000/api/managers/delete/${customId}`
      );
      expect(response.status).toBe(201);
    });
  
    it("GET /Products/Unapproved -> get a list of unapproved products", async () => {
      const response = await axios.get(
        "http://localhost:5000/api/managers/products"
      );
      expect(response.status).toBe(200);
    });
  
  });