import { Router, Request, Response } from "express";

import { user_Val } from "./midd/user_Val";
import { user_Create } from "./midd/user_Create";
import { user_Read } from "./midd/user_Read";
import { user_Update } from "./midd/user_Update";
import { user_Delete } from "./midd/user_Delete";

const router: Router = Router();

router.get("/", user_Read.all);
router.get("/:id", user_Read.byId);
router.post("/crear", user_Val.midd, user_Create.midd);
router.put("/actualizar", user_Val.midd, user_Update.midd);
router.delete("/eliminar", user_Delete.midd);

export default router;
