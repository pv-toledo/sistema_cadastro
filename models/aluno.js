const mongoose = require('mongoose');


//criando o schema para ser utilizado na criação do modelo
const alunoSchema = new mongoose.Schema({
    nome: {
        type:String, //tipo de input
        required:true //não aceita deixar o campo vazio
    },

    responsavel: {
        type:String,
        required:true
    },

    telefone: {
        type:Number,
        required:true
    },

    instrumento: {
        type:String,
        required:true,
        lowercase:true
    },
    
    congregacao: {
        type:String,
        required:true,
        lowercase:true
    }, 

    endereco: {
        type:String,
        required:true,
        lowercase:true
    },

    nascimento: {
        type:Date,
        required:true
    }
})

//cria uma coleção com o nome do primeiro argumento em letras minúsculas e em plural, onde serão salvos os dados usando esse modelo.
const Aluno = mongoose.model('Aluno', alunoSchema); 

module.exports = Aluno;