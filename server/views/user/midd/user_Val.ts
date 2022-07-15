import { Request, Response, NextFunction } from "express";

import { Validator } from "../../../validator";
import { Ranks } from "../../../models/ranks";

export class user_Val {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      surnameFirst,
      surnameSecond,
      password,
      address,
      city,
      country,
      notes,
      rank,
    } = req.body;

    const valName = Validator.basic(name, 4, 15);
    const valSurnameFirst = Validator.basic(surnameFirst, 4, 15);
    const valSurnameSecond = Validator.basic(surnameSecond, 4, 15);
    const valPassword = Validator.basic(password, 4, 255);
    const valAddress = Validator.basic(address, 4, 255);
    const valCity = Validator.basic(city, 4, 20);
    const valCountry = Validator.basic(country, 4, 20);
    const valNotes = Validator.basicOptionalEmpty(notes, 4, 255);

    if (
      !valName.length &&
      !valSurnameFirst.length &&
      !valSurnameSecond.length &&
      !valPassword.length &&
      !valAddress.length &&
      !valCity.length &&
      !valCountry.length &&
      !valNotes.length
    ) {
      const theRank = await Ranks.findByPk(rank);
      if (theRank !== null) {
        req.body["rank_model"] = theRank;
        next();
      } else {
        res.status(406).json({
          error: {
            name: valName,
            surnameFirst: valSurnameFirst,
            surnameSecond: valSurnameSecond,
            password: valPassword,
            address: valAddress,
            city: valCity,
            country: valCountry,
            valNotes: valNotes,
            rank: "No se encontró el rango deseado para este usuario",
          },
        });
      }
    } else {
      res.status(406).json({
        error: {
          name: valName,
          surnameFirst: valSurnameFirst,
          surnameSecond: valSurnameSecond,
          password: valPassword,
          address: valAddress,
          city: valCity,
          country: valCountry,
          valNotes: valNotes,
          rank: "",
        },
      });
    }
  }
}
