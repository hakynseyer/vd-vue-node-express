import { computed } from "vue";
import type { ComputedRef } from "vue";

import { TypeSelectOptions, TypeUser } from "@TS/interfaces";
import { dataCityCountry } from "@TS/data/cityCountry";

import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";

import { EM } from "@Assets/ts/mitt";

declare var THE_SERVER: any;

interface FormData {
  name: {
    data: string;
    error: string;
  };
  surnameFirst: {
    data: string;
    error: string;
  };
  surnameSecond: {
    data: string;
    error: string;
  };
  password: {
    data: string;
    error: string;
  };
  address: {
    data: string;
    error: string;
  };
  city: {
    data: string;
    error: string;
  };
  country: {
    data: string;
    error: string;
  };
  notes: {
    data: string;
    error: string;
  };
  rank: {
    data: number;
    error: string;
  };
}

export class FormClass {
  private _form: FormData;

  private _countryList: Array<TypeSelectOptions>;
  private _cityList: Array<TypeSelectOptions>;
  private _rankList: Array<TypeSelectOptions>;

  private _userSelected: TypeUser;

  constructor() {
    this.clearData();

    this._countryList = null;
    this._cityList = null;
    this._rankList = null;

    this._userSelected = null;
  }

  public getCountryList(): void {
    this._countryList = Object.keys(dataCityCountry).map((country: string) => {
      return {
        label: country,
        value: country,
      };
    });
  }

  public clearData() {
    EM.emit("VIEW_USERS_titleForm", "Nuevo Usuario");

    if (this._userSelected !== null) this._userSelected = null;

    this._form = {
      name: {
        data: "",
        error: "",
      },
      surnameFirst: { data: "", error: "" },
      surnameSecond: { data: "", error: "" },
      password: { data: "", error: "" },
      address: { data: "", error: "" },
      city: { data: "", error: "" },
      country: { data: "", error: "" },
      notes: { data: "", error: "" },
      rank: {
        data: 0,
        error: "",
      },
    };
  }

  get rankList(): Array<TypeSelectOptions> {
    return this._rankList;
  }
  get cityList(): Array<TypeSelectOptions> {
    return this._cityList;
  }
  get countryList(): Array<TypeSelectOptions> {
    return this._countryList;
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

  get surnameFirst(): string {
    return this._form.surnameFirst.data;
  }
  set surnameFirst(surnameFirst: string) {
    this._form.surnameFirst.data = surnameFirst;
  }
  get surnameFirstError(): string {
    return this._form.surnameFirst.error;
  }

  get surnameSecond(): string {
    return this._form.surnameSecond.data;
  }
  set surnameSecond(surnameSecond: string) {
    this._form.surnameSecond.data = surnameSecond;
  }
  get surnameSecondError(): string {
    return this._form.surnameSecond.error;
  }

  get password(): string {
    return this._form.password.data;
  }
  set password(password: string) {
    this._form.password.data = password;
  }
  get passwordError(): string {
    return this._form.password.error;
  }

  get address(): string {
    return this._form.address.data;
  }
  set address(address: string) {
    this._form.address.data = address;
  }
  get addressError(): string {
    return this._form.address.error;
  }

  get city(): string {
    return this._form.city.data;
  }
  set city(city: string) {
    if (this._countryList !== null) this._form.city.data = city;
  }
  get cityError(): string {
    return this._form.city.error;
  }

  get country(): string {
    return this._form.country.data;
  }
  set country(country: string) {
    if (Object.keys(dataCityCountry).includes(country)) {
      this._form.country.data = country;

      if (country.length)
        this._cityList = dataCityCountry[country].map((city) => {
          return {
            label: city,
            value: city,
          };
        });
      else this._cityList = null;
    }
  }
  get countryError(): string {
    return this._form.country.error;
  }

  get notes(): string {
    return this._form.notes.data;
  }
  set notes(notes: string) {
    this._form.notes.data = notes;
  }
  get notesError(): string {
    return this._form.notes.error;
  }

  get rank(): number {
    return this._form.rank.data;
  }
  set rank(rank: number) {
    this._form.rank.data = rank;
  }
  get rankError(): string {
    return this._form.rank.error;
  }

  get userSelected(): TypeUser {
    return this._userSelected;
  }
  set userSelected(user: TypeUser) {
    this._userSelected = user;
  }

  get enableSend(): ComputedRef<boolean> {
    return computed<boolean>((): boolean => {
      const noEmpty: boolean =
        this._form.name.data.length &&
        this._form.surnameFirst.data.length &&
        this._form.surnameSecond.data.length &&
        this._form.password.data.length &&
        this._form.address.data.length &&
        this._form.city.data.length &&
        this._form.country.data.length &&
        this._form.rank.data > 0
          ? true
          : false;

      if (noEmpty) return false;

      return true;
    });
  }

  get titleSend(): ComputedRef<string> {
    return computed<string>((): string => {
      if (this._userSelected === null) return "Crear Usuario";
      else return "Editar Usuario";
    });
  }

  public async getRankList(): Promise<void> {
    const request: Request = Fetch.request(
      `${THE_SERVER.host}/rango`,
      FETCH_METHODS.GET
    );

    try {
      const res = await fetch(request);
      const data = await res.json();

      this._rankList = data.ranks.map((rank) => {
        return {
          value: rank.id,
          label: rank.rank,
        };
      });

      return;
    } catch (e) {
      console.error(e);
    }

    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "danger",
      message: "Hubo un problema con el servidor",
      status: true,
    });
  }

  public async sendForm(): Promise<void> {
    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "warning",
      message: "Enviando Datos al Servidor",
      status: true,
    });

    const bodyRequest = {
      name: this._form.name.data,
      surnameFirst: this._form.surnameFirst.data,
      surnameSecond: this._form.surnameSecond.data,
      password: this._form.password.data,
      address: this._form.address.data,
      city: this._form.city.data,
      country: this._form.country.data,
      notes: this._form.notes.data,
      rank: this._form.rank.data,
    };

    if (this._userSelected !== null) bodyRequest["id"] = this._userSelected.id;

    const request: Request = Fetch.request(
      this._userSelected === null
        ? `${THE_SERVER.host}/usuario/crear`
        : `${THE_SERVER.host}/usuario/actualizar`,
      this._userSelected === null ? FETCH_METHODS.POST : FETCH_METHODS.PUT,
      bodyRequest
    );

    try {
      const res = await fetch(request);
      const datos = await res.json();

      switch (res.status) {
        case 200:
          EM.emit("COMPONENT_ALERT_launchAlert", {
            color: "success",
            message:
              this._userSelected === null
                ? `Usuario ${datos.newUser.name} ${datos.newUser["surname_first"]} creado`
                : `Usuario ${datos.user.name} ${datos.user["surname_first"]} actualizado`,
            status: true,
            timer: 5000,
          });

          // Actualizar Tabla
          EM.emit("VIEW_USERS_updateTable");

          // Limpiar Datos
          this.clearData();

          return;
          break;
        case 406:
          Object.keys(this._form).forEach((key) => {
            if (datos.error[key] !== null && datos.error[key] !== undefined)
              this._form[key].error = datos.error[key];
          });

          EM.emit("COMPONENT_ALERT_launchAlert", { status: false });

          return;
          break;
      }
    } catch (e) {
      console.error(e);
    }

    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "danger",
      message: "Hubo un problema con el servidor",
      status: true,
    });
  }

  public async deleteUser(user: TypeUser): Promise<void> {
    this.clearData();

    const request: Request = Fetch.request(
      `${THE_SERVER.host}/usuario/eliminar`,
      FETCH_METHODS.DELETE,
      {
        id: user.id,
      }
    );

    try {
      const res = await fetch(request);

      switch (res.status) {
        case 204:
          EM.emit("COMPONENT_ALERT_launchAlert", {
            color: "success",
            message: `Proveedor ${user.name} ${user.surnameFirst} eliminado`,
            status: true,
            timer: 5000,
          });

          // Actualizar Tabla
          EM.emit("VIEW_USERS_updateTable");

          return;
          break;
      }
    } catch (e) {
      console.error(e);
    }

    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "danger",
      message: "Hubo un problema con el servidor",
      status: true,
    });
  }
}
