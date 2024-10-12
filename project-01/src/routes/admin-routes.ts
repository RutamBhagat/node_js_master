import type { Router } from 'express';
import {
//   handleDeleteAllUnverifiedUsers,
  handleGetAUser,
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
  router.get('/all-users', handleGetAllUsers);
  router.get('/user/:id', handleGetAUser);
//   router.get('/all-verfied-users', handleGetAllVerifiedUsers);
//   router.delete('/remove-unverified-users', handleDeleteAllUnverifiedUsers);
});
