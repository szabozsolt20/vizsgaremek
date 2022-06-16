const Person = require('../../models/person.model');

exports.find = (filter, sort) => Person.find(filter).sort(sort);
// exports.find = (filter, sort) => Person.find(filter, 'vaccine').sort(sort).populate('vaccine');
//https://mongoosejs.com/docs/api.html#model_Model.find

exports.count = filter => Person.countDocuments(filter);

exports.findById = id => Person.findById(id);

exports.deleteMany = filter => Person.deleteMany(filter);

exports.create = personData => {
  const person = new Person(personData);
  return person.save();
};

exports.update = (id, updateData) => Person.findByIdAndUpdate(id, updateData, { new: true }); // new: a régit, vagy az újat adja-e vissza
    // a useFindAndModify:false pedig egy "kötelező" paraméter a videó végi debug szerint.


// ezt még nem haználjuk:
exports.delete = id => Person.findByIdAndRemove(id);




