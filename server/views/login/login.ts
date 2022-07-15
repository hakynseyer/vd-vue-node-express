import { Router, Request, Response } from "express";

import { loginIndex_Val } from "./index/loginIndex_Val";
import { loginIndex_Access } from "./index/loginIndex_Access";

const router: Router = Router();

router.post("/acceso", loginIndex_Val.midd, loginIndex_Access.midd);

export default router;
