import { Request, Response, NextFunction } from "express";

import { Materials } from "../../../models/materials";

export class material_Delete {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      await Materials.destroy({
        where: {
          id,
        },
      });

      res.sendStatus(204);
    } catch (e) {
      res.status(500).json({
        error: "No se pudo eliminar el material :(",
      });
    }
  }
}
