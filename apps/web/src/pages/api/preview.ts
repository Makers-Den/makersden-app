import { NextApiRequest, NextApiResponse } from 'next';

import { PREVIEW_SECRET } from '../../utils/constants';

/**
 * Change cookie SameSite policy from `SameSite=Lax` to `SameSite=None;Secure`,
 * so it can be read in the Storyblok visual editor iframe
 */
export const adjustSameSitePolicy = (
  rawCookies: string | number | string[] | undefined
): string[] => {
  if (!rawCookies) {
    // NOTE: I hope an undefined cookie changed to an empty array doesn't affect anything
    return [];
  }

  const cookies = Array.isArray(rawCookies)
    ? rawCookies.map((c) => c.toString())
    : [rawCookies.toString()];

  return cookies.map((cookie: string) =>
    cookie.replace('SameSite=Lax', 'SameSite=None;Secure')
  );
};
const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug = '', secret } = req.query;
  const url = req.url || '';
  // get the storyblok params for the bridge to work
  // TODO: check the validity of this
  const params = url.split('?');

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    // This is just for debugging
    startedPreviewAt: new Date().toISOString(),
  });

  res.setHeader(
    'Set-Cookie',
    adjustSameSitePolicy(res.getHeader('Set-Cookie'))
  );

  // Redirect to the path from entry. TODO: check this params[1] thing
  res.redirect(`/${slug}?${params[1]}`);
};

export default preview;
