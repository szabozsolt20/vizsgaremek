const VaccineModel = require('../models/vaccine.model');

module.exports = async () => {
    const vaccines = [
        {
            name: "Astra-Zenaca",
            efficiency: 100,
        },
        {
            name: "Moderna",
            efficiency: 80,
        },
        {
            name: "Pfizer",
            efficiency: 60,
        },
        {
            name: "Sinopharm",
            efficiency: 40,
        },
        {
            name: "Sputnik",
            efficiency: 20,
        }
    ]

    await VaccineModel.insertMany(vaccines); // ez nem a MongoDB insertMany()-je(?)
};


/* (async () => {
    const personJson = await fsp.readFile(
        join(__dirname, 'persons.json'),
        'utf8',
    );
    const persons = JSON.parse(personJson); // mert json-formátumú tömb volt
    await PersonModel.insertMany(persons); // ez nem a MongoDB insertMany()-je(?)
})(); */