import type { Router } from 'express';
import {
  handleAddUser,
  handleUserLogin,
//   handleDeleteUser,
//   handleGetUser,
//   handleUpdateUser,
//   handleVerifyUser,
} from '@/controllers/user-controllers';
import { createRouter } from '@/utils/create';
// import { authenticate } from '@/middlewares/auth';

export default createRouter((router: Router) => {
//   router.get('/', authenticate(), handleGetUser);
  router.post('/create', handleAddUser);
  //   router.get('/verify', (req, res, next) => handleVerifyUser(req, res, next));
  router.post('/login', handleUserLogin);
//   router.post('/remove', authenticate(), handleDeleteUser);
//   router.put('/update', authenticate(), handleUpdateUser);
});
