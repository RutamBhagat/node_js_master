import { addUrlSchema } from '@/schema/url';
import { addUrl, getURLByRedirectURL } from '@/services/url-services';
import { createHandler } from '@/utils/create';
import { BackendError } from '@/utils/errors';
import consola from 'consola';

export const handleGenerateNewShortURL = createHandler(addUrlSchema, async (req, res) => {
  const { redirectURL } = req.body;
  consola.log('Received URL body:', redirectURL);

  const existingRedirectURL = await getURLByRedirectURL(redirectURL);

  if (existingRedirectURL) {
    throw new BackendError('CONFLICT', {
      message: 'User already exists',
    });
  }

  const { newURL } = await addUrl({ redirectURL });

  res.status(201).json({ newURL });
});
