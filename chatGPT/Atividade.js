const express = require('express');
const app = express();
app.use(express.json());

let produtos = []; // Array que armazena os produtos

// Middleware de logging
const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};
app.use(loggingMiddleware);

// Middleware para extrair produto por ID
const produtoPorIdMiddleware = (req, res, next) => {
    const { id } = req.params;
    const produto = produtos.find(prod => prod.id === parseInt(id));
    
    if (!produto) {
        return res.status(404).json({ mensagem: `Produto com ID ${id} não encontrado.` });
    }
    
    req.produto = produto;
    next();
};

// POST - Cadastrar produto
app.post('/produtos', (req, res) => {
    try {
        const { id, nome, marca, preco, estoque, categoria, avaliacoes, dataCadastro } = req.body;
        const novoProduto = { id, nome, marca, preco, estoque, categoria, avaliacoes, dataCadastro: new Date() };
        produtos.push(novoProduto);
        res.status(201).json({ mensagem: 'Produto cadastrado com sucesso.', produto: novoProduto });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar produto.', error: error.message });
    }
});

// DELETE - Deletar produto
app.delete('/produtos/:id', produtoPorIdMiddleware, (req, res) => {
    try {
        produtos = produtos.filter(prod => prod.id !== parseInt(req.produto.id));
        res.status(200).json({ mensagem: `Produto com ID ${req.produto.id} deletado com sucesso.` });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar produto.', error: error.message });
    }
});

// GET - Listar todos os produtos com filtros e ordenação
app.get('/produtos', (req, res) => {
    try {
        let { nome, marca, precoMenorQue, mediaAvaliacaoMaiorQue, ordenarPor, ordem } = req.query;
        let resultado = [...produtos];

        if (nome) resultado = resultado.filter(prod => prod.nome.includes(nome));
        if (marca) resultado = resultado.filter(prod => prod.marca.includes(marca));
        if (precoMenorQue) resultado = resultado.filter(prod => prod.preco < parseFloat(precoMenorQue));
        if (mediaAvaliacaoMaiorQue) {
            resultado = resultado.filter(prod => {
                const media = prod.avaliacoes.reduce((a, b) => a + b, 0) / prod.avaliacoes.length;
                return media > parseFloat(mediaAvaliacaoMaiorQue);
            });
        }

        if (ordenarPor) {
            resultado.sort((a, b) => {
                if (ordem === 'desc') return b[ordenarPor] - a[ordenarPor];
                return a[ordenarPor] - b[ordenarPor];
            });
        }

        res.status(200).json({ produtos: resultado });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar produtos.', error: error.message });
    }
});

// GET - Buscar produto por ID
app.get('/produtos/:id', produtoPorIdMiddleware, (req, res) => {
    res.status(200).json({ produto: req.produto });
});

// PUT - Atualizar todos os dados de um produto por ID
app.put('/produtos/:id', produtoPorIdMiddleware, (req, res) => {
    try {
        const { nome, marca, preco, estoque, categoria, avaliacoes, dataCadastro } = req.body;
        Object.assign(req.produto, { nome, marca, preco, estoque, categoria, avaliacoes, dataCadastro });
        res.status(200).json({ mensagem: 'Produto atualizado com sucesso.', produto: req.produto });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar produto.', error: error.message });
    }
});

// PATCH - Atualizar preço de um produto por ID aplicando uma redução de X%
app.patch('/produtos/:id/preco', produtoPorIdMiddleware, (req, res) => {
    try {
        const { reducaoPercentual } = req.body;
        req.produto.preco -= req.produto.preco * (reducaoPercentual / 100);
        res.status(200).json({ mensagem: 'Preço atualizado com sucesso.', produto: req.produto });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar preço do produto.', error: error.message });
    }
});

// PATCH - Atualizar o estoque de um produto por ID
app.patch('/produtos/:id/estoque', produtoPorIdMiddleware, (req, res) => {
    try {
        const { ajusteEstoque } = req.body;
        req.produto.estoque += ajusteEstoque;
        res.status(200).json({ mensagem: 'Estoque atualizado com sucesso.', produto: req.produto });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar estoque do produto.', error: error.message });
    }
});

// Inicializa o servidor
app.listen(3000, () => {
    console.log('API rodando na porta 3000');
});