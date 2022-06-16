const Vaccine = require('../../models/vaccine.model');

exports.create = vaccineData => {
  const vaccine = new Vaccine(vaccineData);
  return vaccine.save();
};

exports.findOne = filter => {
  return Vaccine.findOne(filter);
};