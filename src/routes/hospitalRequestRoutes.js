const express = require("express");

const { createHospitalRequest, getHospitalRequests } = require("../controllers/hospitalRequestController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("HOSPITAL", "ADMIN"), createHospitalRequest);
router.get("/", protect, authorize("ADMIN", "LAB", "HOSPITAL"), getHospitalRequests);

module.exports = router;
