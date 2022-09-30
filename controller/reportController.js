const { Report } = require("../model/report");

const reportController = {
  //Add report
  createReport: async (req, res) => {
    try {
      const newReport = new Report(req.body);
      const saveReport = await newReport.save();
      res.status(200).json(saveReport);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //get All reports
  getAllReport: async (req, res) => {
    try {
      const reports = await Report.find({ is_deleted: false }).populate(
        "sent_by"
      );
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //delete report
  deleteReport: async (req, res) => {
    try {
      //   await Report.updateMany({ matches: req.params.id }, { matches: null });
      const report = await Report.findById(req.params.id);
      await report.updateOne({ $set: { is_deleted: true } });
      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //update report (admin approve user's report)
  updateReport: async (req, res) => {
    try {
      await Report.updateMany({ matches: req.params.id }, { matches: null });
      await Report.updateOne(
        { _id: req.body.id },
        { $set: { status: req.body.status } }
      );
      res.status(200).json("Approved!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Update status report
  updateStatusReport: async (req, res) => {
    try {
      const report = await Report.findOne({
        _id: req.params.id,
      });
      {
        report.status === true
          ? await report.updateOne({ status: false })
          : await report.updateOne({ status: true });
      }
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = reportController;
