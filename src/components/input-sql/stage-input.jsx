import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './stage-input.less';

class StageInput extends PureComponent {
  static displayName = 'StageInput';

  static propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    inputType: PropTypes.oneOf(['string', 'object']).isRequired,
    value: PropTypes.string,
    hasError: PropTypes.bool,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool
  };

  static defaultProps = {
    placeholder: '',
    value: ''
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sqlLabel}>
          {this.props.label}
        </div>
        <input
          id={`querybar-option-input-${this.props.label}`}
          className={styles.input}
          type="text"
          value={this.props.inputType === 'string' ? this.props.value : JSON.stringify(this.props.value)}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
        />
      </div>
    );
  }
}

export default StageInput;
