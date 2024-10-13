import type { loginSchema, newUserSchema } from '@/schema/user';
import type { Request, Response } from 'express';
import type { z } from 'zod';
import type { UserRes } from './admin-controllers';
import { Buffer } from 'node:buffer';
import { addUser, getUserByEmail } from '@/services/user-services';
import { BackendError } from '@/utils/errors';
import generateToken from '@/utils/jwt';
import argon2 from 'argon2';

export type NewUserRequestBody = z.infer<typeof newUserSchema>['body'];
export type UserLoginRequestBody = z.infer<typeof loginSchema>['body'];

export async function handleAddUser(req: Request<object, object, NewUserRequestBody>, res: Response<UserRes>) {
  const user = req.body;

  const existingUser = await getUserByEmail(user.email);

  if (existingUser) {
    throw new BackendError('CONFLICT', {
      message: 'User already exists',
    });
  }

  const { user: addedUser } = await addUser(user);

  // Uncomment and implement email verification if needed
  // const status = await sendVerificationEmail(
  //   process.env.API_BASE_URL,
  //   addedUser.firstName,
  //   addedUser.lastName,
  //   addedUser.email,
  //   code,
  // );

  // if (status !== 200) {
  //   await deleteUser(addedUser.email);
  //   throw new BackendError('INTERNAL_ERROR', {
  //     message: 'Failed to signup user',
  //   });
  // }

  res.status(201).json(addedUser);
}

export async function handleUserLogin(req: Request<object, object, UserLoginRequestBody>, res: Response<{ token: string }>) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user)
    throw new BackendError('USER_NOT_FOUND');

  const matchPassword = await argon2.verify(user.password, password, {
    salt: Buffer.from(user.salt, 'hex'),
  });
  if (!matchPassword)
    throw new BackendError('INVALID_PASSWORD');

  const token = generateToken(user.id);
  res.status(200).json({ token });
}

// export const handleVerifyUser = createHandler(verifyUserSchema, async (req, res) => {
//   try {
//     const { email, code } = req.query;

//     await verifyUser(email, code);
//     const template = render(
//       UserVerified({ status: 'verified', message: 'User verified successfully' }),
//     );
//     res.status(200).send(template);
//   }
//   catch (err) {
//     if (err instanceof BackendError) {
//       const template = render(
//         UserVerified({
//           status: 'invalid',
//           message: err.message,
//           error: 'Invalid Request',
//         }),
//       );
//       res.status(getStatusFromErrorCode(err.code)).send(template);
//       return;
//     }
//     throw err;
//   }
// });

// export const handleDeleteUser = createHandler(deleteUserSchema, async (req, res) => {
//   const { email } = req.body;

//   const { user } = res.locals as { user: User };

//   if (user.email !== email && !user.isAdmin) {
//     throw new BackendError('UNAUTHORIZED', {
//       message: 'You are not authorized to delete this user',
//     });
//   }

//   const deletedUser = await deleteUser(email);

//   res.status(200).json({
//     user: deletedUser,
//   });
// });

// export const handleGetUser = createHandler(async (_req, res) => {
//   const { user } = res.locals as { user: User };

//   res.status(200).json({
//     user: {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       isVerified: user.isVerified,
//       created_at: user.created_at,
//     },
//   });
// });

// export const handleUpdateUser = createHandler(updateUserSchema, async (req, res) => {
//   const { user } = res.locals as { user: User };

//   const { name, password, email } = req.body;

//   const updatedUser = await updateUser(user, { name, password, email });

//   res.status(200).json({
//     user: updatedUser,
//   });
// });
