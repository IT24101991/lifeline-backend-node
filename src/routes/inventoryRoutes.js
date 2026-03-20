const express = require("express");

const { getInventory, addInventory, getLabResults, updateLabTest } = require("../controllers/inventoryController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, authorize("ADMIN", "LAB"), getInventory);
router.post("/add", protect, authorize("ADMIN"), addInventory);
router.get("/:id/lab-results", protect, authorize("ADMIN", "LAB"), getLabResults);
router.put("/:id/test", protect, authorize("ADMIN", "LAB"), updateLabTest);

module.exports = router;
