document.addEventListener('DOMContentLoaded', function () {
    var ClientApp = window.purecloud.apps.ClientApp;
    var myClientApp = new ClientApp({
        gcHostOriginQueryParam: 'gcHostOrigin',
        gcTargetEnvQueryParam: 'gcTargetEnv'
    });

    myClientApp.alerting.showToastPopup('Hello', 'Genesys Cloud');

    // Function to get parameter value from URL
    function getParamValue(paramPairs){
        return decodeURIComponent(paramPairs[1] || '');
    }

    var queryString = window.location.search.substring(1);
    var pairs = queryString.split('&');
    var conversationId = null;
    var gcHostOrigin = null;
    var gcTargetEnv = null;

    for (let i = 0; i < pairs.length; i++) {
        let currParam = pairs[i].split('=');
       
        if(['conversationId', 'gcConversationId'].indexOf(currParam[0]) !== -1) {
            conversationId = getParamValue(currParam);
        } else if (currParam[0] === 'gcHostOrigin') {
            gcHostOrigin = getParamValue(currParam);
        } else if (currParam[0] === 'gcTargetEnv') {
            gcTargetEnv = getParamValue(currParam);
        }
    }

    // Display the environment and conversation ID in the web page
    var dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '<strong>Current Environment:</strong> ' + myClientApp.gcEnvironment +
                              '<br><strong>Conversation ID:</strong> ' + (conversationId || 'N/A');
});
