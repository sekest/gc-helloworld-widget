// >> START client-app-sdk
const clientId = 'c99fdefd-4083-46c7-8f1e-de3147acd866';
const redirectUri = 'https://sekest.github.io/gc-helloworld-widget/';

const appName = 'sample_app';
const qParamLanguage = 'language';
const qParamEnvironment = 'environment';
const qParamConversationId = 'gcConversationId';

// Default values are assigned but values should 
// be set on the function 'assignConfiguration'
let language = 'en-us';
let environment = 'usw2.pure.cloud'; 
let conversationId = "None"; 

let userDetails = null;

/**
 * Configure both the Platform SDK and the Client App SDK
 */
function setupGenesysClients(){
  const platformClient = require('platformClient');
  const client = platformClient.ApiClient.instance;
  const usersApi = new platformClient.UsersApi();

  // >> START client-app-sdk-step-2
  // Configure Client App
  let ClientApp = window.purecloud.apps.ClientApp;
  let myClientApp = new ClientApp({
      pcEnvironment: environment
  });
  // >> END client-app-sdk-step-2

  // >> START client-app-sdk-step-3
  // Configure and Authenticate Platform Client
  client.setPersistSettings(true, appName);
  client.setEnvironment(environment);

  return client.loginImplicitGrant(clientId, redirectUri)
  // >> END client-app-sdk-step-3
  // >> START client-app-sdk-step-4
    .then(data =>  usersApi.getUsersMe())
    .then(data => {
      userDetails = data;

      myClientApp.alerting.showToastPopup(
        `Hi ${userDetails.name}`, 
        `Your Current Conversation Id: ${conversationId}`);
    })
    .catch(err => console.log(err));
    // >> END client-app-sdk-step-4
}

// >> START client-app-sdk-step-1
/**
 * Assign the language and environment for the app first through
 * the query parameters. But if non-existent, attempt to get
 * it from localStorage. If none, use default values.
 */
function assignConfiguration(){
  let url = new URL(window.location);
  let searchParams = new URLSearchParams(url.search);

  if(searchParams.has(qParamLanguage)){
    language = searchParams.get(qParamLanguage);
    localStorage.setItem(`${appName}_language`, language);
  } else {
    let local_lang = localStorage.getItem(`${appName}_language`);
    if(local_lang) language = local_lang;
  }

  if(searchParams.has(qParamEnvironment)){
    environment = searchParams.get(qParamEnvironment);
    localStorage.setItem(`${appName}_environment`, environment);
  } else {
    let local_env = localStorage.getItem(`${appName}_environment`);
    if(local_env) environment = local_env;
  }

  if(searchParams.has(qParamConversationId)){
    conversationId = searchParams.get(qParamConversationId);
    localStorage.setItem(`${appName}_conversationId`, conversationId);
  } else {
    let local_convo = localStorage.getItem(`${appName}_conversationId`);
    if(local_convo) conversationId = local_convo;
  }
}
// >> END client-app-sdk-step-1

// After page loads...
window.addEventListener('load', (event) => {
  assignConfiguration();
  console.log(`environment: ${environment}`);
  console.log(`language: ${language}`);
  console.log(`Conversation Id: ${conversationId}`);

  setupGenesysClients()
  .then(() => { 
    // Display values to the page
    document.getElementById('span_environment').innerText = environment;
    document.getElementById('span_language').innerText = language;
    document.getElementById('span_name').innerText = userDetails.name;
    document.getElementById('span_conversationId').innerText = conversationId;

    console.log('Finished setup.');
  })
});
// >> END client-app-sdk