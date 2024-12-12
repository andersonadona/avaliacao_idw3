document.addEventListener('DOMContentLoaded', () => {
    const corpoTabela = document.getElementById('corpoTabela');
    
    async function carregarProdutos() {
        const produtos = await listarProdutos();
        corpoTabela.innerHTML = ''; // Limpa tabela
        
        for (let id in produtos) {
            const produto = produtos[id];
            const linha = document.createElement('tr');
            
            linha.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.codigo}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>
                    <button onclick="editarProduto('${id}')">Editar</button>
                    <button onclick="excluirProdutoLinha('${id}')">Excluir</button>
                </td>
            `;
            
            corpoTabela.appendChild(linha);
        }
    }
    
    window.editarProduto = async (id) => {
        const produtos = await listarProdutos();
        const produto = produtos[id];

        if (!produto) {
            alert('Produto não encontrado!');
            return;
        }

        // Preencha o formulário com os dados do produto
        const produtoIdInput = document.getElementById('produtoId');
        const nomeInput = document.getElementById('nome');
        const codigoInput = document.getElementById('codigo');
        const quantidadeInput = document.getElementById('quantidade');
        const precoInput = document.getElementById('preco');

        // Verifique se os elementos existem
        if (produtoIdInput && nomeInput && codigoInput && quantidadeInput && precoInput) {
            produtoIdInput.value = id; // Armazene o ID do produto
            document.getElementById('tituloFormulario').innerText = 'Editar Produto'; // Mude o título
            nomeInput.value = produto.nome;
            codigoInput.value = produto.codigo;
            quantidadeInput.value = produto.quantidade;
            precoInput.value = produto.preco;

            // Adicione um evento para salvar as alterações
            const formProduto = document.getElementById('formProduto');
            formProduto.onsubmit = async (e) => {
                e.preventDefault();
                const produtoAtualizado = {
                    nome: nomeInput.value,
                    codigo: codigoInput.value,
                    quantidade: parseInt(quantidadeInput.value),
                    preco: parseFloat(precoInput.value.replace(',', '.'))
                };

                await atualizarProduto(id, produtoAtualizado); // Atualize o produto no Firebase
                carregarProdutos(); // Recarregue a lista de produtos
                formProduto.reset(); // Limpe o formulário
                document.getElementById('tituloFormulario').innerText = 'Cadastro de Produto'; // Restaure o título
            };
        } else {
            console.error('Um ou mais elementos do formulário não foram encontrados.');
        }
    };
    
    window.excluirProdutoLinha = async (id) => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            await excluirProduto(id);
            carregarProdutos();
        }
    };
    
    carregarProdutos();
});