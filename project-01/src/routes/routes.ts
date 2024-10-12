import type { Router } from 'express';
import type { Tspec } from 'tspec';
import adminRoutes from '@/routes/admin-routes';
import userRoutes from '@/routes/user-routes';
import { createRouter } from '@/utils/create';

export type RootApiSpec = Tspec.DefineApiSpec<{
  paths: {
    '/': {
      get: {
        summary: 'Welcome message';
        responses: {
          200: { content: { 'application/json': { message: string } } };
        };
      };
    };
    '/healthcheck': {
      get: {
        summary: 'Server shit check';
        responses: {
          200: {
            content: {
              'application/json': {
                message: string;
                uptime: number;
                timestamp: number;
              };
            };
          };
        };
      };
    };
  };
}>;

export default createRouter((router: Router) => {
  router.use('/admin', adminRoutes);
  router.use('/user', userRoutes);
});
