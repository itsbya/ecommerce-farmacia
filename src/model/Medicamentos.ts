import { Produto } from "./Produto";

export class Medicamentos extends Produto {
  private _generico: string;

  constructor(
    id: number,
    name: string,
    tipo: number,
    preco: number,
    generico: string,
  ) {
    super(id, name, tipo, preco);
    this._generico = generico;
  }


 // Getter e Setter
  public get generico(): string {
    return this._generico;
  }

  public set generico(value: string) {
    this._generico = value;
  }

  // Metodo auxiliar

  public visualizar(): void {
    super.visualizar();
    console.log(`Nome genérico ${this._generico}`);
  }
}
