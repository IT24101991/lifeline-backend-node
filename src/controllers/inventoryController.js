const Inventory = require("../models/Inventory");
const asyncHandler = require("../utils/asyncHandler");
const logActivity = require("../utils/activityLogger");

const getInventory = asyncHandler(async (req, res) => {
  const items = await Inventory.find({}).sort({ collectedAt: -1 });
  res.status(200).json(
    items.map((item) => ({
      id: item._id,
      bloodType: item.bloodType,
      quantity: item.quantity,
      donorName: item.donorName,
      status: item.status,
      safetyFlag: item.safetyFlag,
      testStatus: item.testStatus,
      collectedAt: item.collectedAt
    }))
  );
});

const addInventory = asyncHandler(async (req, res) => {
  const { bloodType, quantity, donorName } = req.body;

  if (!bloodType || !quantity) {
    res.status(400);
    throw new Error("bloodType and quantity are required");
  }

  const item = await Inventory.create({
    bloodType,
    quantity,
    donorName,
    status: "AVAILABLE",
    safetyFlag: "PENDING",
    testStatus: "PENDING"
  });

  res.status(201).json(item);
});

const getLabResults = asyncHandler(async (req, res) => {
  const item = await Inventory.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Inventory item not found");
  }

  res.status(200).json(item.labResults || []);
});

const updateLabTest = asyncHandler(async (req, res) => {
  const item = await Inventory.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Inventory item not found");
  }

  const result = {
    hiv: Boolean(req.body.hiv),
    hep: Boolean(req.body.hep),
    malaria: Boolean(req.body.malaria),
    reason: req.body.reason || ""
  };

  const hasPositiveMarker = result.hiv || result.hep || result.malaria;
  item.labResults.push(result);
  item.testStatus = hasPositiveMarker ? "TESTED_POSITIVE" : "TESTED_SAFE";
  item.safetyFlag = hasPositiveMarker ? "BIO-HAZARD" : "SAFE";
  item.status = hasPositiveMarker ? "DISCARD" : "AVAILABLE";
  await item.save();

  await logActivity(
    "LAB_RESULT",
    `Lab result updated for blood bag ${item._id}`,
    { inventoryId: item._id, testStatus: item.testStatus }
  );

  res.status(200).json({
    id: item._id,
    testStatus: item.testStatus,
    safetyFlag: item.safetyFlag
  });
});

module.exports = {
  getInventory,
  addInventory,
  getLabResults,
  updateLabTest
};
