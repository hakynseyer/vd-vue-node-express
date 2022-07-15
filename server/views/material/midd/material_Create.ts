import { Request, Response, NextFunction } from "express";

import { Materials } from "../../../models/materials";
import { Providers } from "../../../models/providers";

export class material_Create {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { name, description, amount, um, price, provider } = req.body;

    try {
      const newMaterial = await Materials.create(
        {
          name,
          description,
          amount,
          um,
          price,
          id_provider: provider,
        },
        {
          include: [
            {
              model: Providers,
            },
          ],
        }
      );

      await newMaterial.reload();

      if (newMaterial !== null) {
        res.status(200).json({
          newMaterial,
        });
      } else {
        res.status(500).json({
          error: "No se pudo crear el material :(",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "No se pudo crear el material :(",
      });
    }
  }
}
