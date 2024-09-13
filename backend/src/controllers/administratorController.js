import { Administrator } from "../models/index.js";

const createAdministrator = (req, res) => {
  const { employeeName, contactNumber, email, password } = req.body;

  const manager = new Administrator({
    employeeName,
    contactNumber,
    email,
    password,
  });

  Administrator.create(manager, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const loginAdministrator = (req, res) => {
  const { email, password } = req.body;

  Administrator.findOne({ email: email }, (err, doc) => {
    if (err) {
      return res.status(400).json({ response: "Administrator not found" });
    }

    if (doc.password === password) {
      res.status(200).json(doc);
      return;
    }

    return res.status(400).json({ response: "Administrator not found" });
  });
};

export { createAdministrator, loginAdministrator };
