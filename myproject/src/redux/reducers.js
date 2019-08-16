import { combineReducers } from 'redux';
//import blocksReducer from './blocksReducer'
import protocolsListReducer from "./protocolsListReducer";
import protocolReducer from "./protocolReducer";

let combinedReducer = combineReducers({
  //blocks: blocksReducer,    // отвечает за раздел state под именем protocolList
  protocol: protocolReducer,
  protocolsList: protocolsListReducer,
});

export default combinedReducer;