const express = require('express');
const baseService = require('./service'); // todo esetleg: mappanév!

module.exports = (model, populateList = []) => {
    const service = baseService(model, populateList); // todo esetleg: a 2. sor kihagyása mellett: service =  require('./service')(model, populateList); 
    return {
        findAll(req, res, next) {
            return service.findAll()
                .then(list => res.json(list));
        },
        findOne(req, res, next) {
            return service.findOne(req.params.id)
                .then(entity => res.json(entity));
        },
        updateOne(req, res, next) {
            // console.log(req.params.id, req.body);
            return service.updateOne(req.params.id, req.body)
                .then(entity => res.json(entity))
                .catch(err => {
                    res.statusCode = 501;
                    res.json(err);
                });
        },
        create(req, res, next) {
            return service.create(req.body)
                .then(entity => res.json(entity))
                .catch(err => {
                    res.statusCode = 501;
                    res.json(err);
                });
        },
        // async delete(req, res, next) {
        //     try {
        //         const r = await service.delete(req.params.id);
        //         return r.json(r);
        //     } catch (err) {
        //         res.statusCode = 501;
        //         res.json(err);
        //     }
        // },
        delete(req, res, next) {
            return service.delete(req.params.id)
                .then(r =>console.log(r))
                .catch(err => {
                    res.statusCode = 502;
                    res.json(err);
                });
        },
        search(req, res, next) {
            return service.findAll(req.query)
                .then(list => res.json(list));
        }
    };
};



////////////////////////////////////////////////////////////////
// Régi változat:
// module.exports = (model) => {
//     const service = baseService(model);
//     return {
//         findAll(req, res, next) {
//             return service.findAll()
//                 .then(list => res.json(list));
//         },
//         findOne(req, res, next) {
//             return service.findOne(req.params.id)
//                 .then(entity => res.json(entity));
//         },
//         updateOne(req, res, next) {
//             return service.updateOne(req.params.id, req.body)
//                 .then(entity => res.json(entity))
//                 .catch(err => {
//                     res.statusCode = 501;
//                     res.json(err);
//                 });
//         }
//     };
// };
