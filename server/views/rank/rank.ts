import { Router, Request, Response } from "express";

import { rank_Val } from "./midd/rank_Val";
import { rank_Read } from "./midd/rank_Read";
import { rank_Create } from "./midd/rank_Create";
import { rank_Update } from "./midd/rank_Update";
import { rank_Delete } from "./midd/rank_Delete";

const router: Router = Router();

router.get("/", rank_Read.all);
router.get("/:id", rank_Read.byId);
router.post("/crear", rank_Val.midd, rank_Create.midd);
router.put("/actualizar", rank_Val.midd, rank_Update.midd);
router.delete("/eliminar", rank_Delete.midd);

export default router;
