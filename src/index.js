import AggregationsPlugin from './plugin';
import AggregationsStore from 'stores';
import { Aggregations } from 'components/aggregations';
import StageEditor from 'components/stage-editor';

/**
 * A sample role for the component.
 */
const ROLE = {
  name: 'Mongo-SQL-Aggregations',
  component: AggregationsPlugin,
  order: 2
};

/**
 * Activate all the components in the Aggregations package.

 * @param {Object} appRegistry - The Hadron appRegisrty to activate this plugin with.
 **/
const activate = (appRegistry) => {
  appRegistry.registerRole('Database.Tab', ROLE);
  appRegistry.registerStore('MongoSQLAggregations.Store', AggregationsStore);
};

/**
 * Deactivate all the components in the Aggregations package.

 * @param {Object} appRegistry - The Hadron appRegisrty to deactivate this plugin with.
 **/
const deactivate = (appRegistry) => {
  appRegistry.deregisterRole('Database.Tab', ROLE);
  appRegistry.deregisterStore('MongoSQLAggregations.Store');
};

export default AggregationsPlugin;
export { activate, deactivate, Aggregations, StageEditor };
