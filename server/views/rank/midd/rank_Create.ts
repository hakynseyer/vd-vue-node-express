import { Request, Response, NextFunction } from "express";

import { Ranks } from "../../../models/ranks";

export class rank_Create {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { rank, description } = req.body;

    try {
      const newRank = await Ranks.create({
        rank,
        description,
      });

      if (newRank !== undefined) {
        res.status(200).json({
          newRank,
        });
      } else {
        res.status(500).json({
          error: "No se pudo crear el rango :(",
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "No se pudo crear el rango :(",
      });
    }
  }
}
