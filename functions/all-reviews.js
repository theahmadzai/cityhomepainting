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

  const { slug } = event.queryStringParameters

  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid input' }),
    }
  }

  try {
    const { data: reviews } = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('approved_reviews_by_slug'), true, slug)),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    )

    return {
      statusCode: 200,
      body: JSON.stringify(reviews.map(r => r.data)),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
