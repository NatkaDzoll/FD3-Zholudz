import React from 'react';
import PropTypes from 'prop-types';


class BlockDate_Edit extends React.PureComponent {

  static propTypes = {
    valueDate: PropTypes.string.isRequired,
    };

  render(){

    return (
      <React.Fragment >
        <div key = "Date" className="Protocol_Row">
          <div  className="Protocol_HeadCell" >
            Дата
          </div>
          <div className="Protocol_Cell"> {this.props.valueDate}
          </div>
        </div>
      </React.Fragment>
    )
  }

}

export default BlockDate_Edit;