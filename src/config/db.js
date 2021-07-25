require('dotenv').config();

var knex = require('knex')({
	client: `${process.env.CLIENT}`,
	connection: {
		host:`${process.env.HOST}`,
		user:`${process.env.DATA_BASE_USER}`,
		password:`${process.env.PASSWORD}`,
		database:`${process.env.DATABASE}`
	}

});

module.exports = knex;