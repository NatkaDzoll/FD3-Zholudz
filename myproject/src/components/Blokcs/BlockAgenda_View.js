import React from 'react';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";

class BlockAgenda_View extends React.PureComponent {

  static propTypes = {
    subNumber: PropTypes.number.isRequired,
    subData: PropTypes.object.isRequired,
  };

  render(){
    return (
      <React.Fragment>
        <div key={this.props.subNumber} className="Protocol_Row">
          <div className="Protocol_HeadCell">СЛУШАЛИ ВОПРОС №{this.props.subNumber}  </div>

          <div className="Protocol_Row">Тема:
            <span className="textareaList">{this.props.subData.topicSubject}</span>
          </div>

          <div className="Protocol_Row">
            <span className="textareaList">{this.props.subData.textSubject}</span>
          </div>

          <div className="Protocol_Row"> Решили:
            <span className="textareaList">{this.props.subData.textDecision}
            </span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = function (state) {
  return {
    lastId: state.protocolList.lastId,
    blocks: state.protocolList.blocks,
  };
};

export default connect(mapStateToProps)(BlockAgenda_View);
