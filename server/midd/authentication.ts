import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export class Authentication {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    if (req.header("Authorization")) {
      const authorization = req.header("Authorization").split(" ");

      if (authorization[0] === "Token" && authorization[1]) {
        const token = authorization[1];

        try {
          const payload: any = jwt.verify(token, process.env.JWT_SECRET_KEY);

          res.status(201).json({
            name: payload.name,
            surnameFirst: payload.surnameFirst,
            rank: payload.rank,
          });
        } catch (e) {
          console.error(e);
          res.status(401).json({
            error: "Acceso Denegado",
          });
        }
      } else {
        res.status(401).json({
          error: "Acceso Denegado",
        });
      }
    } else {
      res.status(401).json({
        error: "Acceso Denegado",
      });
    }
  }
}
