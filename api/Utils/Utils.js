"use strict";
module.exports = {
    showLogs: function(code, response, method, controller, errorInfo) {

        var logsGlobal = process.env.LOGS_GLOBAL;

        if (logsGlobal) {
            if (errorInfo === 0) {
                sails.log.info({
                    "code": code,
                    "response": response,
                    "method": method,
                    "controller": controller
                });                
            } else {                
                sails.log.error({
                    "code": code,
                    "response": response,
                    "method": method,
                    "controller": controller,
                    "error": errorInfo
                });
            }
        } else {
            sails.log("Logs has been disabled");
        }
    },
    /**
 Function that captures req.params String and return an array of characters
 data   = char1,char2,charN  //array of character which are retrived like aagenda phone numbers from device.
 return = [array of numbers]
 **/
    convertString: function(data) {

        var arrayAgenda = data.split(", ");
        var number = [];
        var i = 0;
        for (i = 0; i < arrayAgenda.length; i++) {
            if (arrayAgenda[i].length == 10) {
                number.push(arrayAgenda[i]);
            } else if (arrayAgenda[i].length == 12) {
                var only10 = arrayAgenda[i].substr(2, 10);
                number.push(only10);
            } else {
                console.log('its phoneNumber dont aproved length policy for: IC3XXXXXXXXX');
            }
            return number;
        };
    },
    /**
     Function that captures req.param("phoneNumber") String and return a  split varible on code & phone
     data   = phoneNumber
     return = {interCode: codeInternational,
                        phoneNumber: phone}
     **/
    phoneSplit: function(data) {

        var codeInternational = data.substring(0, 3);
        var phone = data.substring(3, 13);
        var codeNumber = {
            interCode: codeInternational,
            phoneNumber: phone
        };

        return codeNumber;
    },
}