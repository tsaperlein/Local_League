import express from 'express'
import { ExpressHandlebars, engine } from 'express-handlebars'
import { router } from './routes.mjs'
import mongoose from 'mongoose'

const app = express()

const port = process.env.PORT || 3000;

const dbURI = 'mongodb+srv://MugiwaraStef2:TheFlash01@localleague.iuwbgts.mongodb.net/local-league?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })   // async operation
    .then((result) => app.listen(port, () => console.log(`Server is running in http://localhost:${port}/Local-League/main-page`)))
    .catch((err) => console.log(err));

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use("/Local-League", router);

// app.use((req, res) => {
//     res.redirect("/Local-League/main-page")
// })