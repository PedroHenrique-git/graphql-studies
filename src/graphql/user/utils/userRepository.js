import { ValidationError } from 'apollo-server';

export const createUserFn = async (userData, dataSource) => {
  const userInfo = await createUserInfo(userData, dataSource);
  const { firstName, lastName, userName } = userInfo;

  if (!isNameValid(firstName, lastName)) {
    throw new ValidationError('First name or last name invalid');
  }

  if (!firstName || !lastName || !userName)
    throw new ValidationError(
      'You have to send firstName, lastName and userName',
    );

  return dataSource.post('', userInfo);
};

export const updateUserFn = async (userId, userData, dataSource) => {
  if (!userId) throw new ValidationError('Missing userId');

  const { firstName, lastName, userName } = userData;
  const userAlreadyExists = await userExists(userName, dataSource);

  if (userAlreadyExists) throw new ValidationError('User already exists');

  validateField(firstName, 'firstName');
  validateField(lastName, 'lastName');
  validateField(userName, 'userName');

  if (!isNameValid(firstName, lastName)) {
    throw new ValidationError('First name or last name invalid');
  }

  return dataSource.patch(userId, userData);
};

export const deleteUserFn = async (userId, dataSource) => {
  if (!userId) throw new ValidationError('Missing userId');
  return !!(await dataSource.delete(userId));
};

export const createUserInfo = async (userData, dataSource) => {
  const { userName } = userData;
  const userAlreadyExists = await userExists(userName, dataSource);

  if (userAlreadyExists) throw new ValidationError('User already exists');

  const indexRefUser = await dataSource.get('', {
    _limit: 1,
    sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefUser[0].indexRef + 1;

  const userObject = {
    ...userData,
    indexRef,
    createdAt: new Date().toISOString(),
  };

  return userObject;
};

const isNameValid = (firstName, lastName) => {
  const fullName = firstName + ' ' + lastName;

  if (fullName.match(/[^a-zA-Z ]/gi)) return false;

  return true;
};

export const userExists = async (userName, dataSource) => {
  const users = await dataSource.get('', {
    userName,
  });

  return users.length > 0;
};

const validateField = (fieldValue, fieldName) => {
  if (typeof fieldValue !== 'undefined' && !fieldValue)
    throw new ValidationError(`Missing field ${fieldName}`);
};
