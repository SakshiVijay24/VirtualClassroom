const router = require("express").Router();
const auth = require("../middleware/auth");
const subjectController = require("../controllers/subject.controller");

// CREATE A NEW SUBJECT
router.post("/", auth, subjectController.addSubject);

// DELETE A SUBJECT
router.delete("/:id/:username", auth, subjectController.deleteSubject);

// REMOVING A STUDENT FROM A SUBJECT
router.post("/remove", auth, subjectController.removeStudentFromSubject);

// GET SUBJECT FROM ID
router.get(`/:subjectId`, auth, subjectController.getSubjectById);

module.exports = router;