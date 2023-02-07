import type { NextApiRequest, NextApiResponse } from "next";

import { apiModules } from "../../../utils/apiModules";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const result = await apiModules.estimations.createEstimationFromSheet(
    req.query.spreadsheetId as string
  );

  res.status(200).json(result);
};
export default handler
