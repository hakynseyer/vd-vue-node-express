import { Request, Response, NextFunction } from "express";

import { Materials } from "../../../models/materials";
import { Providers } from "../../../models/providers";
import { Users } from "../../../models/users";
import { Ranks } from "../../../models/ranks";

export class material_Read {
  public static async all(req: Request, res: Response, next: NextFunction) {
    try {
      const materials = await Materials.findAll({
        include: [
          {
            model: Providers,
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
          },
        ],
      });

      res.status(200).json({
        materials,
      });
    } catch (e) {
      res.status(500).json({
        error: "No se pudo conseguir todos los materiales :(",
      });
    }
  }

  public static async byId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const material = await Materials.findByPk(id, {
        include: [
          {
            model: Providers,
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
          },
        ],
      });

      res.status(200).json({
        material,
      });
    } catch (e) {
      res.status(500).json({
        error: "No se pudo conseguir el material :(",
      });
    }
  }
}
