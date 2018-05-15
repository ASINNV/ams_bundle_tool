export const updateClientInfo = (appProps) => {
  console.log("hey, it's going through me!");
  let client = appProps.clientReducer.client;
  let inputs = document.getElementsByTagName('INPUT');
  let dataObj = {clientId: appProps.clientReducer.project.clientId};

  // UPDATE EACH CLIENT INFO FIELD INDIVIDUALLY
  if (inputs[0].value.length > 0 && inputs[0].value !== client.name) {
    appProps.setClientName(inputs[0].value); // set client name to value of first input field
    dataObj.name = inputs[0].value;

    fetchWrapper('/api/update-name', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(dataObj)
    }, appProps.setClientId);
  }
  if (inputs[1].value.length > 0 && inputs[1].value !== client.company) {
    appProps.setClientCompany(inputs[1].value); // set client company to value of second input field
    dataObj.company = inputs[1].value;

    fetchWrapper('/api/update-company', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(dataObj)
    }, appProps.setClientId);
  }
  if (inputs[2].value.length > 0 && inputs[2].value !== client.email) {
    appProps.setClientEmail(inputs[2].value); // set client email to value of third input field
    dataObj.email = inputs[2].value;

    fetchWrapper('/api/update-email', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(dataObj)
    }, appProps.setClientId);
  }
  if (inputs[3].value.length > 0 && inputs[3].value !== client.phone) {
    appProps.setClientPhone(inputs[3].value); // set client phone to value of fourth input field
    dataObj.phone = inputs[3].value;

    fetchWrapper('/api/update-phone', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(dataObj)
    }, appProps.setClientId);
  }
};

export const createErrorPopup = (heading, message) => {
  let foundation = document.getElementById('foundation');
  let overlay = document.createElement('div');
  let errorPopup = document.createElement('div');
  let errorHeading = document.createElement('h1');
  let errorMessage = document.createElement('p');
  let confirmButton = document.createElement('p');

  overlay.className = 'full-overlay';

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
      createErrorPopup("Client Already Exists!", "A client with your company name is already in our database. If this is due to error, please give us a call: +1 (844) 426-7999");
      // alert("A client with your company name is already in our database. If this is due to error, please give us a call: +1 (844) 426-7999");
      console.log(err);
    });
};