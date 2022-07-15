import { Request, Response, NextFunction } from "express";

import { Providers } from "../../../models/providers";
import { Users } from "../../../models/users";
import { Ranks } from "../../../models/ranks";

export class provider_Read {
  public static async all(req: Request, res: Response, next: NextFunction) {
    try {
      const providers = await Providers.findAll({
        include: [
          {
            model: Users,
            include: [
              {
                model: Ranks,
              },
            ],
          },
        ],
      });

      res.status(200).json({
        providers,
      });
    } catch (e) {
      res.status(500).json({
        error: "No se pudo conseguir todos los proveedores :(",
      });
    }
  }

  public static async byId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const provider = await Providers.findByPk(id, {
        include: [
          {
            model: Users,
            include: [
              {
                model: Ranks,
              },
            ],
          },
        ],
      });

      res.status(200).json({
        provider,
      });
    } catch (e) {
      res.status(500).json({
        error: "No se pudo conseguir el proveedor :(",
      });
    }
  }
}
