import { EM } from "@Assets/ts/mitt";
import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";
import { TypeTableHeader, TypeMaterial } from "@TS/interfaces";

declare var THE_SERVER: any;

export class TableClass {
  private _headers: Array<TypeTableHeader>;
  private _materials: Array<TypeMaterial>;

  private _originMaterials: Array<TypeMaterial>;

  constructor() {
    this._headers = [
      {
        label: "Producto",
        link: "name",
      },
      {
        label: "Descripción",
        link: "description",
      },
      {
        label: "Proveedor",
        link: "provider",
      },
      {
        label: "Usuario",
        link: "user",
      },
      {
        label: "Rango",
        link: "rank",
      },
      {
        label: "Cantidad",
        link: "amount",
      },
      {
        label: "Unidad de Medida",
        link: "um",
      },
      {
        label: "Precio",
        link: "priceString",
      },
    ];

    this._materials = [];
    this._originMaterials = [];
  }

  get headers(): Array<TypeTableHeader> {
    return this._headers;
  }

  get materials(): Array<any> {
    return this._materials;
  }
  set materials(materials: Array<any>) {
    this._materials = materials;
  }

  public saveMaterialSelected(material: TypeMaterial) {
    EM.emit("VIEW_MATERIALS_FORM_materialSelected", material);
    EM.emit("VIEW_MATERIALS_titleForm", "Editar Material");
  }

  public deleteMaterialSelected(material: TypeMaterial) {
    EM.emit("VIEW_MATERIALS_FORM_deleteMaterial", material);
  }

  public searchMaterial(search: string) {
    const searchFix = search.toLowerCase();
    this._materials = this._originMaterials.filter((material: TypeMaterial) => {
      return (
        material.name.toLowerCase().match(searchFix) ||
        material.description.toLowerCase().match(searchFix) ||
        material.provider.toLowerCase().match(searchFix) ||
        material.user.toLowerCase().match(searchFix)
      );
    });
  }

  public async listMaterials(): Promise<void> {
    const request: Request = Fetch.request(
      `${THE_SERVER.host}/material`,
      FETCH_METHODS.GET
    );

    try {
      const res = await fetch(request);
      const data = await res.json();

      const materials: Array<TypeMaterial> = data.materials.map(
        (mat: TypeMaterial) => {
          return {
            id: mat.id,
            name: mat.name,
            description: mat.description,
            price: mat.price,
            priceString: `$${mat.price}`,
            amount: mat.amount,
            um: mat.um,
            idProvider: mat["id_provider"],
            provider: mat["Provider"].company,
            user: `${mat["Provider"]["User"].name} ${mat["Provider"]["User"]["surname_first"]}`,
            rank: mat["Provider"]["User"]["Rank"].rank,
          };
        }
      );

      this._originMaterials = materials;
      this._materials = materials;

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
