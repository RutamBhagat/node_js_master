// import { and, eq } from 'drizzle-orm';
import { users } from '@/schema/user';
import { db } from '@/utils/db';

// export async function getAllVerifiedUsers() {
//   return await db
//     .select({
//       id: users.id,
//       name: users.name,
//       email: users.email,
//       isVerified: users.isVerified,
//       isAdmin: users.isAdmin,
//       created_at: users.created_at,
//     })
//     .from(users)
//     .where(and(eq(users.isVerified, true), eq(users.isAdmin, false)));
// }

// export async function getAllUsers() {
//   return await db
//     .select({
//       id: users.id,
//       name: users.name,
//       email: users.email,
//       isVerified: users.isVerified,
//       isAdmin: users.isAdmin,
//       created_at: users.created_at,
//     })
//     .from(users);
// }


/**
 * Retrieves all users from the database
 * @returns {Promise<Array<{
 *   id: string,
 *   first_name: string,
 *   last_name: string,
 *   email: string,
 *   gender: string,
 *   job_title: string,
 *   created_at: Date,
 *   updated_at: Date
 * }>>} An array of user objects
 */
export async function getAllUsers() {
  return await db
    .select({
      id: users.id,
      first_name: users.first_name,
      last_name: users.last_name,
      email: users.email,
      gender: users.gender,
      job_title: users.job_title,
      created_at: users.created_at,
      updated_at: users.updated_at,
    })
    .from(users);
}

// export async function getAUser(id: string) {
//   return await db
//     .select({
//       id: users.id,
//       name: users.name,
//       email: users.email,
//       isVerified: users.isVerified,
//       isAdmin: users.isAdmin,
//       created_at: users.created_at,
//     })
//     .from(users)
//     .where(eq(users.id, id));
// }

// export async function deleteAllUnverifiedUsers() {
//   const deletedUsers = await db
//     .delete(users)
//     .where(eq(users.isVerified, false))
//     .returning();
//   return deletedUsers.length;
// }
