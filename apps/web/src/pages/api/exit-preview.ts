import { NextApiRequest, NextApiResponse } from 'next';

import { adjustSameSitePolicy } from './preview';

const exit = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug = '' } = req.query;
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData();

  res.setHeader(
    'Set-Cookie',
    adjustSameSitePolicy(res.getHeader('Set-Cookie'))
  );

  // Redirect the user back to the index page.
  res.redirect(`/${slug}`);
};
export default exit;
