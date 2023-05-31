import { Router } from 'express';
import { protect } from "../middlewares/authMiddleware";
import { postUser, getUsers, getUser, putUser, deleteUser } from "../controllers/userController";



export const userRouter = Router();

//userRouter.use(protect)

// userRouter.route('/getAuthenticatedUser')
//     .get(protect, getAuthenticatedUser);
//
// userRouter.route('/getNonAuthenticatedUser')
//     .get(getNonAuthenticatedUser);

userRouter.route('/')
    .post(protect, postUser) //TODO: This route should be removed later
    .get(protect, getUsers);

userRouter.route('/:id')
    .get(protect, getUser)
    .put(protect, putUser)
    .delete(protect, deleteUser);

export default userRouter;

