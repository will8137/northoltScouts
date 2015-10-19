(function() {


    var API = function() {
        this.Initialized = false;
    }

    API.data = window._scormSession._scormData;

    window.API = API;
    window.API_1484_11 = API;

    console.log(API.data);

    API.LMSInitialize = function(param) {
        this.errorCode = "0";
        if (param == "") {
            if (!this.Initialized) {
                this.Initialized = true;
                this.errorCode = "0";
                return "true";
            } else {
                this.errorCode = "101";
            }
        } else {
            this.errorCode = "201";
        }
        return "false";
    }
    API.LMSFinish = function() {
        console.log('Scorm Terminate', API.data);
    }
    API.LMSGetDiagnostic = function() {
        return "Scorm has been disconnected";
    }

    API.LMSGetLastError = function() {
        return this.errorCode;
    }

    API.LMSGetErrorString = function() {

    }

    API.LMSCommit = function() {
        console.log('Committing', API.data);
        $.post('api/usersCourse/scorm/'+window._userId+'/' + window._courseId, API.data, function() {
        });
        return setTimeout(function() {
            return "true";
        }, 1000);
        //return "true";
    }

    API.LMSGetValue = function(key) {
        var keySplit = key.split('.');
        var actualKey = keySplit[keySplit.length - 1];
        console.log('Get:' + key, API.data[actualKey]);
        if (!API.data[actualKey]) {
            return '';
        }
        return API.data[actualKey].value;
        /*return  "not attempted";*/
    }

    API.LMSSetValue = function(key, value) {
        var keySplit = key.split('.');
        var actualKey = keySplit[keySplit.length - 1];
        console.log(actualKey);
        API.data[actualKey] = {
            key: key,
            value: value
        };
        console.log('Set:' + key, actualKey, value);
        return 'true';
    }

})();