import { Router } from "express";
import upload from "../../../middlewares/multer";
import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth";
import ContactUsController from "../controllers/contact-us-controller";

const contactUsRoutes = (contactUsController: ContactUsController) => {
  const router = Router();
  router.post(
    "/add",
    upload.array("images", 0),
    contactUsController.create.bind(contactUsController)
  );
  router.get(
    "/",
    contactUsController.all.bind(contactUsController)
  );
  router.get(
    "/data/:id",
    contactUsController.get_single_data.bind(contactUsController)
  );
  router.delete(
    "/data/:id",
    contactUsController.removeItem.bind(contactUsController)
  );
  router.put(
    "/update",
    upload.array("images", 10),
    contactUsController.update.bind(contactUsController)
  );
  return router;
};
export default contactUsRoutes;
