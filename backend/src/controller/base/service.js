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
        },
        delete: async (id) => {
            return await model.findByIdAndDelete(id);
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

/*
fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: '{"email": "test@test.hu", "password": "test789"}',
}).then(r => r.json())
    .then( d => console.log(d) );
*/
/*
fetch('http://localhost:3000/user/62b4d90d595e960ad847c46e', {
    method: 'DELETE',
    body: '{"email": "test@test.hu", "password": "test789"}',
}).then(r => r.json())
    .then( d => console.log(d) );
*/
