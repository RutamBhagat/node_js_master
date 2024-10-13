import type { Router } from 'express';
import type { Tspec } from 'tspec';
import {
  handleAddUser,
  handleUserLogin,
  type NewUserRequestBody,
  type UserLoginRequestBody,
//   handleDeleteUser,
//   handleGetUser,
//   handleUpdateUser,
//   handleVerifyUser,
} from '@/controllers/user-controllers';
import { createRouter } from '@/utils/create';
// import { authenticate } from '@/middlewares/auth';

export type UserApiSpec = Tspec.DefineApiSpec<{
  basePath: '/api/user';
  tags: ['User'];
  paths: {
    '/create': {
      post: {
        summary: 'Create a new user';
        requestBody: NewUserRequestBody;
        handler: typeof handleAddUser;
      };
    };
    '/login': {
      post: {
        summary: 'Login a user';
        requestBody: UserLoginRequestBody;
        handler: typeof handleUserLogin;
      };
    };
  };
}>;

export default createRouter((router: Router) => {
//   router.get('/', authenticate(), handleGetUser);
  router.post('/create', handleAddUser);
  //   router.get('/verify', (req, res, next) => handleVerifyUser(req, res, next));
  router.post('/login', handleUserLogin);
//   router.post('/remove', authenticate(), handleDeleteUser);
//   router.put('/update', authenticate(), handleUpdateUser);
});
