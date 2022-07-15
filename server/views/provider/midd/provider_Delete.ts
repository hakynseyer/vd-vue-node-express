import { Request, Response, NextFunction } from "express";

import { Providers } from "../../../models/providers";

export class provider_Delete {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      await Providers.destroy({
        where: {
          id,
        },
      });

      res.sendStatus(204);
    } catch (e) {
      res.status(500).json({
        error: "No se pudo eliminar el proveedor :(",
      });
    }
  }
}
