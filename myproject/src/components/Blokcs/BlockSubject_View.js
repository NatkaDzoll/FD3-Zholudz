import React from 'react';
import PropTypes from 'prop-types';

class BlockSubject_Edit extends React.PureComponent {

  static propTypes = {
    subData: PropTypes.object.isRequired,
  };

  render(){
    let subject = (
      <div key={this.props.subNumber} className="Protocol_Row">
        <div className="Protocol_HeadCell">СЛУШАЛИ ВОПРОС  </div>

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
    );

    return (
      <React.Fragment>
       {subject}
      </React.Fragment>
    )
  }
}

export default BlockSubject_Edit;