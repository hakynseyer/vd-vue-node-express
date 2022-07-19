import { EM } from "@Assets/ts/mitt";

export class ProvidersClass {
  private _titleForm: string;

  constructor() {
    this._titleForm = "Nuevo Proveedor";
  }

  get titleForm(): string {
    return this._titleForm;
  }
  set titleForm(titleForm: string) {
    this._titleForm = titleForm;
  }
}
