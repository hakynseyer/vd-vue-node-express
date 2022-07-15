import { Router, Request, Response } from "express";

import { material_Val } from "./midd/material_Val";
import { material_Read } from "./midd/material_Read";
import { material_Create } from "./midd/material_Create";
import { material_Update } from "./midd/material_Update";
import { material_Delete } from "./midd/material_Delete";

const router: Router = Router();

router.get("/", material_Read.all);
router.get("/:id", material_Read.byId);
router.post("/crear", material_Val.midd, material_Create.midd);
router.put("/actualizar", material_Val.midd, material_Update.midd);
router.delete("/eliminar", material_Delete.midd);

export default router;
