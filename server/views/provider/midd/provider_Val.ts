import { Request, Response, NextFunction } from "express";

import { Validator } from "../../../validator";
import { Users } from "../../../models/users";

export class provider_Val {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { company, description, user } = req.body;

    const valCompany = Validator.basic(company, 4, 100);
    const valDescription = Validator.basic(description, 4, 255);

    if (!valCompany.length && !valDescription.length) {
      const theUser = await Users.findByPk(user);
      if (theUser !== null) next();
      else {
        res.status(406).json({
          error: {
            company: valCompany,
            description: valDescription,
            user: "No se encontró el usuario deseado para este proveedor",
          },
        });
      }
    } else {
      res.status(406).json({
        error: {
          company: valCompany,
          description: valDescription,
          user: "",
        },
      });
    }
  }
}
