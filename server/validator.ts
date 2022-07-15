export class Validador_Modos_Class {
  static empty(data: string): string {
    let res: string = "";

    if (data === undefined) res = "Este campo no puede estar vacio";
    else if (data.length === 0) res = "Este campo no puede estar vacio";

    return res;
  }

  static min(data: string, min: number): string {
    let res: string = "";

    if (data.length < min)
      res = `Debe de contener como mínimo ${min} carácteres. Te faltan ${
        min - data.length
      } carácteres`;

    return res;
  }

  static max(data: string, max: number): string {
    let res: string = "";

    if (data.length > max)
      res = `Debe de contener como máximo ${max} carácteres. Te sobran ${
        data.length - max
      } carácteres`;

    return res;
  }
}

class Validador_Class {
  static basic(data: string, min: number, max: number): string {
    let res = "";

    res = Validador_Modos_Class.empty(data);
    if (res === "") {
      res = Validador_Modos_Class.min(data, min);
      if (res === "") {
        res = Validador_Modos_Class.max(data, max);
        if (res === "") return "";
      }
    }

    return res;
  }

  static basicOptionalEmpty(data: string, min: number, max: number): string {
    let res = "";

    if (Validador_Modos_Class.empty(data) === "") {
      res = Validador_Modos_Class.min(data, min);
      if (res === "") {
        res = Validador_Modos_Class.max(data, max);
        if (res === "") return "";
      }
    }

    return res;
  }
}

export { Validador_Class as Validator };
