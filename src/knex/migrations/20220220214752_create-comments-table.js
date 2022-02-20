/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.text('comment', 255).notNullable();
    table.string('post_id', 255).notNullable();
    table.string('index_ref', 255).notNullable();
    table.string('user_id', 255).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = async function (knex) {
  return knex.schema.dropTable('comments');
};
