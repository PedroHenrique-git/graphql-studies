import { ValidationError } from 'apollo-server';

export const createPostFn = async (postData, dataSource) => {
  const postInfo = await createPostInfo(postData, dataSource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId)
    throw new ValidationError('You have to send title, body and userId');

  return await dataSource.post('', { ...postInfo });
};

export const updatePostFn = async (postId, postData, dataSource) => {
  if (!postId) throw new ValidationError('Missing post id');

  const { title, body, userId } = postData;

  if (postData?.userId) {
    await userExists(postData.userId, dataSource);
  }

  if (typeof title !== 'undefined') {
    if (!title) {
      throw new ValidationError('Title missing');
    }
  }

  if (typeof body !== 'undefined') {
    if (!body) {
      throw new ValidationError('Body missing');
    }
  }

  if (typeof userId !== 'undefined') {
    if (!userId) {
      throw new ValidationError('UserId missing');
    }
  }

  return dataSource.patch(postId, { ...postData });
};

export const deletePostFn = async (postId, dataSource) => {
  if (!postId) throw new ValidationError('Missing post id');

  const deleted = await dataSource.delete(postId);

  console.log('DELETED OBJECT --> ', deleted);

  return !!deleted;
};

const userExists = async (userId, dataSource) => {
  try {
    await dataSource.context.dataSources.userApi.get(userId);
  } catch (err) {
    throw new ValidationError(`User ${userId} does not exist`);
  }
};

const createPostInfo = async (postData, dataSource) => {
  const { title, body, userId } = postData;

  await userExists(userId, dataSource);

  const indexRefPost = await dataSource.get('', {
    _limit: 1,
    sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
