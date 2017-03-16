exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: 123,
        url: "http://www.hamburgers.com",
        created_at: new Date
      }),
      knex('urls').insert({
        id: 358,
        url: "http://www.potatoes.com",
        created_at: new Date
      }),
      knex('urls').insert({
        id: 599,
        url: "http://www.pizza.com",
        created_at: new Date
      })
    ]);
  });
};
