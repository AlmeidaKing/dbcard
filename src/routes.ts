import { Router } from "express";

import { middlewareAuth } from "./middlewares/Auth/AuthMiddleware";

// Cases
import { createUserController } from "./useCases/CreateUser";
import { authenticateUserController } from "./useCases/Authenticate";
import { forgotPasswordController } from "./useCases/ForgotPassword";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).send("Ok");
});

router.post("/user/create", (req, res) => {
  return createUserController.handle(req, res);
});

router.post("/user/forgot-password", async (req, res) => {
  return forgotPasswordController.handle(req, res);
});


router.post("/authenticate", async (req, res) => {
  return authenticateUserController.handle(req, res);
});

router.use("/auth", middlewareAuth);

// testing middleware
router.post("/auth", async (req, res) => {
  return res.status(200).json({ authenticated: true });
});

// router.post('user/resetpassword', (req, res) => {
//     return
// })

export { router };
