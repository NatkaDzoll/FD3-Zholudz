import React from 'react';


class BlockNumber_Edit extends React.PureComponent {

  render(){
    return (
      <React.Fragment>
        <div key = "Number" className="Protocol_Row">
          <div  className="Protocol_HeadCell" >
            Протокол №{this.props.valueNumber}
          </div>
          <div className="Protocol_Cell"> </div>
        </div>
      </React.Fragment>
    )
  }
}

export default BlockNumber_Edit;