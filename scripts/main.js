document.addEventListener('DOMContentLoaded', function () {
    var ClientApp = window.purecloud.apps.ClientApp;
    var myClientApp = new ClientApp({
        gcHostOriginQueryParam: 'gcHostOrigin',
        gcTargetEnvQueryParam: 'gcTargetEnv'
    });

    myClientApp.alerting.showToastPopup('Hello', 'Genesys Cloud');

    // Log the environment to the console
    console.log(myClientApp.gcEnvironment);

    // Display the environment in the web page
    var dataContainer = document.getElementById('data-container');
    dataContainer.textContent = 'Current Environment: ' + myClientApp.gcEnvironment;
});
