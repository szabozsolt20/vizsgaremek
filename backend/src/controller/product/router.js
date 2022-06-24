const express = require('express');
const Product = require('../../model/product');
const controller = require('../base/controller')(Product, ['category']);

const router = express.Router();

// get
router.get('/', (req, res, next) => {
    return controller.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
    return controller.findOne(req, res, next);
});

// patch
router.patch('/:id', (req, res, next) => {
  //console.log(req.params.id, req.body);
    return controller.updateOne(req, res, next);
});

// post
router.post('/', (req, res, next) => {
    
    return controller.create(req, res, next);
});


module.exports = router;

/*
fetch('http://localhost:3000/product', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${temp1.accessToken}`
    },
}).then(r => r.json())
    .then( d => console.log(d) );
*/
