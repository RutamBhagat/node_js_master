import type { User } from '@/schema/user';
import { addUrlSchema } from '@/schema/url';
import { addUrl, getRedirectURLForCurrentUser } from '@/services/url-services';
import { createHandler } from '@/utils/create';
import { BackendError } from '@/utils/errors';
import consola from 'consola';

export const handleGenerateNewShortURL = createHandler(addUrlSchema, async (req, res) => {
  const { user } = res.locals as { user: User };
  const { redirectURL } = req.body;
  consola.log('Received URL body:', redirectURL);

  const existingRedirectURL = await getRedirectURLForCurrentUser(redirectURL, user.id);

  if (existingRedirectURL) {
    throw new BackendError('CONFLICT', {
      message: 'Redirection URL already exists for current User',
    });
  }

  const { newURL } = await addUrl({ redirectURL }, user.id);

  res.status(201).json({ newURL });
});
