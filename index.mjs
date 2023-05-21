import 'dotenv/config.js'
import express from 'express'
import { ExpressHandlebars, engine } from 'express-handlebars'
import { router } from './routes.mjs'
import mongoose from 'mongoose'
import session from 'express-session'
import createMemoryStore from 'memorystore'

const MemoryStore = createMemoryStore(session)

const myAppSession = session({ // session configuration object
    secret: process.env.SESSION_SECRET || 'mysecretkey', // secret key
    store: new MemoryStore({ checkPeriod: 86400000 }), // session store
    resave: false,
    saveUninitialized: true,
    name: "myApp-sid", // if not set, the default name is connect.sid
    cookie: {
        maxAge: 1000 * 60 * 20, // 20 minutes
    }
})

const app = express()

const port = process.env.PORT || 3000;

const dbURI = 'mongodb+srv://MugiwaraStef2:TheFlash01@localleague.iuwbgts.mongodb.net/local-league?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })   // async operation
    .then((result) => app.listen(port, () => console.log(`Server is running in http://localhost:${port}/Local-League/main-page`)))
    .catch((err) => console.log(err));

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(myAppSession); // use the session middleware
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use("/Local-League", router);
app.use((req, res) => {
    res.redirect("/Local-League/main-page")
})