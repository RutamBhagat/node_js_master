import {
//   deleteAllUnverifiedUsers,
  getAUser,
  getAllUsers,
//   getAllVerifiedUsers,
} from '@/services/admin-services';
import { createHandler } from '@/utils/create';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email: 
 *           type: string
 *           description: The user's email
 *         gender:
 *           type: string
 *           enum: [MALE, FEMALE]
 *           description: The user's gender
 *         jobTitle:  
 *           type: string
 *           description: The user's job title
 *         isVerified:
 *           type: boolean
 *           description: Whether the user is verified  
 *         isAdmin:
 *           type: boolean
 *           description: Whether the user is an admin  
 *         salt:
 *           type: string
 *           description: The user's salt
 *         code:
 *           type: string 
 *           description: The user's code
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was last updated
 */


/**
 * Get all users
 * @swagger
 * /api/admin/all-users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
export const handleGetAllUsers = createHandler(async (_req, res) => {
  const users = await getAllUsers();
  res.status(200).json({
    users,
  });
});

/**
 * Get a user by id
 * @swagger
 * /api/admin/user/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the user to retrieve
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500: 
 *         description: Server error
 */

export const handleGetAUser = createHandler(async (req, res) => {
  const userId = req.params.id as string;
  const user = await getAUser(userId);
  res.status(200).json({
    user,
  });
});

// export const handleDeleteAllUnverifiedUsers = createHandler(async (_req, res) => {
//   const unverfiedUsersCount = await deleteAllUnverifiedUsers();
//   res.status(200).json({
//     message: `${unverfiedUsersCount} unverified users deleted successfully`,
//   });
// });

// export const handleGetAllVerifiedUsers = createHandler(async (_req, res) => {
//   const users = await getAllVerifiedUsers();
//   res.status(200).json({
//     users,
//   });
// });

// export const handleGetAllUsers = createHandler(async (_req, res) => {
//   const users = await getAllUsers();
//   res.status(200).json({
//     users,
//   });
// });
