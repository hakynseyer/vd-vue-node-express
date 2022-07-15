import { Request, Response, NextFunction } from "express";

import { Providers } from "../../../models/providers";
import { Users } from "../../../models/users";

export class provider_Create {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { company, description, user } = req.body;

    try {
      const newProvider = await Providers.create(
        {
          company,
          description,
          id_user: user,
        },
        {
          include: [
            {
              model: Users,
            },
          ],
        }
      );

      await newProvider.reload();

      if (newProvider !== null) {
        res.status(200).json({
          newProvider,
        });
      } else {
        res.status(500).json({
          error: "No se pudo crear el proveedor :(",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "No se pudo crear el proveedor :(",
      });
    }
  }
}
