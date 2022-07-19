import { EM } from "@Assets/ts/mitt";
import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";
import { TypeTableHeader, TypeUser } from "@TS/interfaces";

declare var THE_SERVER: any;

export class TableClass {
  private _headers: Array<TypeTableHeader>;
  private _users: Array<TypeUser>;

  private _originUsers: Array<TypeUser>;

  constructor() {
    this._headers = [
      {
        label: "Nombre",
        link: "name",
      },
      {
        label: "Apellido Paterno",
        link: "surnameFirst",
      },
      {
        label: "Apellido Materno",
        link: "surnameSecond",
      },
      {
        label: "Rango",
        link: "rank",
      },
      {
        label: "Contraseña",
        link: "password",
      },
      {
        label: "Estado",
        link: "country",
      },
      {
        label: "Municipio",
        link: "city",
      },
      {
        label: "Dirección",
        link: "address",
      },
      {
        label: "Notas",
        link: "notes",
      },
    ];

    this._users = [];
    this._originUsers = [];
  }

  get headers(): Array<TypeTableHeader> {
    return this._headers;
  }

  get users(): Array<TypeUser> {
    return this._users;
  }
  set users(users: Array<TypeUser>) {
    this._users = users;
  }

  public saveUserSelected(user: TypeUser) {
    EM.emit("VIEW_USERS_FORM_userSelected", user);
    EM.emit("VIEW_USERS_titleForm", "Editar Usuario");
  }

  public deleteUserSelected(user: TypeUser) {
    EM.emit("VIEW_USERS_FORM_deleteUser", user);
  }

  public searchUser(search: string) {
    const searchFix = search.toLowerCase();

    this._users = this._originUsers.filter((user: TypeUser) => {
      return (
        user.name.toLowerCase().match(searchFix) ||
        user.surnameFirst.toLowerCase().match(searchFix) ||
        user.surnameSecond.toLowerCase().match(searchFix) ||
        user.country.toLowerCase().match(searchFix) ||
        user.city.toLowerCase().match(searchFix) ||
        user.rank.toLowerCase().match(searchFix)
      );
    });
  }

  public async listUsers(): Promise<void> {
    const request: Request = Fetch.request(
      `${THE_SERVER.host}/usuario`,
      FETCH_METHODS.GET
    );

    try {
      const res = await fetch(request);
      const data = await res.json();

      const users: Array<TypeUser> = data.users.map((pro: TypeUser) => {
        return {
          id: pro.id,
          name: pro.name,
          surnameFirst: pro["surname_first"],
          surnameSecond: pro["surname_second"],
          password: pro.password,
          address: pro.address,
          city: pro.city,
          country: pro.country,
          notes: pro.notes,
          idRank: pro["id_rank"],
          rank: pro["Rank"].rank,
        };
      });

      this._originUsers = users;
      this._users = users;

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
