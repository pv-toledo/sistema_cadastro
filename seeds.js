const mongoose = require('mongoose'); //conectar mongo com o javascript

const Aluno = require('./models/aluno'); //requisitar o modelo 'Aluno' criado em 'aluno.js'

mongoose.connect('mongodb://127.0.0.1:27017/cadastroAlunos') //conectando a database
    .then(() => {
        console.log("connection open");
    })
    .catch((e) => {
        console.log('Erro');
        console.log(e);
    })


//criando dois alunos hipotéticos apenas para ver se tá funcionando
const seeds = [

    {
        nome: 'Paulo',
        telefone: 24999999999,
        responsavel: 'o proprio',
        instrumento: 'clarinete',
        congregacao: 'sede',
        endereco: 'rua guilherme viana, 151',
        nascimento:'07/06/1998'
        
    },

    {
        nome: 'Marcilei',
        telefone: 24988888888,
        responsavel: 'Cláudio',
        instrumento: 'saxofone',
        congregacao: 'sede',
        endereco: 'rua guilherme viana, 151',
        nascimento:'07/06/1968'
    }
];


//inserindo na base de dados usando o modelo alunos.
//retorna uma 'promisse'
//.then pra mostrar o que foi inserido se funcionar
//.catch para mostrar o erro se acontecer
Aluno.insertMany(seeds)
.then(res => {console.log(res)})
.catch(err => {console.log(err)})

