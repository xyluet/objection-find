'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const testUtils = require('./utils');

Promise.all(
  _.map(testUtils.testDatabaseConfigs, function(dbConfig, i) {
    const session = testUtils.initialize(dbConfig);

    return testUtils
      .dropDb(session)
      .then(function() {
        return testUtils.createDb(session);
      })
      .then(function() {
        return testUtils.insertData(session, { persons: 10000, pets: 10, movies: 10 }, function(
          progress
        ) {
          console.log(dbConfig.client + ': ' + progress);
        });
      });
  })
).then(function() {
  console.log('all done');
  process.exit();
});
