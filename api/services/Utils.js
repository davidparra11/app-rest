module.exports = {
	showLogs: function (code, response, method, controller, errorInfo) {

		var logsGlobal = process.env.LOGS_GLOBAL;

		if (logsGlobal) {
			if (errorInfo = 1) {
				sails.log.error({
					"code": code,
					"response": response,
					"method": method,
					"controller": controller
				});
			} else {
				sails.log.info({
					"code": code,
					"response": response,
					"method": method,
					"controller": controller
				});
			}
		} else {
			sails.log("Logs has been disabled");
		}
	}

}