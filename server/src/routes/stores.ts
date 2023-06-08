import { Router } from 'express';
import { getStoreData, putStore } from "../controllers/userController";



export const storeRouter = Router();

storeRouter.route('/:id')
.get(getStoreData)
.put(putStore)

export default storeRouter;

