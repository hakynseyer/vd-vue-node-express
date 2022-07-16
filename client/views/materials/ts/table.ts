interface HEADERS {
  label: string;
  value: string;
}

export class TableClass {
  private _headers: Array<HEADERS>;
  private _materials: Array<any>;
  private _materialSelected;

  constructor() {
    this._headers = [
      {
        label: "id",
        value: "id",
      },
      {
        label: "Producto",
        value: "name",
      },
      {
        label: "Descripción",
        value: "description",
      },
      {
        label: "Proveedor",
        value: "provider",
      },
      {
        label: "Usuario",
        value: "user",
      },
      {
        label: "Rango",
        value: "rank",
      },
      {
        label: "Cantidad",
        value: "amount",
      },
      {
        label: "Unidad de Medida",
        value: "um",
      },
      {
        label: "Precio",
        value: "price",
      },
    ];

    this._materials = [];
    this._materialSelected = null;
  }

  get headers(): Array<HEADERS> {
    return this._headers;
  }

  get materials(): Array<any> {
    return this._materials;
  }
  set materials(materials: Array<any>) {
    const dataMap = materials.map((row) => {
      const dataJson = {};

      this._headers.forEach((header) => {
        switch (header.value) {
          case "provider":
            dataJson[header.value] = row.Provider.company;
            break;
          case "user":
            dataJson[
              header.value
            ] = `${row.Provider.User.name} ${row.Provider.User.surname_first} ${row.Provider.User.surname_second}`;
            break;
          case "rank":
            dataJson[header.value] = row.Provider.User.Rank.rank;
            break;
          case "price":
            dataJson[header.value] = `$${row.price}`;
            break;
          default:
            dataJson[header.value] = row[header.value];
            break;
        }
      });

      return dataJson;
    });

    this._materials = dataMap;
  }

  get materialSelected() {
    return this._materialSelected;
  }
  set materialSelected(material) {
    console.log(material);
  }

  saveMaterialSelected(material: any) {
    this._materialSelected = material;
  }
}
