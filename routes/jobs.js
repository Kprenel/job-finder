const express = require('express')
const router = express.Router()
const Job = require('../models/Job')


router.get('/add', (req, res) => {
	res.render('add', {style: 'add.css'})
})

router.post('/add', (req, res) => {
	const { 
		title, company, description, 
		salary, new_job 
	} = req.body

	Job.create({
		...req.body
	}).then(() => res.redirect('/'))
	  .catch(err => console.log('not add'))
})

router.get('/view/:id', (req, res) => {
	Job.findOne({
		where: {id: req.params.id}
	}).then(job => {
		res.render('view', {
			job, style: 'view.css'
		})
	}).catch(err => console.log(err));
})

module.exports = router