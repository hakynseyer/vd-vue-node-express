import { Request, Response, NextFunction } from "express";

import { Users } from "../../../models/users";

export class user_Delete {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      await Users.destroy({
        where: {
          id,
        },
      });

      res.sendStatus(204);
    } catch (e) {
      res.status(500).json({
        error: "No se pudo eliminar el usuario :(",
      });
    }
  }
}
