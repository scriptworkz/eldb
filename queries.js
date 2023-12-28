const Pool = require('pg').Pool
const pool = new Pool({
  user: 'event_location_db_user',
  host: 'dpg-cm6uf7un7f5s73cbb0j0-a',
  database: 'event_locations_db',
  password: 'Et39sHuVSh5SQgLKooXmKHumFigYUhO7',
  port: 5432,
});

const getEvents = (request, response) => {
    pool.query('SELECT * FROM events ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getEventById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM events WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const createEvent = (request, response) => {
    const { name, when, where, enabled } = request.body
  
    pool.query('INSERT INTO events (name, when, where, enabled) VALUES ($1, $2) RETURNING *', [name, when, where, enabled], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Event added with ID: ${results.rows[0].id}`)
    })
  }

const updateEvent = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, when, where, enabled } = request.body
  
    pool.query(
      'UPDATE events SET name = $1, when = $2, where = $3, enabled = $4 WHERE id = $5',
      [name, when, where, enabled, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Event modified with ID: ${id}`)
      }
    )
  }

  module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent
  }