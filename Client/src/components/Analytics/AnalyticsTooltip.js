import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

class AnalyticsTooltip extends React.Component {
  state = {
    open: false,
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
        <ClickAwayListener onClickAway={this.handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={this.handleTooltipClose}
              open={this.state.open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={this.props.tooltipDesc}
              placement="top"
            >
              <i className="fa fa-question-circle" onClick={this.handleTooltipOpen}></i>
            </Tooltip>
        </ClickAwayListener>
    );
  }
}

export default AnalyticsTooltip;