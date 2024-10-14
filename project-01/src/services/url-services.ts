import crypto from 'node:crypto';
import { type NewUrl, urls } from '@/schema/url';
import { db } from '@/utils/db';
import { BackendError } from '@/utils/errors';
import { eq } from 'drizzle-orm';

export async function getURLByRedirectURL(redirectURL: string) {
  const [user] = await db.select().from(urls).where(eq(urls.redirectURL, redirectURL)).limit(1);
  return user;
}

export async function addUrl(url: NewUrl) {
  const { redirectURL, userId } = url;
  const shortID = crypto.randomBytes(8).toString('hex');

  const [newURL] = await db
    .insert(urls)
    .values({
      redirectURL,
      shortID,
      userId,
    })
    .returning({
      id: urls.id,
      shortID: urls.shortID,
      redirectURL: urls.redirectURL,
      userId: urls.userId,
      createdAt: urls.createdAt,
      updatedAt: urls.updatedAt,
    });

  if (!newURL) {
    throw new BackendError('INTERNAL_ERROR', {
      message: 'Failed to add URL',
    });
  }

  return { newURL };
}
