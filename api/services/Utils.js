module.exports = {
	showLogs: function(code, response, method, controller, logsGlobal, errorInfo) {

		if (logsGlobal == true) {
			if (errorInfo = error) {
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
			sails.log("Logs has been disabled")
		}
	}

}