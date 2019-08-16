import {
  PROTOCOL_SET,
  PROTOCOL_REDACT,
  PROTOCOL_PREVIEW,
  PROTOCOL_CREATE,

  BLOCK_CREATE,
  BLOCK_DELETE,
  BLOCK_UPDATE,
} from "./protocolAC";

const initState={
  lastId: 1005,
  lastSubNum:0,
  title: "Создать новый протокол",
  redacting: false,

  dataProtocol:{
    protocolBlocks: [
      {
        "id":1001,
        "blockType":"DATE",
        "valueDate": ""
      },

      {
        "id":1002,
        "blockType": "NUMBER",
        "valueNumber": "",
      },
      {
        "id":1003,
        "blockType": "DEPARTMENT",
        "valueDepartment": "",
      },
      {
        "id":1004,
        "blockType": "TEACHERS",
        "checkedDepartment": "",
        "checkedTeachers": []
      },
      {
        "id":1005,
        "blockType":"SUBJECT",
        "subNumber": 1,
        "subData": {
          "topicSubject": "",
          "informationFrom": "",
          "textSubject": "",
          "textDecision": "",
        }
      },
    ]
  }
};

function protocolReducer(state=initState, action) {
  switch ( action.type ) {

//----------- РЕДАКТИРОВАНИЕ PROTOCOL ----------------------
    case PROTOCOL_SET: {
     // console.log('action: ', action);
     // console.log('state до обработки редьюссером: ', state);
      let newState= { ...state,
        status:0,
        redacting: false,
        dataProtocol: action.dataProtocol,
        title: "Редактировать протокол",
      };
     // console.log('state после обработки редьюссером: ', newState);
      return newState;
    }

    case PROTOCOL_CREATE: {
     //console.log('action: ', action);
    // console.log('state до обработки редьюссером: ', state);
      let newState= { ...state,
        redacting: false,
        title: "Создать новый протокол",
        dataProtocol:{
          protocolBlocks: [
            {
              "id":1001,
              "blockType":"DATE",
              "valueDate": ""
            },

            {
              "id":1002,
              "blockType": "NUMBER",
              "valueNumber": "",
            },
            {
              "id":1003,
              "blockType": "DEPARTMENT",
              "valueDepartment": "",
            },
            {
              "id":1004,
              "blockType": "TEACHERS",
              "checkedDepartment": "",
              "checkedTeachers": []
            },
            {
              "id":1005,
              "blockType":"SUBJECT",
              "subNumber": 1,
              "subData": {
                "topicSubject": "",
                "informationFrom": "",
                "textSubject": "",
                "textDecision": "",
              }
            },

          ]
        }
      };
      //console.log('state после обработки редьюссером: ', newState);
      return newState;
    }

    case PROTOCOL_REDACT: {
      let newState= {
        ...state,
      };
      return newState;
    }

    case PROTOCOL_PREVIEW: {
      let newState= {
        ...state,
      };

      return newState;
      }



//----------- РЕДАКТИРОВАНИЕ BLOCK ----------------------

    case BLOCK_CREATE: {
      // НАДО СОЗДАТЬ НОВЫЙ БЛОК
      // редьюсер ВСЕГДА должен возвращать новый state а не изменять старый!
     // console.log('action: ', action);
     // console.log('state до обработки редьюссером: ', state);

      let newBlock ={lastId:state.lastId+1,...action.block };
      let newState= {
        ...state,
        redacting: true,
        id: state.lastId+1,
        dataProtocol: {
          ...state.dataProtocol, protocolBlocks: [...state.dataProtocol.protocolBlocks.slice(0, action.addPosition), newBlock],
          ...state.dataProtocol.protocolBlocks.slice(action.addPosition)
        },
      };
     // console.log('state после обработки редьюссером: ', newState);
      return newState;
    }

    case BLOCK_DELETE: {
     // console.log('action: ', action);
      //console.log('state до обработки редьюссером: ', state);

      let newState= {
        ...state,
        redacting: true,
        lastId: state.lastId+1,
        dataProtocol: {
          ...state.dataProtocol,
          protocolBlocks: [...state.dataProtocol.protocolBlocks.filter((el) => el.id !== action.id)]
        },
      };
      //console.log('state после обработки редьюссером: ', state);
      return newState;
    }

    case BLOCK_UPDATE: {
     // console.log('action: ', action);
     // console.log('state до обработки редьюссером: ', state);

      let newProtocolBlocks=[...state.dataProtocol.protocolBlocks];
     // console.log(newProtocolBlocks)
      newProtocolBlocks[action.blockPos ]=action.newBlock;

      let newState= {
      ...state,
        redacting: true,
        dataProtocol:{...state.dataProtocol, protocolBlocks: newProtocolBlocks }};

      return newState;

    }
    default:
      return state;
  }

}
export default protocolReducer;