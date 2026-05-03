const express = require("express");

const { getInventory, getInventoryDetails, addInventory, getLabResults, updateLabTest, uploadLabTestFiles, updateLabPositiveDetails, getLowStockAlerts } = require("../controllers/inventoryController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", protect, authorize("ADMIN", "LAB"), getInventory);
router.get("/low-stock", protect, getLowStockAlerts);
router.post("/add", protect, authorize("ADMIN"), addInventory);
router.get("/:id/details", protect, authorize("ADMIN", "LAB"), getInventoryDetails);
router.get("/:id/lab-results", protect, authorize("ADMIN", "LAB"), getLabResults);
router.put("/:id/test", protect, authorize("ADMIN", "LAB"), upload.labUpload.array("files", 5), updateLabTest);
router.post("/:id/lab-files", protect, authorize("ADMIN", "LAB"), upload.labUpload.array("files", 5), uploadLabTestFiles);
router.put("/:id/positive-details", protect, authorize("ADMIN", "LAB"), updateLabPositiveDetails);

module.exports = router;
