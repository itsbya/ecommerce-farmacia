import { ProdutoController } from "./src/controller/ProdutoController";
import { Cosmeticos } from "./src/model/Cosmeticos";
import { Medicamentos } from "./src/model/Medicamentos";
import { Colors } from "./src/util/Colors";
import { Input } from "./src/util/Input";
import { formatarMoeda } from "./src/util/Currency";




//criar objeto global da classe Produto controller
const produtoController = new ProdutoController();


//criar Array contendo os tipos de produtos
const tipoprodutos = ["Medicamentos", "Cosmeticos"];


export function main() {

    let opcao: number;


    while (true) {


console.log(Colors.bg.magenta, Colors.fg.cyan, 
                    "*****************************************************");
        console.log("                                                     ");
        console.log("                FARMACIA - TUDO POR VOCÊ             ");
        console.log("                                                     ");
        console.log("-----------------------------------------------------");
        console.log("                                                     ");
        console.log("            1 - Criar produto                        ");
        console.log("            2 - Listar todos os produtos             ");
        console.log("            3 - Consultar por Id                     ");
        console.log("            4 - Atualizar Dados do produto           ");
        console.log("            5 - Apagar produto                       ");
        console.log("            6 - Sair                                 ");
        console.log("                                                     ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ", 
        Colors.reset);



        console.log("Entre com a opção desejada:");
        opcao = Input.questionInt("");

        if (opcao === 0) {
            console.log(Colors.fg.greenstrong, "\nFARMACIA - TUDO POR VOCÊ");
            sobre();
            console.log(Colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(Colors.fg.whitestrong, "\n\nCriar produto\n\n", Colors.reset);

                criarProduto();

                keyPress()
                break;
            case 2:
                console.log(Colors.fg.whitestrong, "\n\nListar todas os produtos\n\n", Colors.reset);
                
                listarTodos();

                keyPress()
                break;
            case 3:
                console.log(Colors.fg.whitestrong, "\n\nConsultar dados do produto - por número\n\n", Colors.reset);

                consultarPorId();

                keyPress()
                break;
            case 4:
                console.log(Colors.fg.whitestrong, "\n\nAtualizar dados do produto\n\n", Colors.reset);

                atualizarProduto();

                keyPress()
                break;
            case 5:
                console.log(Colors.fg.whitestrong, "\n\nApagar um produto\n\n", Colors.reset);
                
                deletarProduto();

                keyPress()
                break;
           
        }
    }

  
   // Opção 1: Cria todos os produtos
    function criarProduto(){

    console.log("Digite o nome do produto: ")
    const nome = Input.question("", { defaultInput: '' });

    console.log("Selecione o tipo de produto: ")
    const tipo = Input.keyInSelect(tipoprodutos, "", { cancel: false}) + 1;

    console.log("Digite o preço do produto: ")
    const preco = Input.questionFloat("", { defaultInput: tipo});


   //SWITCH DE CRIAR PRODUTO
    switch(tipo){
        case 1: // Cria um objeto da classe Medicamentos
            console.log("Digite o  generico do produto: ");
            const generico = Input.question("", { defaultInput: nome });

            produtoController.criarProduto(new Medicamentos(
                produtoController.gerarId(), nome, tipo, preco, generico));
        break;

        case 2: // Cria um objeto da classe Cosmeticos
            console.log("Digite o do produto: ");
            const fragrancia = Input.question("", { defaultInput: nome });
            
            produtoController.criarProduto(new Cosmeticos(
                produtoController.gerarId(), nome, tipo, preco, fragrancia));
        break;

    }



}

 
 //Opção 2: Lista todos os produtos
 
function listarTodos(): void{
    produtoController.listarTodos();
}




//Opção 3: Busca um produto pelo número
 
function consultarPorId(): void{

    // Solicita o número do produto
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    // Localiza o produto a partir do número
    produtoController.consultarPorId(numero);

}



/*
  Opção 4: Atualiza os dados de um produto existente e
  permite manter os valores atuais pressionando Enter.
 */
function atualizarProduto(): void{

    // Solicita o número do produto
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    // Verifica se o produto existe
    const produto = produtoController.buscarNoArray(numero);

    // Se o produto existir...
    if (produto !== null) {

        /**
         * Guarda os valores atuais do produto em variáveis
         * Exceto tipo que  será aramazenado em uma constante
         * porque não terá o seu valor modificado
         */
        let nome: string = produto.nome;
        const tipo: number = produto.tipo;
        let preco: number = produto.preco;

       
        console.log(`\nNome atual: ${nome}`);
        console.log("Digite o novo nome do produto: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        nome = Input.question("", { defaultInput: nome });


        // Atualização do preço
        console.log(`\nSaldo atual: ${formatarMoeda(preco)}`);
        console.log("Digite o valor do novo saldo: ");
        console.log("(Pressione ENTER para manter o valor atual)");
        preco = Input.questionFloat("", { defaultInput: preco });

        // Atualização do Tipo
        switch(tipo){
            case 1: // Medicamentos
                
            
                let generico: string = (produto as Medicamentos).generico;

                // Atualização do generico
                console.log(`\nGenerico atual: ${generico}`);
                console.log("Digite o novo generico: ");
                console.log("(Pressione ENTER para manter o generico atual)");
                generico = Input.question("", { defaultInput: generico });

                // Atualização ID
                console.log("Digite o novo ID: ");
                const idMedicamento : number = Input.questionInt('')

              
                produtoController.atualizarProduto(new Medicamentos(idMedicamento , nome, tipo, preco, generico));
            break;

            case 2: // Cosmeticos
                    
                let fragrancia: string = (produto as Cosmeticos).fragrancia;

                // Atualização do fragrancia
                console.log(`\nFragrancia Atual: ${fragrancia}`);
                console.log("Digite a nova fragrancia: ");
                console.log("(Pressione ENTER para manter a fragrancia atual)");
                fragrancia = Input.question("", { defaultInput: fragrancia });

                // Atualização ID
                console.log("Digite o novo ID: ");
                const idCosmetico : number = Input.questionInt('')


                produtoController.atualizarProduto(new Cosmeticos(idCosmetico ,nome, tipo, preco, fragrancia));

            break;
        }

    }else{
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset);
    }
}
}



/**
 * Opção 5: Apaga um produto do sistema
 */
function deletarProduto():void{
            console.log("Digite o ID do Produto")
            const numero = Input.questionInt("")

            console.log(`Deseja realmente apagar a conta ${numero} ? (S) Sim (N) Não `);
            let validacao : string = Input.question("", { defaultInput: '' } ).toUpperCase();
        
           if(validacao === "S")
           produtoController.deletarProduto(numero);

           else return;
        
           }



 

/**
 * Dados da pessoa desenvolvedora
 */
function sobre(): void {
    console.log(Colors.bg.black, Colors.fg.cyan, 
             "\n*****************************************************");
    console.log("Projeto Desenvolvido por: Ana Beatriz");
    console.log("Rafael Antônio de Queiróz - anabeatrizcarvalhoesmaile@gmail.com");
    console.log("github.com/itsbya");
    console.log("*****************************************************");
}

/**
 * Função de pausa entre as opções do menu
 */
function keyPress(): void {
    console.log(Colors.reset,"\nPressione enter para continuar...");
    Input.prompt();
}


main();