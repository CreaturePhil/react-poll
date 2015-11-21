import express from 'express';
import { isAuthenticated } from './passport';
import mainController from '../controllers/main_controller';
import userController from '../controllers/user_controller';

const router = express.Router();

router.route('/')
  .get(mainController.getIndex)
  .post(isAuthenticated, mainController.postIndex);

router.route('/login')
  .get(userController.getLogin)
  .post(userController.postLogin);

router.route('/logout')
  .get(isAuthenticated, userController.getLogout);

router.route('/signup')
  .get(userController.getSignup)
  .post(userController.postSignup);

export default router;
