const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

/**
 * @api {get} /api/students Get All Students
 * @apiName GetStudents
 * @apiGroup Students
 * @apiDescription Returns a list of all students in the database.
 *
 * @apiSuccess {Object[]} students List of student objects.
 * @apiSuccess {String} students._id Unique ID.
 * @apiSuccess {String} students.firstName First name.
 * @apiSuccess {String} students.lastName Last name.
 * @apiSuccess {String} students.email Email address.
 * @apiSuccess {String} students.course Enrolled course.
 * @apiSuccess {Number} students.year Year of study.
 * @apiSuccess {Number} students.gpa GPA score.
 * @apiSuccess {String} students.status Enrollment status.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [{ "_id": "...", "firstName": "Aarav", "lastName": "Shah", ... }]
 *
 * @apiError (500) InternalServerError Failed to fetch students.
 */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students", error: err.message });
  }
});

/**
 * @api {get} /api/students/:id Get Student by ID
 * @apiName GetStudent
 * @apiGroup Students
 * @apiDescription Returns a single student by their ID.
 *
 * @apiParam {String} id Student's unique ID.
 *
 * @apiSuccess {Object} student The student object.
 * @apiError (404) NotFound Student not found.
 * @apiError (500) InternalServerError Server error.
 */
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * @api {post} /api/students Create a New Student
 * @apiName CreateStudent
 * @apiGroup Students
 * @apiDescription Creates a new student record.
 *
 * @apiBody {String} firstName Student's first name.
 * @apiBody {String} lastName Student's last name.
 * @apiBody {String} email Student's email (must be unique).
 * @apiBody {String} course Enrolled course name.
 * @apiBody {Number} year Year of study (1–5).
 * @apiBody {Number} [gpa] GPA score (0.0–4.0).
 * @apiBody {String} [status=active] Status: active | inactive | graduated.
 * @apiBody {String} [phone] Phone number.
 * @apiBody {String} [address] Home address.
 *
 * @apiSuccess (201) {Object} student Newly created student.
 * @apiError (400) BadRequest Validation failed.
 */
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Validation failed", error: err.message });
  }
});

/**
 * @api {put} /api/students/:id Update a Student
 * @apiName UpdateStudent
 * @apiGroup Students
 * @apiDescription Updates an existing student record by ID.
 *
 * @apiParam {String} id Student's unique ID.
 * @apiBody {String} [firstName] First name.
 * @apiBody {String} [lastName] Last name.
 * @apiBody {String} [email] Email address.
 * @apiBody {String} [course] Course name.
 * @apiBody {Number} [year] Year of study.
 * @apiBody {Number} [gpa] GPA score.
 * @apiBody {String} [status] Enrollment status.
 *
 * @apiSuccess {Object} student Updated student object.
 * @apiError (404) NotFound Student not found.
 * @apiError (400) BadRequest Validation failed.
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

/**
 * @api {delete} /api/students/:id Delete a Student
 * @apiName DeleteStudent
 * @apiGroup Students
 * @apiDescription Deletes a student record by ID.
 *
 * @apiParam {String} id Student's unique ID.
 *
 * @apiSuccess {Object} message Confirmation message.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   { "message": "Student deleted successfully" }
 *
 * @apiError (404) NotFound Student not found.
 * @apiError (500) InternalServerError Server error.
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;