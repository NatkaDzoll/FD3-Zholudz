const PROTOCOL_LIST_SET='PROTOCOL_LIST_SET';
const PROTOCOL_ADD='PROTOCOL_ADD';
const PROTOCOL_LIST_LOADING ='PROTOCOL_LIST_LOADING';
const PROTOCOL_LIST_ERROR ='PROTOCOL_LIST_ERROR';
const PROTOCOL_LIST_SORT ='PROTOCOL_LIST_SORT';

const PROTOCOL_UPDATE='PROTOCOL_UPDATE';
const PROTOCOL_DELETE='PROTOCOL_DELETE'

const protocol_list_loadingAC = function() {
  return {
    type: PROTOCOL_LIST_LOADING,
  };
};

const protocol_list_errorAC = function() {
  return {
    type: PROTOCOL_LIST_ERROR,
  };
};

const protocol_list_setAC = function(_protocolsList, _departments,_teachers, _lastProtocolId) {
  return {
    type: PROTOCOL_LIST_SET,
    dataProtocolsList: _protocolsList,
    dataDepartments: _departments,
    dataTeachers: _teachers,
    lastProtocolId: _lastProtocolId,
  };
};

const protocol_addAC = function(_protocolsList){
  return{
    type: PROTOCOL_ADD,
    dataProtocol: _protocolsList,
  };
};
const protocol_updateAC = function(_protocolsList, _index){
  return{
    type: PROTOCOL_UPDATE,
    dataProtocol: _protocolsList,
    index: _index,
  };
};

const protocol_deleteAC = function(_index){
  return{
    type: PROTOCOL_DELETE,
    index: _index,
  };
};

const protocol_list_sortAC = function(_protocolsList){
  return{
    type: PROTOCOL_LIST_SORT,
    dataProtocol: _protocolsList,
  };
};

export {
  protocol_list_loadingAC, PROTOCOL_LIST_LOADING,
  protocol_list_setAC, PROTOCOL_LIST_SET,
  protocol_list_errorAC, PROTOCOL_LIST_ERROR,
  protocol_list_sortAC, PROTOCOL_LIST_SORT,

  protocol_addAC, PROTOCOL_ADD,
  protocol_updateAC, PROTOCOL_UPDATE,
  protocol_deleteAC, PROTOCOL_DELETE,
}
