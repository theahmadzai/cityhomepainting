const mailer = require('./lib/mailer')

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 410,
      body: JSON.stringify({ message: 'Unsupported Request Method' }),
    }
  }

  try {
    const { name, email, phone, message } = JSON.parse(event.body)

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid input' }),
      }
    }

    console.log('HERE')
    await mailer.sendMail({
      from: `"CityHome Painting" <info@cityhomepainting.com>`,
      to: 'info@cityhomepainting.com',
      replyTo: email,
      subject: `Contact form submitted by ${name}`,
      text: `
        Name: ${name}\n
        Phone: ${phone ?? '--'}\n
        Email: ${email}\n
        Message: ${message}
      `,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent.' }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    }
  }
}
