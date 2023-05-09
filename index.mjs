import express from 'express'
import { engine } from 'express-handlebars'
import { router } from './routes.mjs'
import mongoose from 'mongoose'

const app = express()

const dbURI = 'mongodb+srv://MugiwaraStef2:TheFlash01@localleague.iuwbgts.mongodb.net/local-league?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })   // async operation
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use("/Local-League", router);

// app.use((req, res) => {
//     res.redirect("/Local-League/main-page")
// })