const faunadb = require('faunadb')

const q = faunadb.query

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = async event => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 410,
      body: JSON.stringify({ message: 'Unsupported Request Method' }),
    }
  }

  const { ref } = event.queryStringParameters

  if (!ref) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid input' }),
    }
  }

  try {
    const { data: review } = await client.query(
      q.Get(q.Ref(q.Collection('reviews'), ref))
    )

    return {
      statusCode: 200,
      body: JSON.stringify(review),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
