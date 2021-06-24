import { Router } from "express";

import { middlewareAuth } from './middlewares/Auth/AuthMiddleware';

// Cases
import { createUserController } from "./useCases/CreateUser";
import { authenticateUserController } from "./useCases/Authenticate";

const router = Router();

router.use('/auth', middlewareAuth);

router.get('/', (req, res) => {
    return res.status(200).send("Ok");
})

router.post('/users/create', (req, res) => {
    return createUserController.handle(req, res);
})

router.post('/authenticate', async (req, res) => {
    return authenticateUserController.handle(req, res);
});

router.post('/auth', async (req, res) => {
    return res.status(200).json({ "ok": true })
})

// router.post('users/resetpassword', (req, res) => {
//     return 
// })

export { router }