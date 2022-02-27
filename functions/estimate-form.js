const parser = require('lambda-multipart-parser')
const mailer = require('./lib/mailer')

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 410,
      body: JSON.stringify({ message: 'Unsupported Request Method' }),
    }
  }

  try {
    const {
      firstname,
      lastname,
      phone,
      email,
      address,
      street,
      city,
      zipcode,
      state,
      description,
      files,
    } = await parser.parse(event)

    if (
      !firstname ||
      !lastname ||
      !phone ||
      !address ||
      !street ||
      !city ||
      !zipcode ||
      !state ||
      !description
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid input' }),
      }
    }

    await mailer.sendMail({
      from: `"CityHome Painting" <info@cityhomepainting.com>`,
      to: 'info@cityhomepainting.com',
      replyTo: email,
      subject: `Estimate form submitted by ${firstname}`,
      text: `
        First Name: ${firstname}\n
        Last Name: ${lastname}\n
        Phone: ${phone}\n
        Email: ${email ?? '--'}\n
        Address: ${address}\n
        Street: ${street}\n
        City: ${city}\n
        Zip Code: ${zipcode}\n
        State: ${state}\n
        Description: ${description}
      `,
      attachments: files,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent.' }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
