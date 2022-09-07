const { createUser } = require('../../queries/auth');
const { hash } = require('../../utils');
const { register } = require('../../errors/auth');
const errors = require('../../errors/commons');

module.exports = db => async (req, res, next) => {
  const { email, password, first_name, address, role } = req.body;

  const queryResult = await createUser(db)({
    email,
    password: await hash.encrypt(password),
    first_name,
    address,
    role,
  });

  if (!queryResult.ok) return next(register[queryResult.code] || errors[500]);

  const message = 'Gracias por registrarte';

  try {
    await sendEmail({
      email,
      subject: '¡Listo para disfrutar de nuestros planes!',
      message,
    });
  } catch (error) {
    console.log('> error: ', error.message);
  }

  res.status(200).json({
    success: true,
  });
};