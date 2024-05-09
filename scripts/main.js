// Instantiate API client
const platformClient = require('platformClient');
const client = platformClient.ApiClient.instance;
client.setEnvironment(platformClient.PureCloudRegionHosts.us_west_2);

// OAuth configuration
// const redirectUri = window.location.href;
const redirectUri = 'https://sekest.github.io/gc-helloworld-widget/';
const clientId = 'c99fdefd-4083-46c7-8f1e-de3147acd866';  // Replace with your actual client ID

// Initialize ClientApp
var ClientApp = window.purecloud.apps.ClientApp;
var myClientApp = new ClientApp({
    gcHostOriginQueryParam: 'gcHostOrigin',
    gcTargetEnvQueryParam: 'gcTargetEnv'
});

// User API instance
const usersApi = new platformClient.UsersApi();

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function displayUserInfo() {
    // Display Conversation ID from URL
    const conversationId = getQueryParam('gcConversationId');
    document.getElementById('conversationId').textContent = conversationId || 'No Conversation ID';

    client.loginImplicitGrant(clientId, redirectUri)
        .then(() => {
            // Successfully authenticated, now fetch user data
            return usersApi.getUsersMe();
        })
        .then((userData) => {
            // Display the user ID in the HTML element
            document.getElementById('userId').textContent = userData.id;
            // Show a toast popup with the user ID
            myClientApp.alerting.showToastPopup('Hello', `User ID: ${userData.id}`);
        })
        .catch((error) => {
            // Handle errors and possibly display an error message
            console.error('Error fetching user data:', error);
            document.getElementById('userId').textContent = 'Failed to load user ID';
            myClientApp.alerting.showToastPopup('Error', 'Failed to load user ID');
        });
}

// Call the function to execute on script load
displayUserInfo();
