import React from 'react';
import PropTypes from 'prop-types';
import dataDepartments from '../../dataDepartments'

class BlockDepartment_Edit extends React.PureComponent {

  static propTypes = {
    valueDepartment: PropTypes.string.isRequired,
    };

  state = {
  };

  render(){
    // --------- ПОДСТАВЛЯЕМ ПОЛНОЕ НАЗВАНИЕ КАФЕДРЫ ----------------- //
    let departmentName = dataDepartments.map((el) => {
      if(el.code === this.props.valueDepartment){
        return el.name
      }
      return null
    });

    return (
      <React.Fragment >
        <div key = "Department" className="Protocol_Row">
          <div  className="Protocol_HeadCell" >
            Заседание кафедры <div className="Protocol_HeadCell"> «{departmentName}» </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default BlockDepartment_Edit;