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
    const {
      data: { approved, approvalDate },
    } = await client.query(q.Get(q.Ref(q.Collection('reviews'), ref)))

    if (approved) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `This review has already been approved on ${new Date(
            approvalDate
          ).toDateString()}.`,
        }),
      }
    }

    await client.query(
      q.Update(q.Ref(q.Collection('reviews'), ref), {
        data: {
          approved: true,
          approvalDate: Date.now(),
        },
      })
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Review approved.' }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
