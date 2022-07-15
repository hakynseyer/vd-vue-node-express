import { Request, Response, NextFunction } from "express";

import { Users } from "../../../models/users";
import { Ranks } from "../../../models/ranks";

export class user_Update {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const {
      id,
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

    try {
      const updateUser = await Users.findByPk(id, {
        include: [
          {
            model: Ranks,
          },
        ],
      });

      await updateUser.update({
        name,
        surname_first: surnameFirst,
        surname_second: surnameSecond,
        password,
        address,
        city,
        country,
        notes,
        id_rank: rank,
      });

      // await updateUser.save();
      await updateUser.reload();

      res.status(200).json({
        user: updateUser,
      });
    } catch (e) {
      res.status(500).json({
        error: "No se pudo actualizar el usuario :(",
      });
    }
  }
}
