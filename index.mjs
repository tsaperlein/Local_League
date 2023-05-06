import express from 'express'
import { engine } from 'express-handlebars'
import { router } from './routes.mjs'

const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use("/Local-League", router)

app.use((req, res) => {
    res.redirect("/Local-League/main-page")
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running in http://localhost:${port}`))