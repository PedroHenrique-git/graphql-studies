import { ValidationError } from 'apollo-server-core';
import { SQLDataSource } from '../globalDatasources/sql/sql-datasource';
import { CREATED_COMMENT_TRIGGER, pubSub } from './resolvers';

const commentReducer = (comment) => {
  return {
    id: comment.id,
    comment: comment.comment,
    user_id: comment.user_id,
    createdAt: new Date(comment.created_at).toISOString(),
  };
};

export class CommentSQLDataSource extends SQLDataSource {
  async getById(id) {
    return this.db('comments').where('id', '=', id);
  }

  async getByPostId(postId) {
    const query = await this.db('comments').where({ post_id: postId });
    const comments = await query;
    return comments.map((comment) => commentReducer(comment));
  }

  async create({ userId, postId, comment }) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    };

    const exists = await this.db('comments').where(partialComment);

    if (exists.length > 0) throw new ValidationError('Comment already created');

    const created = await this.db('comments').insert(partialComment);

    const commentToReturn = {
      id: created[0],
      createdAt: new Date().toISOString(),
      ...partialComment,
    };

    pubSub.publish(CREATED_COMMENT_TRIGGER, {
      createdComment: commentToReturn,
    });

    return commentToReturn;
  }

  async batchLoaderCallback(postIds) {
    const query = this.db('comments').whereIn('post_id', postIds);
    const comments = await query;
    const filteredComments = postIds.map((postId) => {
      return comments
        .filter((comment) => String(comment.post_id) === String(postId))
        .map((comment) => commentReducer(comment));
    });
    return filteredComments;
  }
}
