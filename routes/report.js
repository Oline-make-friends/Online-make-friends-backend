const router = require("express").Router();
const reportController = require("../controller/reportController");

//get All Report
router.get("/getAll", reportController.getAllReport);

//get All Report
router.get("/getReport/:id", reportController.getReportById);

//get user Report
router.get("/getUser/:id", reportController.getAllReport);

//create Report
router.post("/add", reportController.createReport);

//delete Report
router.post("/delete/:id", reportController.deleteReport);

//update Report(Approve or Decline)
router.post("/update/:id", reportController.updateReport);

//update Report(Approve or Decline)
router.post("/updateStatus/:id", reportController.updateStatusReport);

module.exports = router;
