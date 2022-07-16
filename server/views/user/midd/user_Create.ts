import { Request, Response, NextFunction } from "express";

import { Users } from "../../../models/users";
import { Ranks } from "../../../models/ranks";

import bcrypt from "bcryptjs";

export class user_Create {
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
      rank_model,
    } = req.body;

    const salt = await bcrypt.genSalt(10);

    try {
      const newUser = await Users.create(
        {
          name,
          surname_first: surnameFirst,
          surname_second: surnameSecond,
          password: await bcrypt.hash(password, salt),
          address,
          city,
          country,
          notes,
          id_rank: rank,
        },
        {
          include: [
            {
              model: Ranks,
            },
          ],
        }
      );

      await newUser.reload();

      if (newUser !== null) {
        res.status(200).json({
          newUser,
        });
      } else {
        res.status(500).json({
          error: "No se pudo crear el usuario :(",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "No se pudo crear el usuario :(",
      });
    }
  }
}
