export const updateClientInfo = (appProps) => {
  console.log("hey, it's going through me!");
  let client = appProps.clientReducer.client;
  let inputs = document.getElementsByTagName('INPUT');
  let dataObj = {clientId: appProps.clientReducer.project.clientId};

  // UPDATE EACH CLIENT INFO FIELD INDIVIDUALLY
  if (inputs[0].value.length > 0 && inputs[0].value !== client.name) {
    dataObj.name = inputs[0].value;
  }
  if (inputs[1].value.length > 0 && inputs[1].value !== client.company) {
    dataObj.company = inputs[1].value;
  }
  if (inputs[2].value.length > 0 && inputs[2].value !== client.email) {
    dataObj.email = inputs[2].value;
  }
  if (inputs[3].value.length > 0 && inputs[3].value !== client.phone) {
    dataObj.phone = inputs[3].value;
  }
  let clientObj = {name: dataObj.name, company: dataObj.company, email: dataObj.email, phone: dataObj.phone};
  appProps.setClientInfo(clientObj);
  fetch('/api/update-client', {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(dataObj)
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (appProps.setClientId) {
        appProps.setClientId(data.id);
      }
      console.log('RETURNED FROM INSERT: ', data);
    })
    .catch((err) => {
      console.log(err);
      createErrorPopup("Client Name Already Exists!", "We already have a client with that name in our database. If this is due to error, please give us a call: +1 (844) 426-7999");
    });
};

export const createErrorPopup = (heading, message) => {

  let foundation = document.getElementById('foundation');
  let overlay = document.createElement('div');
  let errorPopup = document.createElement('div');
  let errorHeading = document.createElement('h1');
  let errorMessage = document.createElement('p');
  let confirmButton = document.createElement('p');

  overlay.className = 'full-overlay';
  overlay.id = 'error-overlay';

  if (document.getElementById('error-overlay') === null) {
    errorPopup.className = 'error-popup';

    errorHeading.innerText = heading;
    errorHeading.className = "error-heading";

    errorMessage.innerText = message;

    confirmButton.className = 'error-button';
    confirmButton.innerText = 'CLOSE WINDOW';
    confirmButton.addEventListener('click', function() {
      foundation.removeChild(overlay);
    });

    errorPopup.appendChild(errorHeading);
    errorPopup.appendChild(errorMessage);
    errorPopup.appendChild(confirmButton);
    overlay.appendChild(errorPopup);
    foundation.appendChild(overlay);
  }


};

export const fetchWrapper = (serverPath, initObj, settingFunction, appHistory, appPath) => {
  fetch(serverPath, initObj)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (settingFunction) {
        settingFunction(data.id);
      }
      console.log('RETURNED FROM INSERT: ', data);
      if (appPath) {
        appHistory.push(appPath);
      }
    })
    .catch((err) => {

      if (serverPath === '/api/new-project') {
        createErrorPopup("Project Already Exists!", "We already have your project in our database. If this is due to error, please give us a call: +1 (844) 426-7999");
      } else {
        createErrorPopup("Client Already Exists!", "We already have you in our database. If this is due to error, please give us a call: +1 (844) 426-7999");
      }
      console.log(err);
      return false;

      // switch (serverPath) {
      //   case '/api/new-project':
      //     createErrorPopup("Project Already Exists!", "We already have your project in our database. If this is due to error, please give us a call: +1 (844) 426-7999");
      //     break;
      //   case '/api/new-client':
      //   case '/api/update-name':
      //   case '/api/update-company':
      //   case '/api/update-email':
      //   case '/api/update-phone':
      //     createErrorPopup("Client Already Exists!", "We already have you in our database. If this is due to error, please give us a call: +1 (844) 426-7999");
      //     break;
      //   default:
      //     console.log('fell to the default inside of the fetchWrapper() function inside of the Functions.js component');
      // }
      // alert("A client with your company name is already in our database. If this is due to error, please give us a call: +1 (844) 426-7999");
    });
};