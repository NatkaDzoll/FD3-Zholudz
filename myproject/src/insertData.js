import dataProtocol from "./dataProtocol"
import dataDepartments from"./dataDepartments"
import dataTeachers from "./dataTeachers"

function sendDep() {

  "use strict";

  const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
  let JSONDep = JSON.stringify(dataDepartments);

  // отдельно создаём набор POST-параметров запроса
  let sp = new URLSearchParams();
  sp.append('f', 'INSERT');
  sp.append('n', 'ZHOLUD_PR_DEPARTMENT');
  sp.append('v', JSONDep);

  fetch(ajaxHandlerScript, { method: 'post', body: sp })
    .then( response => response.json() )
    .then( data => { console.log(data); } )
    .catch( error => { console.error(error); } );

}
function sendTeachers() {
const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";

let JSONTeach= JSON.stringify(dataTeachers);

// отдельно создаём набор POST-параметров запроса
let sp = new URLSearchParams();
sp.append('f', 'INSERT');
sp.append('n', 'ZHOLUD_PR_TEACHERS');
sp.append('v', JSONTeach);

fetch(ajaxHandlerScript, { method: 'post', body: sp })
  .then( response => response.json() )
  .then( data => { console.log(data); } )
  .catch( error => { console.error(error); } );

}
function sendProtocols() {

  "use strict";

  const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";

  let JSONProtocol = JSON.stringify(dataProtocol);

  // отдельно создаём набор POST-параметров запроса
  let sp = new URLSearchParams();
  sp.append('f', 'INSERT');
  sp.append('n', 'ZHOLUD_PR_PROTOCOLS');
  sp.append('v', JSONProtocol);

  fetch(ajaxHandlerScript, { method: 'post', body: sp })
    .then( response => response.json() )
    .then( data => { console.log(data); } )
    .catch( error => { console.error(error); } );

}


function sendUpdateProtocols() {

  "use strict";

  const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
  let  updatePassword = Math.random();
  let JSONProtocol = JSON.stringify(dataProtocol);

  // отдельно создаём набор POST-параметров запроса LOCKGET
  let spLock = new URLSearchParams();
  spLock.append('f', 'LOCKGET');
  spLock.append('n', 'ZHOLUD_PR_PROTOCOLS');
  spLock.append('p', updatePassword);

  // отдельно создаём набор POST-параметров запроса UPDATE
  let sp = new URLSearchParams();
  sp.append('f', 'UPDATE');
  sp.append('n', 'ZHOLUD_PR_PROTOCOLS');
  sp.append('v', JSONProtocol);
  sp.append('p', updatePassword);

  fetch(ajaxHandlerScript, { method: 'post', body: spLock })
    .then( response => {
      console.log(response);
      return fetch(ajaxHandlerScript, { method: 'post', body: sp })
    }
    )

    .catch( error => { console.error(error); } );

}

sendUpdateProtocols();