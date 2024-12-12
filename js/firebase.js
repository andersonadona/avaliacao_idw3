const firebaseConfig = {
    databaseURL: 'https://estoque-232fd-default-rtdb.firebaseio.com'
};

async function salvarProduto(produto) {
    try {
        console.log('Tentando salvar produto:', produto); // Log de depuração
        const resposta = await fetch(`${firebaseConfig.databaseURL}/produtos.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        if (!resposta.ok) {
            const errorText = await resposta.text();
            console.error('Erro na resposta:', resposta.status, errorText);
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const resultado = await resposta.json();
        console.log('Produto salvo com sucesso:', resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro completo ao salvar:', erro);
        alert('Erro ao salvar produto: ' + erro.message);
        throw erro; // Relança o erro para tratamento no chamador
    }
}

async function listarProdutos() {
    try {
        const resposta = await fetch(`${firebaseConfig.databaseURL}/produtos.json`);
        
        if (!resposta.ok) {
            const errorText = await resposta.text();
            console.error('Erro na resposta:', resposta.status, errorText);
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();
        console.log('Produtos carregados:', dados);
        return dados || {}; 
    } catch (erro) {
        console.error('Erro ao listar:', erro);
        alert('Erro ao listar produtos: ' + erro.message);
        return {};
    }
}

async function atualizarProduto(id, dadosAtualizados) {
    try {
        const resposta = await fetch(`${firebaseConfig.databaseURL}/produtos/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!resposta.ok) {
            const errorText = await resposta.text();
            console.error('Erro na resposta:', resposta.status, errorText);
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const resultado = await resposta.json();
        console.log('Produto atualizado com sucesso:', resultado);
        return resultado;
    } catch (erro) {
        console.error('Erro ao atualizar produto:', erro);
        alert('Erro ao atualizar produto: ' + erro.message);
    }
}

async function excluirProduto(id) {
    try {
        const resposta = await fetch(`${firebaseConfig.databaseURL}/produtos/${id}.json`, {
            method: 'DELETE'
        });

        if (!resposta.ok) {
            const errorText = await resposta.text();
            console.error('Erro na resposta:', resposta.status, errorText);
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        console.log('Produto excluído com sucesso:', id);
        return id; // Retorna o ID do produto excluído
    } catch (erro) {
        console.error('Erro ao excluir produto:', erro);
        alert('Erro ao excluir produto: ' + erro.message);
    }
}

// Mantenha as outras funções (atualizarProduto e excluirProduto) com logs similares