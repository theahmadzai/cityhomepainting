const faunadb = require('faunadb')
const mailer = require('./lib/mailer')

const q = faunadb.query

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 410,
      body: JSON.stringify({ message: 'Unsupported Request Method' }),
    }
  }

  try {
    const { slug, rating, name, description } = JSON.parse(event.body)

    if (!slug || !rating || !name || !description) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid input' }),
      }
    }

    const { ref, data: review } = await client.query(
      q.Create(q.Collection('reviews'), {
        data: {
          slug,
          rating,
          name,
          description,
          approved: false,
          date: Date.now(),
        },
      })
    )

    await mailer.sendMail({
      from: `"CityHome Painting" <info@cityhomepainting.com>`,
      to: 'info@cityhomepainting.com',
      subject: `New review posted under ${review.slug} by ${review.name}`,
      html: `Review ${ref.id}:
        <a href="https://cityhomepainting.com/.netlify/functions/get-review?ref=${ref.id}">View</a>
        <a href="https://cityhomepainting.com/.netlify/functions/approve-review?ref=${ref.id}">Approve</a>`,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Review created.' }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
