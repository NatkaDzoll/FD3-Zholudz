import React from 'react';
import PropTypes from 'prop-types';
import dataTeachers from '../../dataTeachers';
import {connect} from "react-redux";

class BlockTeachers_Edit extends React.PureComponent {

  static propTypes = {
    checkedDepartment: PropTypes.string.isRequired,
    checkedTeachers: PropTypes.array.isRequired,
    };

  render(){
    //console.log("checkedTeachers", this.props.checkedTeachers )
    let arrDisplay
    if(this.props.checkedTeachers.length>0){
      arrDisplay = dataTeachers.map((el) =>{
        return  (this.props.checkedTeachers.includes(el.id)) &&
          <span className="Protocol_Teacher_label" key={el.fio}> {el.position}, {el.rank} {el.fio}, </span>
      });
    }
    else {
      arrDisplay = <span>{this.props.checkedDepartment}</span>
    }


    return (
      <React.Fragment>
        <div key = "Teachers" className="Protocol_Row">
          <div  className="Protocol_HeadCell" >
            Присутствовали - {this.props.checkedTeachers.length} чел.</div>
          <div className="Protocol_Teachers_box">
          {arrDisplay}
          </div>
          </div>
      </React.Fragment>
    )
  }

}

const mapStateToProps = function (state) {
  return {
    lastSubNum: state.protocol.lastSubNum,
    lastId: state.protocol.lastId,
    blocks: state.protocol.blocks,

  };
};

export default connect(mapStateToProps)(BlockTeachers_Edit);
