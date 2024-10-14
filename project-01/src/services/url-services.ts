import crypto from 'node:crypto';
import { url } from 'node:inspector';
import { type NewUrl, urls } from '@/schema/url';
import { type NewVisitHistory, visitHistory } from '@/schema/visit-history';
import { db } from '@/utils/db';
import { BackendError } from '@/utils/errors';
import { and, eq } from 'drizzle-orm';

export async function getRedirectURLForCurrentUser(redirectURL: string, userId: string) {
  const [url] = await db
    .select()
    .from(urls)
    .where(
      and(
        eq(urls.redirectURL, redirectURL),
        eq(urls.userId, userId),
      ),
    )
    .limit(1);
  return url;
}

export async function addUrl(url: NewUrl, userId: string) {
  const { redirectURL } = url;
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

export async function addVisit(visit: NewVisitHistory, userId: string) {
  const { urlId } = visit;

  const [newVisitHistory] = await db
    .insert(visitHistory)
    .values({
      urlId,
      userId,
    })
    .returning({
      id: visitHistory.id,
      urlId: visitHistory.urlId,
      userId: visitHistory.userId,
      createdAt: visitHistory.createdAt,
    });

  if (!newVisitHistory) {
    throw new BackendError('INTERNAL_ERROR', {
      message: 'Failed to add visit',
    });
  }

  return { newVisitHistory };
}

export async function getRedirectURLByID(shortId: string) {
  const [url] = await db
    .select({
      id: urls.id,
      shortID: urls.shortID,
      redirectURL: urls.redirectURL,
      userId: urls.userId,
      createdAt: urls.createdAt,
      updatedAt: urls.updatedAt,
    })
    .from(urls)
    .where(
      eq(urls.shortID, shortId),
    )
    .limit(1);
  return url;
}

export async function getRedirectURLVisits(shortId: string) {
  const visits = await db
    .select({
      urls: {
        shortID: urls.shortID,
        redirectURL: urls.redirectURL,
      },
      visitHistory: {
        id: visitHistory.id,
        urlId: visitHistory.urlId,
        userId: visitHistory.userId,
        createdAt: visitHistory.createdAt,
      },
    })
    .from(urls)
    .leftJoin(
      visitHistory,
      eq(urls.id, visitHistory.urlId),
    )
    .where(
      eq(urls.shortID, shortId),
    );
  return visits;
}
