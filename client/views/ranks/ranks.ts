import { EM } from "@Assets/ts/mitt";

export class RanksClass {
  private _titleForm: string;

  constructor() {
    this._titleForm = "Nuevo Rango";
  }

  get titleForm(): string {
    return this._titleForm;
  }
  set titleForm(titleForm: string) {
    this._titleForm = titleForm;
  }
}
