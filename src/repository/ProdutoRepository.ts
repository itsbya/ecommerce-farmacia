import { Produto } from "../model/Produto";

export interface ProdutoRepository {
    
    consultarPorId(id: number): void;
    listarTodos(): void;
    criarProduto(produto: Produto): void;
    atualizarProduto(produto: Produto): void;
    deletarProduto(id: number): void;




}