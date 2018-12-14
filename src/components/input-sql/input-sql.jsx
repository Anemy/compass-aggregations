import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import Store from '../stores';
// import Actions from '../actions';
import StageInput from './stage-input';
import toNS from 'mongodb-ns';

import styles from './input-sql.less';

class InputSqlComponent extends Component {
  static displayName = 'InputSqlComponent';

  static propTypes = {
    query: PropTypes.string,
    namespace: PropTypes.string.isRequired,
    runSqlQuery: PropTypes.func.isRequired
  }

  static defaultProps = {
    query: ''
  }

  constructor(props) {
    super(props);
    this.state = { query: this.props.query };
  }

  handleApply() {
    this.props.runSqlQuery(this.state.query);
  }

  handleReset() {
    this.setState({ query: '' });
    // TODO: Clear the pipeline.
  }

  handleQueryChange = e => {
    this.setState({ query: e.target.value });
  }

  handleSubmit = e => {
    this.props.runSqlQuery(this.state.query);

    e.preventDefault();
  }

  renderQueryBar() {
    return (
      <StageInput
        label="SQL"
        key="query-option-sql"
        value={this.state.query}
        placeholder={`SELECT _id FROM ${toNS(this.props.namespace).collection} LIMIT 20`}
        inputType="string"
        onChange={this.handleQueryChange}
      />
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.inputGroup}>
          <div className={styles.queryInput}>
            {this.renderQueryBar()}
          </div>
          <div className={styles.buttonGroup}>
            <button
              id="apply_button"
              key="apply-button"
              className={styles.applyButton}
              data-test-id="apply-filter-button"
              type="button"
              onClick={this.handleApply.bind(this)}
              disabled={this.state.query.length > 0 ? false : true}>
              Apply
            </button>
            <button
              id="reset_button"
              key="reset-button"
              className={styles.resetButton}
              data-test-id="reset-filter-button"
              type="button"
              onClick={this.handleReset.bind(this)}>
              Reset
            </button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.querybar}>
          <div className={styles.querybarInput}>
            <div className="row">
              <div className="col-md-12">
                {this.renderForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InputSqlComponent;
