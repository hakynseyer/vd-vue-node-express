import { computed } from "vue";
import type { ComputedRef } from "vue";
import { SelectOptions } from "@TS/interfaces";

import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";

import { EM } from "@Assets/ts/mitt";

declare var THE_SERVER: any;

interface FormData {
  name: {
    data: string;
    error: string;
  };
  description: {
    data: string;
    error: string;
  };
  amount: {
    data: number;
    error: string;
  };
  um: {
    data: string;
    error: string;
  };
  price: {
    data: number;
    error: string;
  };
  provider: {
    data: number;
    error: string;
  };
}

export class FormClass {
  private _form: FormData;
  private _umList: Array<SelectOptions>;
  private _providerList: any;

  constructor() {
    this._form = {
      name: {
        data: "",
        error: "",
      },
      description: {
        data: "",
        error: "",
      },
      amount: {
        data: 0.0,
        error: "",
      },
      um: {
        data: "",
        error: "",
      },
      price: {
        data: 0.0,
        error: "",
      },
      provider: {
        data: 0,
        error: "",
      },
    };

    this._umList = [
      { label: "Kilogramos", value: "Kilogramos" },
      { label: "Gramos", value: "Gramos" },
      { label: "Litros", value: "Litros" },
      { label: "Piezas", value: "Piezas" },
      { label: "Bultos", value: "Bultos" },
    ];

    this._providerList = null;
  }

  get umList(): Array<SelectOptions> {
    return this._umList;
  }
  get providerList(): any {
    return this._providerList;
  }
  set providerList(providerList: any) {
    this._providerList = providerList;
  }

  get name(): string {
    return this._form.name.data;
  }
  set name(name: string) {
    this._form.name.data = name;
  }
  get nameError(): string {
    return this._form.name.error;
  }

  get description(): string {
    return this._form.description.data;
  }
  set description(description: string) {
    this._form.description.data = description;
  }
  get descriptionError(): string {
    return this._form.description.error;
  }

  get amount(): number {
    return this._form.amount.data;
  }
  set amount(amount: number) {
    this._form.amount.data = amount;
  }
  get amountError(): string {
    return this._form.amount.error;
  }

  get um(): string {
    return this._form.um.data;
  }
  set um(um: string) {
    this._form.um.data = um;
  }
  get umError(): string {
    return this._form.um.error;
  }

  get price(): number {
    return this._form.price.data;
  }
  set price(price: number) {
    this._form.price.data = price;
  }
  get priceError(): string {
    return this._form.price.error;
  }

  get provider(): number {
    return this._form.provider.data;
  }
  set provider(provider: number) {
    this._form.provider.data = provider;
  }
  get providerError(): string {
    return this._form.provider.error;
  }

  get enableSend(): ComputedRef<boolean> {
    return computed<boolean>((): boolean => {
      const noEmpty: boolean =
        this._form.name.data.length &&
        this._form.description.data.length &&
        this._form.um.data.length &&
        this._form.provider.data > 0
          ? true
          : false;

      if (noEmpty) return false;

      return true;
    });
  }

  public async getProviderList(): Promise<void> {
    const request: Request = Fetch.request(
      `${THE_SERVER.host}/proveedor`,
      FETCH_METHODS.GET
    );

    try {
      const res = await fetch(request);
      const data = await res.json();

      return data.providers.map((provider) => {
        return {
          value: provider.id,
          label: provider.company,
        };
      });

      return;
    } catch (e) {
      console.error(e);
    }

    EM.emit("ALERT", {
      color: "danger",
      message: "Hubo un problema con el servidor",
      status: true,
    });
  }

  public async sendForm(): Promise<void> {
    EM.emit("ALERT", {
      color: "warning",
      message: "Enviando Datos al Servidor",
      status: true,
    });

    const request: Request = Fetch.request(
      `${THE_SERVER.host}/material/crear`,
      FETCH_METHODS.POST,
      {
        name: this._form.name.data,
        description: this._form.description.data,
        amount: this._form.amount.data,
        um: this._form.um.data,
        price: this._form.price.data,
        provider: this._form.provider.data,
      }
    );

    try {
      const res = await fetch(request);
      const datos = await res.json();
      console.log(datos);
      switch (res.status) {
        case 200:
          EM.emit("ALERT", {
            color: "success",
            message: `Material ${datos.newMaterial.name} creado`,
            status: true,
            timer: 2000,
          });

          // Limpiar Formulario
          return;
          break;
        case 406:
          Object.keys(this._form).forEach((key) => {
            if (datos.error[key] !== null && datos.error[key] !== undefined)
              this._form[key].error = datos.error[key];
          });

          EM.emit("ALERT", { status: false });

          return;
          break;
      }
    } catch (e) {
      console.error(e);
    }

    EM.emit("ALERT", {
      color: "danger",
      message: "Hubo un problema con el servidor",
      status: true,
    });
  }
}
