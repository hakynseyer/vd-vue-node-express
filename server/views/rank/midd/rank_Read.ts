import { Request, Response, NextFunction } from "express";

import { Ranks, RanksInput, RanksOutput } from "../../../models/ranks";

export class rank_Read {
  public static async all(req: Request, res: Response, next: NextFunction) {
    try {
      const ranks = await Ranks.findAll();

      res.status(200).json({
        ranks,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "No se pudo conseguir el rango :(",
      });
    }
  }

  public static async byId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const rank: RanksOutput = await Ranks.findByPk(id);

      res.status(200).json({
        rank,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: "No se pudo conseguir el rango :(",
      });
    }
  }
}
