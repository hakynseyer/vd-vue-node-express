import { EM } from "@Assets/ts/mitt";
import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";
import { TypeTableHeader, TypeRank } from "@TS/interfaces";

declare var THE_SERVER: any;

export class TableClass {
  private _headers: Array<TypeTableHeader>;
  private _ranks: Array<TypeRank>;

  private _originRanks: Array<TypeRank>;

  constructor() {
    this._headers = [
      {
        label: "Rango",
        link: "rank",
      },
      {
        label: "Descripción",
        link: "description",
      },
    ];

    this._ranks = [];
    this._originRanks = [];
  }

  get headers(): Array<TypeTableHeader> {
    return this._headers;
  }

  get ranks(): Array<TypeRank> {
    return this._ranks;
  }
  set ranks(ranks: Array<TypeRank>) {
    this._ranks = ranks;
  }

  public saveRankSelected(rank: TypeRank) {
    EM.emit("VIEW_RANKS_FORM_rankSelected", rank);
    EM.emit("VIEW_RANKS_titleForm", "Editar Rango");
  }

  public deleteRankSelected(rank: TypeRank) {
    EM.emit("VIEW_RANKS_FORM_deleteRank", rank);
  }

  public searchRank(search: string) {
    const searchFix = search.toLowerCase();

    this._ranks = this._originRanks.filter((rank: TypeRank) => {
      return (
        rank.rank.toLowerCase().match(searchFix) ||
        rank.description.toLowerCase().match(searchFix)
      );
    });
  }

  public async listRanks(): Promise<void> {
    const request: Request = Fetch.request(
      `${THE_SERVER.host}/rango`,
      FETCH_METHODS.GET
    );

    try {
      const res = await fetch(request);
      const data = await res.json();

      const ranks: Array<TypeRank> = data.ranks.map((pro: TypeRank) => {
        return {
          id: pro.id,
          rank: pro.rank,
          description: pro.description,
        };
      });

      this._originRanks = ranks;
      this._ranks = ranks;

      return;
    } catch (e) {
      console.error(e);
    }

    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "danger",
      message: "Hubo un problema con el servidor",
      status: true,
    });

    return;
  }
}
