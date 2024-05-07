
document.addEventListener('DOMContentLoaded', function () {
    var ClientApp = window.purecloud.apps.ClientApp;
    var myClientApp = new ClientApp({
        gcHostOriginQueryParam: 'gcHostOrigin',
        gcTargetEnvQueryParam: 'gcTargetEnv'
    });

    myClientApp.alerting.showToastPopup('Hello', 'Genesys Cloud');
});