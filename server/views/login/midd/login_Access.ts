import { Request, Response } from "express";

import { Users } from "../../../models/users";
import { Ranks } from "../../../models/ranks";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class login_Access {
  public static async midd(req: Request, res: Response) {
    const { user, password } = req.body;

    try {
      const userDB = await Users.findOne({
        where: {
          name: user,
        },
        include: [
          {
            model: Ranks,
          },
        ],
        // raw: true,
        // nest: true,
      });

      if (userDB !== null) {
        // Validar Contraseña
        if (await bcrypt.compare(password, userDB.password)) {
          // Generar Token
          const token: string = jwt.sign(
            {
              id: userDB.id,
              name: userDB.name,
              surnameFirst: userDB.surname_first,
              rank: userDB["Rank"].rank,
            },
            process.env.JWT_SECRET_KEY || "tokenScret",
            {
              expiresIn: 60 * 60,
            }
          );

          // res.header("auth-token", token).status(200).json({
          //   user: userDB,
          // });

          res.status(200).json({
            user: userDB,
            token: token,
          });
        } else {
          res.status(406).json({
            error: {
              user: "",
              password: "La contraseña no coincide",
            },
          });
        }
      } else {
        res.status(406).json({
          error: {
            user: "No se encontró el usuario en nuestro sistema",
            password: "",
          },
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "No se pudo acceder al sistema :(",
      });
    }
  }
}
