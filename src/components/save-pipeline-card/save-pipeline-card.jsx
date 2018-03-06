import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RestoreButton from 'components/restore-pipeline-button';
import DeleteButton from 'components/delete-pipeline-button';

import styles from './save-pipeline-card.less';

/**
 * saved pipelines card
 */
class SavePipelineCard extends PureComponent {
  static displayName = 'SavePipelineCardComponent';

  static propTypes = {
    restorePipelineModalToggle: PropTypes.func.isRequired,
    restorePipelineObjectID: PropTypes.func.isRequired,
    deletePipeline: PropTypes.func.isRequired,
    objectID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  state = {
    isVisible: false
  }

  handleDelete = () => {
    this.props.deletePipeline(this.props.objectID);
  }

  handleMouseMovement = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }

  restoreClickHandler = () => {
    this.props.restorePipelineObjectID(this.props.objectID);
    this.props.restorePipelineModalToggle(1);
  }

  /**
   * Render a pipeline card.
   *
   * @returns {Component} The component.
   */
  render() {
    const openView = this.state.isVisible
      ? <RestoreButton clickHandler={this.restoreClickHandler} />
      : null;
    const deleteButton = this.state.isVisible
      ? <DeleteButton clickHandler={this.handleDelete} />
      : null;
    return (
      <div
        className={classnames(styles['save-pipeline-card'])}
        onMouseEnter={this.handleMouseMovement}
        onMouseLeave={this.handleMouseMovement}
        data-pipeline-object-id={this.props.objectID}>
        <div className={classnames(styles['save-pipeline-card-title'])}>
          {this.props.name}
        </div>
        { openView }
        { deleteButton }
      </div>
    );
  }
}

export default SavePipelineCard;
