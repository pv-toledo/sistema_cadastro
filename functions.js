function dataISO (data) {

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = data.match(regex);

    let [, dia, mes, ano] = match;
    return new Date(`${ano}-${mes}-${dia}T00:00:00.000Z`).toISOString();
}

module.exports = {dataISO};