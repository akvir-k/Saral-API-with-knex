
const env= require('dotenv').config()
const option={
    client: 'mysql',
    connection:{
        host:process.env.host,
        user:process.env.username,
        password: process.env.password,
        database:process.env.db_name
    }
}
const knex= require('knex')(option);

module.exports= knex
