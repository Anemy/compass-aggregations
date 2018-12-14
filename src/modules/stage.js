import parser from 'mongodb-query-parser';
import decomment from 'decomment';
import { parse } from 'mongodb-stage-validator';

const removeSQLSyntax = s => {
  // Only sanitize strings.
  if (!(typeof s === 'string' || s instanceof String)) {
    return s;
  }

  let string = s;

  while (string.indexOf('NumberLong(') > -1) {
    const index = string.indexOf('NumberLong(');
    const prenumber = string.substring(0, index);
    const number = string.substring(index + 11, string.indexOf(')', index));
    const postnumber = string.substring(string.indexOf(')', index) + 1);

    string = prenumber + number + postnumber;
  }

  return string;
};

/**
 * Generates an Object representing the stage to be passed to the DataService.
 *
 * @param {Object} state - The state of the stage.
 *
 * @returns {Object} The stage as an object.
 */
export function generateStage(state) {
  if (!state.isEnabled || !state.stageOperator || state.stage === '') {
    return {};
  }
  const stage = {};
  try {
    const decommented = decomment(state.stage);

    const sqlSanitized = removeSQLSyntax(decommented);

    parse(`{${state.stageOperator}: ${sqlSanitized}}`);
    stage[state.stageOperator] = parser(sqlSanitized);
  } catch (e) {
    state.syntaxError = e.message;
    state.isValid = false;
    state.previewDocuments = [];
    return {};
  }
  state.isValid = true;
  state.syntaxError = null;
  return stage;
}

export function generateStageAsString(state) {
  if (!state.isEnabled || !state.stageOperator ||
    state.stage === '') {
    return '{}';
  }
  let stage;
  try {
    const decommented = decomment(state.stage);
    stage = `{${state.stageOperator}: ${decommented}}`;
    parse(stage); // Run the parser so we can error check
  } catch (e) {
    state.syntaxError = e.message;
    state.isValid = false;
    state.previewDocuments = [];
    return '{}';
  }
  state.isValid = true;
  state.syntaxError = null;
  return stage;
}
