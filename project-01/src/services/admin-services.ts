import { and, eq } from 'drizzle-orm';
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
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   gender: string,
 *   jobTitle: string,
 *   isVerified: boolean,
 *   isAdmin: boolean,
 *   createdAt: Date,  
 *   updatedAt: Date
 * }>>} An array of user objects
 */
export async function getAllUsers() {
  return await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      gender: users.gender,
      jobTitle: users.jobTitle,
      isVerified: users.isVerified,
      isAdmin: users.isAdmin,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users);
}

/**
 * Retrieves a user from the database by id 
 * @param {string} id The id of the user to retrieve
 * @returns {Promise<{
 *   id: string,
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   gender: string,
 *   jobTitle: string,
 *   isVerified: boolean,
 *   isAdmin: boolean,
 *   createdAt: Date,  
 *   updatedAt: Date
 * }>} The user object  
 */

export async function getAUser(id: string) {
  return await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      gender: users.gender,
      jobTitle: users.jobTitle,
      isVerified: users.isVerified,
      isAdmin: users.isAdmin,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, id));
}

// export async function deleteAllUnverifiedUsers() {
//   const deletedUsers = await db
//     .delete(users)
//     .where(eq(users.isVerified, false))
//     .returning();
//   return deletedUsers.length;
// }
