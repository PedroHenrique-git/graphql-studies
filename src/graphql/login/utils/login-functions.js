import { AuthenticationError } from 'apollo-server';

export const checkIfIsLogged = (loggedUserId) => {
  if (!loggedUserId) throw new AuthenticationError('You have to log in');
};

export const checkIfIsOwnerUser = (userId, loggedUserId, message) => {
  checkIfIsLogged(loggedUserId);
  if (userId !== loggedUserId) throw new AuthenticationError(message);
};
