import { Router, Request, Response } from "express";

import { Authentication } from "../../midd/authentication";
import { login_Val } from "./midd/login_Val";
import { login_Access } from "./midd/login_Access";

const router: Router = Router();

router.post("/acceso", login_Val.midd, login_Access.midd);
router.post("/token", Authentication.midd);

export default router;
