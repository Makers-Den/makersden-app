import type { NextApiRequest, NextApiResponse } from "next";
import { apiModules } from "../../../utils/apiModules";
import { environment } from "../../../utils/environment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await apiModules.estimations.createEstimationFromSheet(
    environment.GOOGLE_SHEETS_SPREADSHEET_ID,
    parseInt(req.query.sheetTabId as string, 10)
  );

  res.status(200).json(result);
}
