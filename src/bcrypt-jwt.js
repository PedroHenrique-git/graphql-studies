import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

(async () => {
  const password = '123456';
  const passwordHash = await bcrypt.hash(password, 12);

  const userLoggingPassword = '123456';
  const passwordIsValid = await bcrypt.compare(
    userLoggingPassword,
    passwordHash,
  );

  console.log(passwordIsValid);

  const JWT_EXAMPLE_SECRET = process.env.JWT_SECRET;

  const token = jwt.sign(
    {
      userId: '123',
    },
    JWT_EXAMPLE_SECRET,
    { expiresIn: '7d' },
  );

  const verifyToken = jwt.verify(token, JWT_EXAMPLE_SECRET);

  console.log(token);

  const decodedToken = jwt.decode(token);

  console.log(verifyToken);

  console.log(decodedToken);
})();
