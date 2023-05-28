import mongoose from 'mongoose';
//import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type:String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

// const users = [
//     {firstName: "Michael", lastName: "Stefanioros", username: "MugiwaraStef", email: "mstephanioros@gmail.com", password: "1234", role: "admin"},
//     {firstName: "Alexandros", lastName: "Tsaparas", username: "Tsaperlein", email: "up1072824@upnet.gr", password: "5678", role: "admin"}
// ];

// for(let i = 0; i < users.length; i++) {
//     users[i].password = bcrypt.hashSync(users[i].password, 10);
// }

// User.insertMany(users)
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err));

export default { User };