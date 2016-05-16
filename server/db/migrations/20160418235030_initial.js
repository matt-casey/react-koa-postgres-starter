/* eslint-disable */
var Promise = require('bluebird');

exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function (table) {
    table.increments();
    table.text('email').notNullable().unique();
    table.boolean('email_verified').notNullable().defaultTo(false);
    table.text('password');
		table.text('phone_number');
    table.text('name');
    table.text('avatar_url');
		table.jsonb('details');
    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable();
    table.timestamp('updated_at').defaultTo(knex.raw('now()')).notNullable();
  })
	.then(function () {
		return knex.schema.createTable('refresh_tokens', function (table) {
	    table.increments();
	    table.text('token');
	    table.text('name');
			table.integer('user_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE').notNullable();
	    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable();
	    table.timestamp('updated_at').defaultTo(knex.raw('now()')).notNullable();
	  })
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('refresh_tokens')
		.then(function () {
			return knex.schema.dropTable('users')
		})
};
