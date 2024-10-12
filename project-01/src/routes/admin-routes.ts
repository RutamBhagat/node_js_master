import type { Router } from 'express';
import {
//   handleDeleteAllUnverifiedUsers,
//   handleGetAUser,
  handleGetAllUsers,
//   handleGetAllVerifiedUsers,
} from '@/controllers/admin-controllers';
// import { authenticate } from '@/middlewares/auth';
import { createRouter } from '@/utils/create';

export default createRouter((router: Router) => {
//   router.use(
//     authenticate({
//       verifyAdmin: true,
//     }),
//   );

  /**
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
  router.get('/all-users', handleGetAllUsers);
//   router.get('/all-verfied-users', handleGetAllVerifiedUsers);
//   router.get('/user/:id', handleGetAUser);
//   router.delete('/remove-unverified-users', handleDeleteAllUnverifiedUsers);
});
