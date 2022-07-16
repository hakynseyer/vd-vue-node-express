import { Router, Request, Response } from "express";

import { login_Val } from "./midd/login_Val";
import { login_Access } from "./midd/login_Access";

const router: Router = Router();

router.post("/acceso", login_Val.midd, login_Access.midd);

export default router;
