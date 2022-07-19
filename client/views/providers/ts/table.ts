import { EM } from "@Assets/ts/mitt";
import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";
import { TypeTableHeader, TypeProvider } from "@TS/interfaces";

declare var THE_SERVER: any;

export class TableClass {
  private _headers: Array<TypeTableHeader>;
  private _providers: Array<TypeProvider>;

  private _originProviders: Array<TypeProvider>;

  constructor() {
    this._headers = [
      {
        label: "Compañia",
        link: "company",
      },
      {
        label: "Descripción",
        link: "description",
      },
      {
        label: "Usuario",
        link: "user",
      },
      {
        label: "Rango",
        link: "rank",
      },
    ];

    this._providers = [];
    this._originProviders = [];
  }

  get headers(): Array<TypeTableHeader> {
    return this._headers;
  }

  get providers(): Array<TypeProvider> {
    return this._providers;
  }
  set providers(providers: Array<TypeProvider>) {
    this._providers = providers;
  }

  public saveProviderSelected(provider: TypeProvider) {
    EM.emit("VIEW_PROVIDERS_FORM_providerSelected", provider);
    EM.emit("VIEW_PROVIDERS_titleForm", "Editar Proveedor");
  }

  public deleteProviderSelected(provider: TypeProvider) {
    EM.emit("VIEW_PROVIDERS_FORM_deleteProvider", provider);
  }

  public searchProvider(search: string) {
    const searchFix = search.toLowerCase();

    this._providers = this._originProviders.filter((provider: TypeProvider) => {
      return (
        provider.company.toLowerCase().match(searchFix) ||
        provider.description.toLowerCase().match(searchFix) ||
        provider.user.toLowerCase().match(searchFix)
      );
    });
  }

  public async listProviders(): Promise<void> {
    const request: Request = Fetch.request(
      `${THE_SERVER.host}/proveedor`,
      FETCH_METHODS.GET
    );

    try {
      const res = await fetch(request);
      const data = await res.json();

      const providers: Array<TypeProvider> = data.providers.map(
        (pro: TypeProvider) => {
          return {
            id: pro.id,
            company: pro.company,
            description: pro.description,
            idUser: pro["id_user"],
            user: `${pro["User"].name} ${pro["User"]["surname_first"]}`,
            rank: pro["User"]["Rank"].rank,
          };
        }
      );

      this._originProviders = providers;
      this._providers = providers;

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
