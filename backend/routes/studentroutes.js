const express = require("express");
const router = express.Router();
const controller = require("../controllers/Studentcontroller");
const protect = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/login", controller.loginAdmin);
router.post("/apply", upload.single("photo"), controller.applyStudent);
router.get("/", protect, controller.getStudents);
router.delete("/:id", protect, controller.deleteStudent);
router.put("/:id", protect, upload.single("photo"), controller.updateStudent);
router.put("/status/:id", protect, controller.updateStatus);

module.exports = router;
