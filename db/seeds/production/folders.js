exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 1,
        name: 'Alex Tideman',
        created_at: new Date
      }),
      knex('folders').insert({
        id: 2,
        name: 'Bob Barker',
        created_at: new Date
      })
    ]);
  });
};
