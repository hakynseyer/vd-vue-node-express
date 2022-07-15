import { Request, Response, NextFunction } from "express";

import { Ranks } from "../../../models/ranks";

export class rank_Update {
  public static async midd(req: Request, res: Response, next: NextFunction) {
    const { id, rank, description } = req.body;

    try {
      const updateRank = await Ranks.findByPk(id);
      updateRank.update({
        rank: rank,
        description: description,
      });

      await updateRank.save();

      res.status(200).json({
        rank: updateRank,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "No se pudo actualizar el rango :(",
      });
    }
  }
}
