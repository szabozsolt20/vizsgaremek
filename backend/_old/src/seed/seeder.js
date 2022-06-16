const fsp = require('fs').promises;
const { join } = require('path');
const PersonModel = require('../models/person.model');
const UserModel = require('../models/user.model');

module.exports.seed_nested_person = async () => {
    const personJson = await fsp.readFile(
        join(__dirname, 'persons_nested.json'),
        'utf8',
    );
    const persons = JSON.parse(personJson); // mert json-formátumú tömb volt
    await PersonModel.insertMany(persons); // ez nem a MongoDB insertMany()-je(?)
};

module.exports.seed_user = async () => {
    const userJson = await fsp.readFile(
        join(__dirname, 'users.json'),
        'utf8',
    );
    const users = JSON.parse(userJson); // mert json-formátumú tömb volt
    await UserModel.insertMany(users); // ez nem a MongoDB insertMany()-je(?)
};


/* (async () => {
    const personJson = await fsp.readFile(
        join(__dirname, 'persons.json'),
        'utf8',
    );
    const persons = JSON.parse(personJson); // mert json-formátumú tömb volt
    await PersonModel.insertMany(persons); // ez nem a MongoDB insertMany()-je(?)
})(); */