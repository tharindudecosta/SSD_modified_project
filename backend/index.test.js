const axios = require("axios");
var mongoose = require('mongoose');

// var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');


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


describe("Testing the Order Requests  API", () => {
  it("GET/Orders/Pending -> get an array of orders to approve", async () => {
    const response = await axios.get(
      "http://localhost:5000/api/orderrequests/pending"
    );
    expect(response.status).toBe(200);
  });

  it("GET/Orders/Approved -> get an array of orders to approve", async () => {
    const response = await axios.get(
      "http://localhost:5000/api/orderrequests/approved"
    );
    expect(response.status).toBe(200);
  });

  it("GET/Orders/Declined -> get a list of declined orders", async () => {
    const response = await axios.get(
      "http://localhost:5000/api/orderrequests/declined"
    );
    expect(response.status).toBe(200);
  });
});



describe("Testing the Delivery Advices  API", () => {
  it("GET/DeliveryAdvice/Pending -> get an array of orders to delivery advice", async () => {
    const response = await axios.get(
      "http://localhost:5000/api/deliveryadvice/pending"
    );
    expect(response.status).toBe(200);
  });

  it("GET/DeliveryAdvice/Approved -> get an array of delivery advice to approve", async () => {
    const response = await axios.get(
      "http://localhost:5000/api/deliveryadvice/approved"
    );
    expect(response.status).toBe(200);
  });

  it("GET/DeliveryAdvice/Drafts -> get a list of delivery advices drafts", async () => {
    const response = await axios.get(
      "http://localhost:5000/api/deliveryadvice/drafts"
    );
    expect(response.status).toBe(200);
  });
});



describe("Testing the Procument officer  API", () => {
  const testAdmin = {
    employeeName: "Admin",
    contactNumber: "12345",
    email: "procument@industry.com",
    password: "test",
  };

  const testAdminLogin = {
    email: "procument@industry.com",
    password: "test",
  };

  it("POST /Admin Officer/ -> Create a admin officer", async () => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/",
      testAdmin
    );

    expect(response.status).toBe(201);
  });

  it("POST /Admin Officer/ -> Login a admin officer", async () => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/login",
      testAdminLogin
    );

    expect(response.status).toBe(200);
  });
});
