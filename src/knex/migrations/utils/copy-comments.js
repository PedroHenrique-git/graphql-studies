import { comments } from '../../../../db.json';

export const createDate = (dateIso) => {
  let date = '';

  if (!dateIso) {
    date = new Date();
  } else {
    date = new Date(dateIso);
  }

  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  });
};

export const getDate = (isoDate) => {
  const dateArg = createDate(isoDate);
  const [date, _] = dateArg.split(' ');
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

const commentsForDb = comments.map((comment) => ({
  comment: comment.comment,
  user_id: comment.userId,
  post_id: comment.postId,
  created_at: getDate(comment.createdAt),
}));

export default commentsForDb;

/*
knex('comments')
  .insert(commentsForDb)
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    knex.destroy();
  });
*/
