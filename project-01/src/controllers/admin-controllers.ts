import {
//   deleteAllUnverifiedUsers,
//   getAUser,
  getAllUsers,
//   getAllVerifiedUsers,
} from '@/services/admin-services';
import { createHandler } from '@/utils/create';

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
 *         first_name:
 *           type: string
 *           description: The user's first name
 *         last_name:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email
 *         gender:
 *           type: string
 *           description: The user's gender
 *         job_title:
 *           type: string
 *           description: The user's job title
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created
 *         updated_at:
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

// export const handleGetAUser = createHandler(async (req, res) => {
//   const userId = req.params.id as string;
//   const user = await getAUser(userId);
//   res.status(200).json({
//     user,
//   });
// });

// export const handleDeleteAllUnverifiedUsers = createHandler(async (_req, res) => {
//   const unverfiedUsersCount = await deleteAllUnverifiedUsers();
//   res.status(200).json({
//     message: `${unverfiedUsersCount} unverified users deleted successfully`,
//   });
// });
