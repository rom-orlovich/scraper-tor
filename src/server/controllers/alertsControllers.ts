import { RequestHandler } from "webpack-dev-server";
import { AlertModel } from "../models/AlertsModel";

export const getAlerts: RequestHandler = async (req, res) => {
  const { page, numResults } = req.query;

  const pageNumber = page ? Number(page) : 1;
  const query = {};
  try {
    const alerts = await AlertModel.find(query)

      .skip((pageNumber - 1) * 10)
      .limit(Number(numResults || 5))
      .sort({ id: -1 });

    // const countAwait = await AlertModel.find(query).count();

    res.status(200).json({
      data: alerts,
      countRows: alerts.length,
      next: alerts.length > pageNumber * 10,
    });
  } catch (error) {
    res.status(400).json({ message: "alerts not found" });
  }
};

export const deleteAlert: RequestHandler = async (req, res) => {
  const query = { _id: req.params.id };
  try {
    await AlertModel.deleteOne(query);

    // const countAwait = await AlertModel.find(query).count();

    res
      .status(200)
      .json({ message: "Alert was deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Alert is not found" });
  }
};
export const deleteAllAlerts: RequestHandler = async (req, res) => {
  const query = {};
  try {
    await AlertModel.deleteMany(query);

    res.status(200).json({ message: "Alerts were deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Alerts are not found" });
  }
};
