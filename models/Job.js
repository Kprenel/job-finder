const Sequelize = require('sequelize')
const db = require('../db/connection')

const Job = db.define('jobs', {
	title: {
		type: Sequelize.STRING
	},
	company: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	salary: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	new_job: {
		type: Sequelize.STRING
	}
})

module.exports = Job