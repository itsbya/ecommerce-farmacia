import { Produto } from "./Produto";

export class Cosmeticos extends Produto {
  private _fragrancia: string;

  constructor(
    id: number,
    name: string,
    tipo: number,
    preco: number,
    fragrancia: string,
  ) {
    super(id, name, tipo, preco);
    this._fragrancia = fragrancia;
  }


  // Getter e Setter
  public get fragrancia(): string {
    return this._fragrancia;
  }

  public set fragrancia(value: string) {
    this._fragrancia = value;
  }
  


 // Metodo auxiliar
  public visualizar(): void {
    super.visualizar();
    console.log(` Fragrancia ${this._fragrancia}`);
  }
}
