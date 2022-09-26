const router = require("express").Router();
const reportController = require("../controller/reportController");

//get All Report
router.get("/getAll", reportController.getAllReport);

//create Report
router.post("/add", reportController.createReport);

//delete Report
router.post("/delete", reportController.deleteReport);

//update Report(Approve or Decline)
router.post("/update", reportController.updateReport);

module.exports = router;
