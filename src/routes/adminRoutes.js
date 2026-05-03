const express = require("express");

<<<<<<< HEAD
const { getUsers, createUser, updateUserRole, getDonors } = require("../controllers/adminController");
=======
const { getUsers, createUser, updateUserRole } = require("../controllers/adminController");
>>>>>>> 445617f4568e9ef3ae030c04dd1a67cb6df1ee75
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

<<<<<<< HEAD
router.get("/users", protect, authorize("ADMIN"), getUsers);
router.get("/donors", protect, authorize("ADMIN"), getDonors);
router.post("/users", protect, authorize("ADMIN"), createUser);
router.put("/users/:userId/role", protect, authorize("ADMIN"), updateUserRole);
=======
router.get("/", protect, authorize("ADMIN"), getUsers);
router.post("/", protect, authorize("ADMIN"), createUser);
router.put("/:userId/role", protect, authorize("ADMIN"), updateUserRole);
>>>>>>> 445617f4568e9ef3ae030c04dd1a67cb6df1ee75

module.exports = router;
