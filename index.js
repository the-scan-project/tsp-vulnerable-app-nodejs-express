const { Client } = require('pg')
const express = require('express')

const port = 8080

const client = new Client({
  user: 'postgres',
  password: 'mysecretpassword',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
})
client.connect()

const main = async () => {
  await client.query(`
    create table if not exists users
    (
        id       serial constraint users_pk primary key,
        email    text not null,
        name     text not null,
        password text
    );
    create unique index if not exists users_email_uindex on users (email);
    create unique index if not exists users_id_uindex on users (id);
  `)

  const app = express()

  app.get('/hello', function (req, res) {
    res
      .set('Content-Type', 'text/plain')
      .send(`Hello, ${req.query.name}`)
  })

  app.set('view engine', 'pug')

  app.get('/view', function (req, res) {
    res.render('hello', { name: req.query.name })
  })

  app.get('/user/:id', async function (req, res) {
    try {
      const user = await client.query(`select *
                                       from users
                                       where id = $1`, [req.params.id])
      res.send(user.rows[0])
    } catch (e) {
      console.error(e.message)
      res.send({ 'error': e.message })
    }
  })

  app.listen(port)

  return `Listening on port ${port}`
}

main()
  .then(console.log)
  .catch(console.error)
