module.exports = {
	showLogs: function(code, response, method, controller, logsGlobal, errorInfo) {

		if (logsGlobal == 1) {
			if (errorInfo == 1) {
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
	},

	sendInfoFunc: function(code, res, message, data) {

		return res.send(code, {
			"message": message,
			"data": data
		});
	}
}