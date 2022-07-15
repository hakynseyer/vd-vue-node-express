import { Request, Response, NextFunction } from "express";

import { Providers } from "../../../models/providers";
import { Users } from "../../../models/users";

export class provider_Update {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { id, company, description, user } = req.body;

    try {
      const updatedProvider = await Providers.findByPk(id, {
        include: [
          {
            model: Users,
          },
        ],
      });

      await updatedProvider.update({
        company,
        description,
        id_user: user,
      });

      await updatedProvider.reload();

      res.status(200).json({
        provider: updatedProvider,
      });
    } catch (e) {
      res.status(500).json({
        error: "No se pudo actualizar el proveedor :(",
      });
    }
  }
}
