module.exports = (model, populateList = []) => {
    return {
        findAll: (params = {}) => {
            if (Object.keys(params).length) {
                Object.keys(params).map( key => {
                    params[key] = { 
                        $regex: '.*' + params[key] + '.*', 
                        $options: 'i' 
                    };
                });
                return model.find(params).populate(...populateList);
            }
            return model.find(params).populate(...populateList);
        },
        findOne: (id) => model.findById(id).populate(...populateList),
        updateOne: async (id, body) => {
            //console.log(id, body );
            const newEntity = new model(body);
            const error = newEntity.validateSync();
            if (!error) {
                return model.findByIdAndUpdate(id, body, {new: true});
            }
            throw new Error(error);
        },
        create: async (body) => {
            const newEntity = new model(body);
            const error = newEntity.validateSync();
            if (!error) {
                const saved = await newEntity.save(); // a .save() visszadja a mentett adatot // todo estleg: await newEntity.save();
                return model.findById(saved._id);  // return model.findById(newEntity._id);
            }
            throw new Error(error);
        }
    };
};


// régi változat:
// module.exports = (model) => {
//     return {
//         findAll: () => model.find({}),
//         findOne: (id) => model.findById(id),
//         updateOne: async (id, body) => {
//             const newEntity = new model(body);
//             const error = newEntity.validateSync();
//             if (!error) {
//                 return model.findByIdAndUpdate(id, body, {new: true});
//             }
//             throw new Error(error);
//         }
//     };
// };
