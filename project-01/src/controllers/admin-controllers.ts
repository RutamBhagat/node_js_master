import {
  getAllUsers,
  getAUser,
} from '@/services/admin-services';
import { createHandler } from '@/utils/create';

export const handleGetAllUsers = createHandler(async (_req, res) => {
  const users = await getAllUsers();
  res.status(200).json({
    users,
  });
});

export const handleGetAUser = createHandler(
  async (req, res) => {
    const userId = req.params.id as string;
    const user = await getAUser(userId);
    res.status(200).json(user);
  },
);

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
