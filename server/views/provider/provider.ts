import { Router, Request, Response } from "express";

import { provider_Val } from "./midd/provider_Val";
import { provider_Create } from "./midd/provider_Create";
import { provider_Read } from "./midd/provider_Read";
import { provider_Update } from "./midd/provider_Update";
import { provider_Delete } from "./midd/provider_Delete";

const router: Router = Router();

router.get("/", provider_Read.all);
router.get("/:id", provider_Read.byId);
router.post("/crear", provider_Val.midd, provider_Create.midd);
router.put("/actualizar", provider_Val.midd, provider_Update.midd);
router.delete("/eliminar", provider_Delete.midd);

export default router;
