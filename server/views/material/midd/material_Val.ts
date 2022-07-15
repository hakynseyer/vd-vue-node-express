import { Request, Response, NextFunction } from "express";

import { Validator } from "../../../validator";
import { Providers } from "../../../models/providers";

export class material_Val {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { name, description, amount, um, price, provider } = req.body;

    const valName = Validator.basic(name, 4, 50);
    const valDescription = Validator.basic(description, 4, 255);
    const valAmount = Validator.basic(amount, 2, 50);
    const valUm = Validator.basic(um, 4, 25);
    const valPrice = Validator.basic(price, 2, 50);

    if (
      !valName.length &&
      !valDescription.length &&
      !valAmount.length &&
      !valUm.length &&
      !valPrice.length
    ) {
      const theProvider = await Providers.findByPk(provider);
      if (theProvider !== null) next();
      else {
        res.status(406).json({
          error: {
            name: valName,
            description: valDescription,
            amount: valAmount,
            um: valUm,
            price: valPrice,
            provider: "No se encontró el proveedor deseado para este material",
          },
        });
      }
    } else {
      res.status(406).json({
        error: {
          name: valName,
          description: valDescription,
          amount: valAmount,
          um: valUm,
          price: valPrice,
          provider: "",
        },
      });
    }
  }
}
