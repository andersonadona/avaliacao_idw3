document.addEventListener('DOMContentLoaded', () => {
    const formProduto = document.getElementById('formProduto');
    
    // Verifique se há dados para editar
    const produtoParaEditar = localStorage.getItem('produtoParaEditar');
    if (produtoParaEditar) {
        const produto = JSON.parse(produtoParaEditar);
        document.getElementById('produtoId').value = localStorage.getItem('produtoId');
        document.getElementById('tituloFormulario').innerText = 'Editar Produto';
        document.getElementById('nome').value = produto.nome;
        document.getElementById('codigo').value = produto.codigo;
        document.getElementById('quantidade').value = produto.quantidade;
        document.getElementById('preco').value = produto.preco;

        // Limpe o localStorage após usar
        localStorage.removeItem('produtoParaEditar');
    }

    if (formProduto) {
        formProduto.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value.trim();
            const codigo = document.getElementById('codigo').value.trim();
            const quantidade = document.getElementById('quantidade').value.trim();
            const preco = document.getElementById('preco').value.trim();
            
            // Validações mais rigorosas
            if (!nome || !codigo || !quantidade || !preco) {
                alert('Por favor, preencha todos os campos obrigatórios');
                return;
            }
            
            // Validação de preço (formato monetário)
            const precoFormatado = preco.replace(',', '.');
            const precoNumerico = parseFloat(precoFormatado);
            
            if (isNaN(precoNumerico) || precoNumerico <= 0) {
                alert('Insira um preço válido e positivo');
                return;
            }
            
            const produto = {
                nome,
                codigo,
                quantidade: parseInt(quantidade),
                preco: precoNumerico
            };
            
            try {
                console.log('Preparando para salvar produto:', produto);
                const resultadoSalvamento = await salvarProduto(produto);
                
                if (resultadoSalvamento) {
                    alert('Produto cadastrado com sucesso!');
                    formProduto.reset();
                } else {
                    alert('Falha ao salvar o produto');
                }
            } catch (erro) {
                console.error('Erro no salvamento:', erro);
                alert('Erro ao cadastrar produto: ' + erro.message);
            }
        });
    }
});