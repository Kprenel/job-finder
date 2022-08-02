const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const db = require(path.join(__dirname, 'db/connection'))
const Job = require(path.join(__dirname, 'models/Job'))
const { Op } = require('sequelize')

const PORT = process.env.PORT || 3000


app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs.engine({
	defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')


db.authenticate(() => {
	console.log('Conectado ao db')
}).catch(err => console.log(err))


app.get('/', (req, res) => {
	const search = req.query.search
	const query = '%' + search + '%'

	if(search) {
		Job.findAll({
			where: {title: {[Op.like]: query}}
		}).then(jobs => {
			res.render('index', {
				jobs, search, style: 'index.css'
			})
		})
	} else {
		Job.findAll().then(jobs => {
			res.render('index', {
				jobs, style: 'index.css'
			})
		}).catch(err => console.log(err))
	}
})

app.use('/jobs', require(path.join(__dirname, 'routes/jobs')))


app.listen(PORT, () => console.log('Servidor ligado'))