const express = require('express');
const User = require('../../model/user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();

// post
router.post('/', async (req, res, next) => {
    // const newUser = new User({
    //     email: 'test@test.hu',
    //     lastName: 'Elek',
    //     firstName: 'Test',
    //     password: 'test789',
    // });

    // try {
    //     await newUser.save();
    // } catch(e) {
    //     res.statusCode = 401;
    //     return res.json({error: 'Database Error!'});
    // }

    // return res.json({message: 'user created'});

    // const newUser1 = new User({
    //     email: "dstothert0@instagram.com",
    //     firstName: "Deina",
    //     lastName: "Stothert",
    //     password: "123456"
    // });

    // try {
    //     await newUser1.save();
    // } catch (e) {
    //     res.statusCode = 401;
    //     return res.json({ error: 'Database Error!' });
    // }
    // console.log(newUser1);
    // return res.json({ message: 'user created' });


    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.sendStatus(401);
    }

    // user.password = 'test789';
    await user.save();

    const valid = user.verifyPasswordSync(password);
    if (valid) {
        const accessToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: 1,
        }, 'egynagyontitkosszöveg', {
            expiresIn: '10 days',
        });

        res.json({
            success: true,
            accessToken,
            user: { ...user._doc, password: '' },
        });
    } else {
        return res.sendStatus(401);
    }
});

module.exports = router;

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
