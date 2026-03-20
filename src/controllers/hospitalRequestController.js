const HospitalRequest = require("../models/HospitalRequest");
const asyncHandler = require("../utils/asyncHandler");
const logActivity = require("../utils/activityLogger");

const createHospitalRequest = asyncHandler(async (req, res) => {
  const { hospitalUserId, bloodType, unitsRequested, priority, reason } = req.body;

  if (!bloodType || !unitsRequested) {
    res.status(400);
    throw new Error("bloodType and unitsRequested are required");
  }

  const request = await HospitalRequest.create({
    hospitalUserId,
    bloodType,
    unitsRequested,
    priority: priority || "NORMAL",
    reason
  });

  await logActivity(
    "HOSPITAL_REQUEST",
    `Hospital request created for ${bloodType}`,
    { requestId: request._id }
  );

  res.status(201).json(request);
});

const getHospitalRequests = asyncHandler(async (req, res) => {
  const requests = await HospitalRequest.find({}).sort({ createdAt: -1 });
  res.status(200).json(requests);
});

module.exports = {
  createHospitalRequest,
  getHospitalRequests
};
