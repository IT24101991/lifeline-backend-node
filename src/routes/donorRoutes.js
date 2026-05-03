const express = require("express");

const { getEligibility, getDonorByUserId, healthCheck } = require("../controllers/donorController");
<<<<<<< HEAD
const { getDonors } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/all", protect, authorize("ADMIN"), getDonors);
=======
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

>>>>>>> 445617f4568e9ef3ae030c04dd1a67cb6df1ee75
router.get("/:id/eligibility", protect, getEligibility);
router.get("/user/:userId", protect, getDonorByUserId);
router.post("/health-check", protect, healthCheck);

module.exports = router;
