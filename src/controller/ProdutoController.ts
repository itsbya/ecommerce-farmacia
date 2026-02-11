import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";
import { Colors } from "../util/Colors";
import { formatarMoeda } from "../util/Currency";

export class ProdutoController implements ProdutoRepository {
  private listaProdutos = new Array<Produto>();

  public numero: number = 0;
  

  //CRUD
  criarProduto(produto: Produto): void {
    if (this.listaProdutos.map((p) => p.id === produto.id))
      console.log(`O produto ${produto} já existe`);
    else this.listaProdutos.push(produto);
  }




  listarTodos(): void {
    if (this.listaProdutos.length === 0)
      throw new Error("A lista de Produtos está vazia.");
    else this.listaProdutos.forEach((produto) => produto.visualizar());
  }



  consultarPorId(id: number): void {
    const buscaConta = this.buscarNoArray(id);

    if (buscaConta !== null) buscaConta.visualizar();
    else console.log(Colors.fg.red, "\nConta não Encontrada!", Colors.reset);
  }



  atualizarProduto(produto: Produto): void {
    const buscaConta = this.buscarNoArray(produto.id);

    if (buscaConta !== null) {
      this.listaProdutos[this.listaProdutos.indexOf(buscaConta)] = produto;
      console.log(
        Colors.fg.green,
        `\nA Conta número ${produto.id} foi Atualizada com Sucesso!`,
        Colors.reset,
      );
    } else console.log(Colors.fg.red, "\nConta não Encontrada!", Colors.reset);
  }



  deletarProduto(numero: number): void {
    const buscaConta = this.buscarNoArray(numero);

    if (buscaConta !== null) {
      this.listaProdutos.splice(this.listaProdutos.indexOf(buscaConta), 1);
      console.log(
        Colors.fg.green,
        `\nA Conta número ${numero} foi Deletada com Sucesso!`,
        Colors.reset,
      );
    } else console.log(Colors.fg.red, "\nConta não Encontrada!", Colors.reset);
  }



  //Metodos auxiliares
  public gerarId(): number {
    return ++this.numero;
  }


  public buscarNoArray(numero: number): Produto | null {
    return this.listaProdutos.find((produto) => produto.id === numero) || null;
  }
}
