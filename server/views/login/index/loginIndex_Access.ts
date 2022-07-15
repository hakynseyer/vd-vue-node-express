import { Request, Response } from "express";

import { Users } from "../../../models/users";

export class loginIndex_Access {
  public static async midd(req: Request, res: Response) {
    try {
      const user = await Users.findOne({
        where: {
          name: req.body.user,
        },
      });

      if (user !== null) {
        // Generar Token

        res.status(200).json({
          user,
        });
      } else {
        res.status(406).json({
          error: {
            user: "No se encontró el usuario en nuestro sistema",
            password: "",
          },
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "No se pudo acceder al sistema :(",
      });
    }
  }
}
