import { ContructionSite } from "../models/index.js";

const createContructionSite = (req, res) => {
  const {
    contructionSiteName,
    contructionSiteAddress,
    contructionSiteBudget,
    contructionSiteManager,
  } = req.body;

  // siteName: {
  //   type: String,
  // },
  // siteAddress: {
  //   type: String,
  // },
  // siteBudjet: {
  //   type: String,
  // },
  // siteManager: {
  //   type: String,
  // }

  const contructionSite = new ContructionSite({
    siteName: contructionSiteName,
    siteAddress: contructionSiteAddress,
    siteBudjet: contructionSiteBudget,
    siteManager: contructionSiteManager,
  });

  console.log(contructionSite);
  ContructionSite.create(contructionSite, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const getContructionSites = (req, res) => {
  ContructionSite.find({}, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(200).json(data);
  });
};

const deleteContructionSite = (req, res) => {
  const { customId } = req.params;

  ContructionSite.findOneAndDelete({ customId: customId }, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const updateContructionSite = (req, res) => {
  const {
    contructionSiteName,
    contructionSiteAddress,
    contructionSiteBudget,
    contructionSiteManager,
    customId,
  } = req.body;

  const site = new ContructionSite({
    siteName: contructionSiteName,
    siteAddress: contructionSiteAddress,
    siteBudjet: contructionSiteBudget,
    siteManager: contructionSiteManager,
    customId: customId,
  });

  ContructionSite.updateOne({ customId: customId }, { site }, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

export {
  createContructionSite,
  getContructionSites,
  updateContructionSite,
  deleteContructionSite,
};
