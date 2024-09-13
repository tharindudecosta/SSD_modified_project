import { OrderRequest, Product, Supplier } from "../models/index.js";

// IT20610166
const createSupplier = (req, res) => {
  const { supplierName, address, contactPerson, email, fax, password } =
    req.body;

  const supplier = new Supplier({
    supplierName,
    address,
    contactPerson,
    email,
    fax,
    password,
  });
  Supplier.create(supplier, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });}
    
    res.status(201).json(data);
  });
};

const getSupplier = (req, res) => {
  Supplier.find()
    .populate("materials")
    .exec(function (err, data) {
      if (err) res.status(500).json({ error: err });
      res.status(200).json(data);
    });
};

const getSupplierById = (req, res) => {
  const { supplierId } = req.params;

  Supplier.findById(supplierId)
    .populate("materials")
    .exec(function (err, data) {
      if (err) res.status(500).json({ error: err });
      res.status(201).json(data);
    });
};

const createMaterialQuotation = (req, res) => {
  const { supplierId } = req.params;
  const { productName, unitOfMeasure, qty } = req.body;

  const product = new Product({
    productName,
    unitOfMeasure,
    qty: Number(qty),
    restrictedProduct: false,
  });

  Product.create(product, (err, product) => {
    if (err) res.status(500).json({ error: err });

    Supplier.findById(supplierId, (err, data) => {
      if (err) {
        res.status(500).json({ error: err });
      }

      data.materials.push(product);

      data.save(function (err) {
        if (err) return res.send(err);
        res.json({ status: "Product added successfully!" });
      });
    });
  });
};

const loginSupplier = (req, res) => {
  const { email, password } = req.body;

  Supplier.findOne({ email: email }, (err, doc) => {
    if (err) {
      return res.status(400).json({ response: "Supplier not found" });
    }
    console.log(doc);
    if (doc.password === password) {
      res.status(200).json(doc);
      return;
    }

    return res.status(400).json({ response: "Supplier not found" });
  });
};

const placedOrders = (req, res) => {
  const { supplierId } = req.params;

  OrderRequest.find({ isPlaced: true, supplier: supplierId })
    .populate("siteManager")
    .populate("supplier")
    .exec(function (err, data) {
      if (err) res.status(500).json({ error: err });
      res.status(200).json(data);
    });
};
const placeSupplierQuotation = (req, res) => {
  const { productId } = req.params;
  const { price } = req.body;

  Product.findById(productId, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    data.hasQuoted = true;
    data.unitPrice = price;

    data.save(function (err) {
      if (err) return res.send(err);
      res.json({ status: "Order Request Approved successfully!" });
    });
  });
};

export {
  createSupplier,
  loginSupplier,
  createMaterialQuotation as addProductsToSupplier,
  getSupplier,
  getSupplierById,
  placedOrders,
  placeSupplierQuotation,
};
