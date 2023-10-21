exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", function (table) {
    table
      .integer("movie_id")
      .unsigned()
      .references("movie_id")
      .inTable("movies");
    table
      .integer("theater_id")
      .unsigned()
      .references("theater_id")
      .inTable("theaters");
    table.boolean("is_showing");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
