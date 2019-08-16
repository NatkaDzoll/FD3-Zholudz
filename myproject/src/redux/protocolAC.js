const PROTOCOL_SET='PROTOCOL_SET';
const PROTOCOL_REDACT='PROTOCOL_REDACT';
const PROTOCOL_PREVIEW='PROTOCOL_PREVIEW';
const PROTOCOL_CREATE='PROTOCOL_CREATE';


const BLOCK_CREATE='BLOCK_CREATE';
const BLOCK_DELETE='BLOCK_DELETE';
const BLOCK_UPDATE='BLOCK_UPDATE';
//------------- устанавливаем протокол (редактирвание или создание нового)

const protocol_setAC = function(_workMode, _data, _subNumber) {
 // console.log(_subNumber)
  return {
    type: PROTOCOL_SET,
    workMode: _workMode,
    dataProtocol: _data,
    lastSubNumber: _subNumber,
  };
};
const protocol_createAC = function(_workMode) {
  return {
    type: PROTOCOL_CREATE,
    workMode: _workMode,
  };
};

const protocol_previewAC = function() {
  return {
    type: PROTOCOL_PREVIEW,
  };
};
const protocol_redactAC = function() {
  return {
    type: PROTOCOL_REDACT,
  };
};

// ----------------------------------------------------------------------------------

const block_createAC = function(_block,_pos) {
  return {
    type: BLOCK_CREATE,
    block: _block,
    addPosition:_pos,

  };
};

const block_deleteAC = function(_id) {
  return {
    type: BLOCK_DELETE,
    id:_id,
  };
};

const block_updateAC = function(_id, _block) {
  return {
    type: BLOCK_UPDATE,
    blockPos:_id,
    newBlock:_block,
  };
};

export {
  protocol_setAC, PROTOCOL_SET,
  protocol_redactAC, PROTOCOL_REDACT,
  protocol_previewAC, PROTOCOL_PREVIEW,
  protocol_createAC, PROTOCOL_CREATE,

  block_createAC, BLOCK_CREATE,
  block_deleteAC, BLOCK_DELETE,
  block_updateAC, BLOCK_UPDATE,

}
