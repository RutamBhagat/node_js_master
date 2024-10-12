import type { Router } from 'express';
import type { Tspec } from 'tspec';
import {
  handleGetAllUsers,
  handleGetAUser,
  //   handleDeleteAllUnverifiedUsers,
  //   handleGetAllVerifiedUsers,
} from '@/controllers/admin-controllers';
import { createRouter } from '@/utils/create';
// import { authenticate } from '@/middlewares/auth';

export type AdminApiSpec = Tspec.DefineApiSpec<{
  basePath: '/api/admin';
  tags: ['Admin'];
  paths: {
    '/all-users': {
      get: {
        summary: 'Get all users';
        handler: typeof handleGetAllUsers;
      };
    };
    '/user/{id}': {
      get: {
        summary: 'Get a user by id';
        path: { id: string };
        handler: typeof handleGetAUser;
      };
    };
  };
}>;

export default createRouter((router: Router) => {
//   router.use(
//     authenticate({
//       verifyAdmin: true,
//     }),
//   );
  router.get('/all-users', handleGetAllUsers);
  router.get('/user/:id', handleGetAUser);
//   router.get('/all-verfied-users', handleGetAllVerifiedUsers);
//   router.delete('/remove-unverified-users', handleDeleteAllUnverifiedUsers);
});
