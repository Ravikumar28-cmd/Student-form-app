const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  // Hardcoded admin credentials (in production, use a database and bcrypt)
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret_key", { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
};

/**
 * APPLY STUDENT
 * POST /api/students/apply
 */
exports.applyStudent = async (req, res) => {
  try {
    // 1. Basic Validation
    if (!req.body.name || !req.body.email || !req.body.course || !req.body.mobile) {
      return res.status(400).json({ message: "Please fill in all required fields (Name, Email, Course, Mobile)" });
    }

    const studentData = req.body;
    if (req.file) {
      studentData.photo = req.file.path.replace(/\\/g, "/"); // Store path with forward slashes
    }
    const student = new Student(studentData);
    await student.save();

    res.status(201).json({
      message: "Application submitted successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting application",
      error: error.message,
    });
  }
};

/**
 * GET ALL STUDENTS
 * GET /api/students
 */
exports.getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const total = await Student.countDocuments(query);
    const students = await Student.find(query).sort({ _id: -1 }).skip(skip).limit(limit);

    res.status(200).json({
      students,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalStudents: total
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
};

/**
 * DELETE STUDENT
 * DELETE /api/students/:id
 */
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student",
      error: error.message,
    });
  }
};

/**
 * UPDATE STUDENT DETAILS
 * PUT /api/students/:id
 */
exports.updateStudent = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.photo = req.file.path.replace(/\\/g, "/");
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
};

/**
 * UPDATE STATUS (Pending ↔ Accepted)
 * PUT /api/students/status/:id
 */
exports.updateStatus = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.status =
      student.status === "Pending" ? "Accepted" : "Pending";

    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: "Error updating status",
      error: error.message,
    });
  }
};
