exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('folders', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.timestamps();
        }),

        knex.schema.createTable('urls', function(table){
            table.increments('id').primary();
            table.string('url');
            table.string('folder_id');
            table.string('shortUrl');
            table.integer('clicks')

            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('urls'),
        knex.schema.dropTable('folders')
    ])
};
