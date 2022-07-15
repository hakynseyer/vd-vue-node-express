import { Request, Response, NextFunction } from "express";

import { Ranks } from "../../../models/ranks";

export class rank_Delete {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      await Ranks.destroy({
        where: {
          id,
        },
      });

      res.sendStatus(204);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "No se pudo eliminar el rango :(",
      });
    }
  }
}
