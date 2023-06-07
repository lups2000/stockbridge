import { Router } from "express";
import { deleteAdvert, getAdvert, getAdverts, postAdvert, putAdvert } from "../controllers/advertController";

export const advertRouter = Router();

advertRouter.route("/").post(postAdvert).get(getAdverts);

advertRouter.route("/:id").get(getAdvert).put(putAdvert).delete(deleteAdvert);
