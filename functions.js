//função para calcular a idade de um aluno no dia atual com base na dada de nascimento inserida no formulário de cadastro

function idadeAluno (data) {
    let [dia, mes, ano] = data.split('/'); //separa a string em três partes
    let dataConvertida = new Date(`${ano}-${mes}-${dia}T00:00:00Z`); //converte para o modelo Date com a hora igual a meia noite
    let hoje = new Date(Date.now()); //pega a data de hoje

    let idade = hoje.getFullYear() - dataConvertida.getFullYear(); //subtração entre o ano completo de hoje e o ano completo de nascimento do aluno

    if (hoje.getMonth() < dataConvertida.getMonth() || (hoje.getMonth() === dataConvertida.getMonth() && hoje.getDate() < dataConvertida.getDate())) { //se não estiver no mês de aniversário do aluno ou, se estivermos e o dia de hoje for menor que o dia de aniversário, subtrai 1 da idade calculada, pois o aninversário do ano corrente ainda não aconteceu
        idade --;
    }

    return idade
}

function primeiraLetraMaiuscula (txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1)
}
module.exports = {idadeAluno, primeiraLetraMaiuscula};