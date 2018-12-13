import bson from 'bson';
import mysql from 'mysql';
import toNS from 'mongodb-ns';

import { createPipeline } from './import-pipeline';
import { runStage } from './pipeline';
import { LOAD_PIPELINE } from './index';

export function runSqlQuery(query) {
  return (dispatch, getState) => {
    const state = getState();
    const connection = mysql.createConnection({
      host: 'localhost',
      port: '3307',
      database: toNS(state.namespace).database
    });

    connection.connect(); // explain format = traditional query // explain format = json query
    const explainQuery = `explain extended ${query}`;
    connection.query(explainQuery, (error, results) => {
      if (error) {
        console.log(error);
        dispatch({
          type: LOAD_PIPELINE,
          pipeline: [{
            id: new bson.ObjectId().toHexString(),
            isSqlError: `Error running query: ${error}`
          }]
        });
      } else {
        console.log('Got pipeline', results[0].pipeline);

        // Load in the pipeline stages.
        dispatch({
          type: LOAD_PIPELINE,
          pipeline: results[0].pipeline ? createPipeline(results[0].pipeline) : []
        });

        // Execute aggregation.
        dispatch(runStage(0));

        connection.end();
      }
    });
  };
}
