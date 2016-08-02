"use strict"; //utils
module.exports = {
    showLogs: function(code, response, method, controller, errorInfo) {

        var logsGlobal = process.env.LOGS_GLOBAL || true;

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
        console.log('data stringify ' + JSON.stringify(data));
        console.log('DATA ' + data);
        var arrayAgenda = data.toString().split(", ");
        console.log('array Agenda ' + arrayAgenda);
        console.log('array Agenda1 ' + arrayAgenda[0]);
        console.log('array Agenda1 length ' + arrayAgenda[1].length);
        var number = [];
        var others = [];
        var i = 0;
        for (i = 0; i < arrayAgenda.length; i++) {
            if (arrayAgenda[i].length == 12) {
                number.push(arrayAgenda[i]);
            } else if (arrayAgenda[i].length == 14) {
                var only10 = arrayAgenda[i].substr(3, 10);
                number.push(only10);
            } else {
                //console.log('its phoneNumber dont aproved length policy for: IC3XXXXXXXXX');
                //return true;
                others.push(arrayAgenda[i]);
            }
            //console.log('number ' + number.toString());

        };
        console.log('number2 ' + number.toString());

        return number;


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

    /**
     initail validation from a method of some controller.
     data   = phoneNumber
     return = {interCode: codeInternational,
                        phoneNumber: phone}
     **/
    doubleValidator: function(data1, data2, res) {

       if (!data1 || !data2) {
            return res.send(400, "Some Property Missing");
            return false;
        }else{
            return true;
        }
    },
}

