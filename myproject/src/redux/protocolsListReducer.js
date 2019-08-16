import {
  PROTOCOL_LIST_SET,
  PROTOCOL_LIST_LOADING,
  PROTOCOL_LIST_ERROR,
  PROTOCOL_LIST_SORT,
  PROTOCOL_ADD,
  PROTOCOL_UPDATE,
  PROTOCOL_DELETE,

} from "./protocolsListAC";

const initState={
  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  dataProtocolsList: null,
  dataDepartments: null,
  dataTeachers: null,
};

function protocolsListReducer(state=initState, action) {
  switch ( action.type ) {

    case PROTOCOL_LIST_LOADING: {
      let newState={
        status:1,
        dataProtocolsList: null,
        dataDepartments: null,
        dataTeachers: null,
      };
      return newState;
    }

    case PROTOCOL_LIST_ERROR: {
      let newState={
        status:2,
        dataProtocolsList: null,
        dataDepartments: null,
        dataTeachers: null,
      };
      return newState;
    }

    case PROTOCOL_LIST_SET: {
      let newState={  ...state,
        status:3,
        dataProtocolsList:action.dataProtocolsList,
        dataDepartments: action.dataDepartments,
        dataTeachers: action.dataTeachers,
        lastProtocolId: action.lastProtocolId,
      };
      return newState;
    }

    case PROTOCOL_ADD: {
      let newState= {
        ...state,
        status:4,
        dataProtocolsList:[ ...state.dataProtocolsList, action.dataProtocol]
      };
      return newState;
    }

    case PROTOCOL_UPDATE: {
      console.log('action: ', action);
      console.log('state до обработки редьюссером: ', state);
        let newState= {
        ...state,
        status:4, // <----- 4 - сохранение данных на сервер
        dataProtocolsList:[ ...state.dataProtocolsList.slice( 0, action.index),
          action.dataProtocol,
          ...state.dataProtocolsList.slice( action.index+1 )
        ]
      };
      console.log('state после обработки редьюссером: ', newState);
      return newState;
    }

    case PROTOCOL_DELETE: {
// ------ содержит весь протокол -> action.dataProtocol
      let protocolList = [...state.dataProtocolsList.slice()];
      protocolList.splice(action.index, 1);
      let newState= {
        ...state,
        status:4, // <----- 4 - сохранение данных на сервер
        dataProtocolsList: protocolList
      };
      return newState;
    }

    case PROTOCOL_LIST_SORT: {
      let newState= {
        ...state,
        status:4,
        dataProtocolsList: action.dataProtocol
      };
      return newState;
    }

    default:
      return state;
  }

}
export default protocolsListReducer;