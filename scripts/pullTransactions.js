#!/usr/bin/env node
nodeprocess = process;

var Transactions = require('../app/services/transactions');
Transactions.fetch()
  .then(function (ts) {
    console.log(JSON.stringify(ts));
  })
  .catch(function (err) {
    console.log(err);
    console.log(err.stack);
  });