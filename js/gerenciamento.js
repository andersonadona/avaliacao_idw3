document.addEventListener('DOMContentLoaded', () => {
    const corpoTabela = document.getElementById('corpoTabela');
    
    async function carregarProdutos() {
        const produtos = await listarProdutos();
        corpoTabela.innerHTML = ''; // Limpa tabela
        
        for (let id in produtos) {
            const produto = produtos[id];
            const linha = document.createElement('tr');
            
            linha.innerHTML = `
                <td><span id="nome-display-${id}">${produto.nome}</span><input type="text" value="${produto.nome}" id="nome-${id}" style="display:none;" /></td>
                <td><span id="codigo-display-${id}">${produto.codigo}</span><input type="text" value="${produto.codigo}" id="codigo-${id}" style="display:none;" /></td>
                <td><span id="quantidade-display-${id}">${produto.quantidade}</span><input type="number" value="${produto.quantidade}" id="quantidade-${id}" style="display:none;" /></td>
                <td><span id="preco-display-${id}">R$ ${produto.preco.toFixed(2)}</span><input type="text" value="${produto.preco}" id="preco-${id}" style="display:none;" /></td>
                <td>
                    <button onclick="editarProduto('${id}', this)">Editar</button>
                    <button onclick="salvarProduto('${id}')" style="display:none;" id="salvar-${id}">Salvar</button>
                    <button onclick="excluirProdutoLinha('${id}')" style="display:inline-block;" id="excluir-${id}">Excluir</button>
                </td>
            `;
            
            corpoTabela.appendChild(linha);
        }
    }

    window.editarProduto = (id, botaoEditar) => {
        // Exibir campos de entrada e ocultar exibição
        document.getElementById(`nome-display-${id}`).style.display = 'none';
        document.getElementById(`codigo-display-${id}`).style.display = 'none';
        document.getElementById(`quantidade-display-${id}`).style.display = 'none';
        document.getElementById(`preco-display-${id}`).style.display = 'none';
        
        document.getElementById(`nome-${id}`).style.display = 'block';
        document.getElementById(`codigo-${id}`).style.display = 'block';
        document.getElementById(`quantidade-${id}`).style.display = 'block';
        document.getElementById(`preco-${id}`).style.display = 'block';
        
        // Exibir botão de salvar e ocultar botão de editar e excluir
        document.getElementById(`salvar-${id}`).style.display = 'inline-block';
        botaoEditar.style.display = 'none'; // Oculta o botão "Editar"
        document.getElementById(`excluir-${id}`).style.display = 'none'; // Oculta o botão "Excluir"
    };

    window.salvarProduto = async (id) => {
        const nome = document.getElementById(`nome-${id}`).value;
        const codigo = document.getElementById(`codigo-${id}`).value;
        const quantidade = parseInt(document.getElementById(`quantidade-${id}`).value);
        const preco = parseFloat(document.getElementById(`preco-${id}`).value);

        const produtoAtualizado = {
            nome,
            codigo,
            quantidade,
            preco
        };

        await atualizarProduto(id, produtoAtualizado); // Atualize o produto no Firebase
        carregarProdutos(); // Recarregue a lista de produtos
    };

    window.excluirProdutoLinha = async (id) => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            await excluirProduto(id);
            carregarProdutos();
        }
    };
    
    carregarProdutos();
});