import { Colors } from "../util/Colors";
import { formatarMoeda } from "../util/Currency";

export abstract class Produto {
  private _id: number;
  private _nome: string;
  private _tipo: number;
  private _preco: number;

  constructor(id: number, nome: string, tipo: number, preco: number) {
    this._id = id;
    this._nome = nome;
    this._tipo = tipo;
    this._preco = preco;
  }


  // Getter 

  public get id(): number {
    return this._id;
  }

  public get nome(): string {
    return this._nome;
  }

  public get tipo(): number {
    return this._tipo;
  }

  public get preco(): number {
    return this._preco;
  }


  //Setters

  public set id(value: number) {
    this._id = value;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  public set tipo(value: number) {
    this._tipo = value;
  }

  public set preco(value: number) {
    this._preco = value;
  }



  //Metodo auxiliar
  public visualizar(): void {
    let tipo: string;

    switch (this._tipo) {
      case 1:
        tipo = "Medicamento";
        break;
      case 2:
        tipo = "Cosmetico";
        break;
      default:
        tipo = "Tipo invalido";
    }

    console.log(
      Colors.bg.black,
      Colors.fg.cyan,
      "\n************************************",
    );
    console.log("        DADOS DO PRODUTO            ");
    console.log("************************************");
    console.log(`Número do Produto: ${this.id}`);
    console.log(`Nome do Produto: ${this.nome}`);
    console.log(`Tipo de Produto: ${this.tipo}`);
    console.log(`Preço do produto: ${formatarMoeda(this.preco)}`, Colors.reset);
  }
}
