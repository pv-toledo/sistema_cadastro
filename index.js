const express = require('express'); //requisitar express
const mongoose = require('mongoose'); //requisitar mongoose para conectar com mongoDB
const path = require('path'); //path para poder utilizar a pasta de views em qualquer lugar
const methodOverride = require('method-override'); //method-override para fazer post de formulário ser lida como delete, put ou patch
const { idadeAluno } = require('./functions'); //importa a função de formatar data

const app = express(); //definir app como o executável do express

/////////////////////////////////////////////////
app.set('views', path.join(__dirname, 'views'));/////// bloco para conseguir acessar views independente do diretório e colocar o padrão de view 
app.set('view engine', 'ejs')                  //////  como .ejs (embeded javascript)
////////////////////////////////////////////////

app.use(express.urlencoded({ extended: true })); //utilizado para conseguir ler o resultado de formulários
app.use(methodOverride('_method')) //definindo a query string para ser utilizada no method-override

mongoose.connect('mongodb://127.0.0.1:27017/cadastroAlunos') //porta padrão do mongoDB no local e criando ou acessando o DB cadastroAlunos
    .then(() => {
        console.log("connection open");
    })
    .catch((e) => {
        console.log('Erro');
        console.log(e);
    })

const Aluno = require('./models/aluno'); //importando o modelo de aluno

let instrumentos = ["clarinete", "saxofone", "flauta transversa", "violino", "violoncelo", "trompete", "trombone", "trompa", "teclado", "violao", "guitarra", "bateria", "canto"];

//conectando o servidor na porta 3000
app.listen(3000, () => {
    console.log('Listening on 3000')
})

//Rota para a página inicial, onde estão listados todos os alunos

//Aparentemente, o app.set('views',path.join(__dirname,'views')) retorna como padrão o caminho 'views/', então tem que ter isso em mente quando for colocar qual template quer renderizar

//a função tem que ser assíncrona pois o processo de busca no banco de dados demora um pouco

//importante a ordem dos parâmetros da função seguir a ordem (req, res)

app.get('/alunos', async (req, res) => {
    const {instrumento} = req.query;
    if (instrumento) {
        const alunos = await Aluno.find({ instrumento });
        console.log(alunos);
        res.render('alunos/index', { alunos, instrumento, instrumentos });

    } else {

        const alunos = await Aluno.find({});
        res.render('alunos/index', { alunos, instrumento, instrumentos });

    }
})

//get request para ir até o formulário para cadastrar um novo aluno

app.get('/alunos/novo', (req, res) => {
    res.render('alunos/novo', { instrumentos });
})

//post request para salva na DB o novo aluno que foi cadastrado

//os dados passados pelo formulário são acessados através do req.body, onde se cria um novo aluno utilizando o modelo 'Aluno'

// a função deve ser assíncrona para esperar o save()

app.post('/alunos', async (req, res) => {
    const novoAluno = new Aluno(req.body);
    novoAluno.idade = idadeAluno(novoAluno.nascimento);
    await novoAluno.save()
    res.redirect('/alunos');
})

//rota para deletar um aluno da base de dados

//feita por meio de um formulário em 'detalhes.ejs' que contém apenas um botão para deletar o aluno escolhido

app.delete('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    const alunoEncontrado = await Aluno.findByIdAndDelete(id);
    res.redirect('/alunos');
})

//put request para editar os dados de um aluno já cadastrado no banco de dados. os dados são enviados para a rota que corresponde aos detalhes do aluno em específico

//runValidators é para fazer a validação de dados que foi definida quando o modelo 'Aluno' foi criado em 'aluno.js'

app.put('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    const alunoEncontrado = await Aluno.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/alunos/${id}`);
})

//get request para acessar um formulário no qual os inputs já têm os valores previamente salvos do aluno, podendo apenas modificar e salvar novamente. Esses dados são enviados para a put request, que atualiza o perfil do aluno

app.get('/alunos/:id/editar', async (req, res) => {
    const { id } = req.params;
    const alunoEncontrado = await Aluno.findById(id);
    res.render('alunos/editar', { alunoEncontrado, instrumentos });
})

//rota para exibir os detalhes do aluno, visto que na página principal aparece apenas o nome

//:id depois do último / significa um padrão da rota a ser seguido, que será substituído pelo ID do aluno do qual se deseja ver detalhes

//se essa rota vier antes do que as outras, o express vai entender que qualquer informação que vem depois do / é o que chamamos de ID e o código não irá funcionar direito

app.get('/alunos/:id', async (req, res) => {

    const { id } = req.params;
    const alunoEncontrado = await Aluno.findById(id);
    res.render('alunos/detalhes', { alunoEncontrado });
})

