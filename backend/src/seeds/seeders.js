const fsp = require('fs').promises;
const { join } = require('path');
const ProductModel = require('../model/product');
const BookModel = require('../model/book.model');
const BorrowModel = require('../model/borrow.model');
const LibrarianModel = require('../model/librarian.model');
const MemberModel = require('../model/member.model');
const UserModel = require('../model/user.model');

module.exports.product_seeder = async () => {
    const jsonFile = await fsp.readFile(
        join(__dirname, 'products.json'),
        'utf8',
    );
    const list = JSON.parse(jsonFile);
    await ProductModel.insertMany(list);
};

module.exports.book_seeder = async () => {
    const jsonFile = await fsp.readFile(
        join(__dirname, 'books.json'),
        'utf8',
    );
    const list = JSON.parse(jsonFile);
    await BookModel.insertMany(list);
};

module.exports.borrow_seeder = async () => {
    const jsonFile = await fsp.readFile(
        join(__dirname, 'borrows.json'),
        'utf8',
    );
    const list = JSON.parse(jsonFile);
    await BorrowModel.insertMany(list);
};

module.exports.librarian_seeder = async () => {
    const jsonFile = await fsp.readFile(
        join(__dirname, 'librarians.json'),
        'utf8',
    );
    const list = JSON.parse(jsonFile);
    await LibrarianModel.insertMany(list);
};

module.exports.member_seeder = async () => {
    const jsonFile = await fsp.readFile(
        join(__dirname, 'members.json'),
        'utf8',
    );
    const list = JSON.parse(jsonFile);
    await MemberModel.insertMany(list);
};

module.exports.user_seeder = async () => {
    const jsonFile = await fsp.readFile(
        join(__dirname, 'users.json'),
        'utf8',
    );
    const list = JSON.parse(jsonFile);
    await list.forEach(user => {
        const newUser = new UserModel(user);
        newUser.save();
        console.log(newUser);
    });
};




/* 


const newUser = new User({
    email: "dstothert0@instagram.com",
    firstName: "Deina",
    lastName: "Stothert",
    password: "123456"
});

try {
    await newUser.save();
} catch (e) {
    res.statusCode = 401;
    return res.json({ error: 'Database Error!' });
}
console.log(newUser);
return res.json({ message: 'user created' });
 */