exports.registerEmailParams = (email, token) =>{
    return {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: [process.env.EMAIL_TO],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                    <html>
                        <h1>Verify your email address</h1>
                        <p>Please use the following link to complete your registration: </p>
                        <a>${process.env.CLIENT_URL}/auth/activate/${token}</a>
                    </html>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Complete your registration'
            }
        }
    }
}