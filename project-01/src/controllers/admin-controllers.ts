import type { User } from '@/schema/user';
import type { Request, Response } from 'express';
import {
  getAllUsers,
  getAUser,
} from '@/services/admin-services';

interface PathParams { id: string }

// Define a new type that omits the fields you don't want to expose
export type UserRes = Omit<User, 'password' | 'salt' | 'code'>;

export async function handleGetAllUsers(req: Request, res: Response<UserRes[]>) {
  const users = await getAllUsers();
  res.status(200).json(users);
}

export async function handleGetAUser(req: Request<PathParams>, res: Response<UserRes>) {
  const userId = req.params.id as string;
  const user = await getAUser(userId);
  res.status(200).json(user);
}

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
