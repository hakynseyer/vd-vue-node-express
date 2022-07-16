import { Request, Response, NextFunction } from "express";

import { Users, UsersOutput } from "../../../models/users";
import { Ranks } from "../../../models/ranks";

export class user_Read {
  public static async all(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await Users.findAll({
        include: [
          {
            model: Ranks,
          },
        ],
      });

      res.status(200).json({
        users,
      });
    } catch (e) {
      res.status(500).json({
        error: "No se pudo conseguir todos los usuarios :(",
      });
    }
  }

  public static async byId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user: UsersOutput = await Users.findByPk(id, {
        include: [
          {
            model: Ranks,
          },
        ],
      });

      res.status(200).json({
        user,
      });
    } catch (e) {
      res.status(500).json({
        error: "No se pudo conseguir el usuario :(",
      });
    }
  }
}
