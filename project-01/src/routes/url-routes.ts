import type { Router } from 'express';
import {
  handleGenerateNewShortURL,
} from '@/controllers/url-controllers';
import { authenticate } from '@/middlewares/auth';
import { createRouter } from '@/utils/create';

export default createRouter((router: Router) => {
  router.use(authenticate());
  router.post('/', handleGenerateNewShortURL);
  // router.get('/:id', handleAddUser);
  // router.get('/analytics/:id', handleAddUser);
});
