import { Request, Response, NextFunction } from "express";

import { Materials } from "../../../models/materials";
import { Providers } from "../../../models/providers";

export class material_Update {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { id, name, description, amount, um, price, provider } = req.body;

    try {
      const updatedMaterial = await Materials.findByPk(id, {
        include: [
          {
            model: Providers,
          },
        ],
      });

      await updatedMaterial.update({
        name,
        description,
        amount,
        um,
        price,
        id_provider: provider,
      });

      // await updatedMaterial.save();
      await updatedMaterial.reload();

      res.status(200).json({
        material: updatedMaterial,
      });
    } catch (e) {
      res.status(500).json({
        error: "No se pudo actualizar el material :(",
      });
    }
  }
}
