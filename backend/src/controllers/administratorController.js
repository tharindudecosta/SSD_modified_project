import { Administrator } from "../models/index.js";

const createAdministrator = (req, res) => {
  const { employeeName, contactNumber, email, password } = req.body;

  const manager = new Administrator({
    employeeName:employeeName.toString(),
    contactNumber:contactNumber,
    email:email.toString(),
    password:password.toString(),
  });

  Administrator.create(manager, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const loginAdministrator = (req, res) => {
  const { email, password } = req.body;

// email check

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
