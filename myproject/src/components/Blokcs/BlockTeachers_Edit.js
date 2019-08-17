import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {block_updateAC} from "../../redux/protocolAC";

class BlockTeachers_Edit extends React.PureComponent {

  static propTypes = {
    department:PropTypes.array,          // ----- из redux
    teachers: PropTypes.array,           // ----- из redux
    data: PropTypes.shape({   // --- получаем от родителя весь блок!!!!!
       blockType: PropTypes.string.isRequired,
       checkedDepartment: PropTypes.string.isRequired,
       checkedTeachers: PropTypes.array.isRequired,
       id: PropTypes.number.isRequired,
     })
    };

  dataChanged = (EO) => {

    let block = this.props.data
    let idCheckedTeacher =  parseFloat(EO.target.name);

    let blockPos = this.props.dataProtocol.indexOf(this.props.dataProtocol.filter(el=> el.blockType === "TEACHERS")[0] )

    let newBlockCheckedTeachers=block.checkedTeachers.slice();
    if(block.checkedTeachers.indexOf(idCheckedTeacher)>=0){
      newBlockCheckedTeachers.splice(block.checkedTeachers.indexOf(idCheckedTeacher), 1)
    }
    else {
      newBlockCheckedTeachers.push(idCheckedTeacher)
    }
    this.props.dispatch(block_updateAC( blockPos, {...block,checkedTeachers:newBlockCheckedTeachers}));  // передать (новый протокол)
  };

  render(){
   //console.log("this.props", this.props)
    let arrDisplay;

    let checkedDepartment = this.props.dataProtocol.filter(el=> el.blockType === "DEPARTMENT")[0].valueDepartment

  //  console.log(checkedDepartment)

     if(checkedDepartment) {
       arrDisplay = this.props.teachers.map((el) => {
         //console.log("el ", el)

         let isChecked = (this.props.data.checkedTeachers.includes(el.id)); // проверка есть ли преподаватель в списки с галочками
        //console.log("el.department ", el.department)
         return (el.department === checkedDepartment) &&

           <label key={el.fio} className="Protocol_Teacher_label">
             <input type="checkbox"
                    name={el.id}
                    defaultChecked={isChecked}
                    onBlur={this.dataChanged}
             /> {el.fio}
           </label>
       })
     }
     else {
      arrDisplay = <span>Выберите кафедру</span>
     }

    return (
      <React.Fragment>

        <div key = "Teachers" className="Protocol_Row">
          <div  className="Protocol_HeadCell" >
            Присутствовали
          </div>
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
    dataProtocol: state.protocol.dataProtocol.protocolBlocks,
    department: state.protocolsList.dataDepartments,
    dataProtocolsList:  state.protocolsList,
    teachers: state.protocolsList.dataTeachers,
  };
};

export default connect(mapStateToProps)(BlockTeachers_Edit);
