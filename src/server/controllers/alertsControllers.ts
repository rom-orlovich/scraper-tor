import { RequestHandler } from "webpack-dev-server";
import { AlertModel } from "../models/AlertsModel";

export const alertsController: RequestHandler = async (req, res) => {
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
