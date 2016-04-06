function showLogs(code, response, method, controller, logsGlobal) {

	if (logsGlobal == 1) {
		sails.log.error({
			"code": code,
			"response": response,
			"method": method,
			"controller": controller
		});
	} else {
		sails.log("Logs has been disabled")
	}

}

function showLogs(code, res, message, data) {

	return res.send(code, {
		"message": message,
		"data": data
	});
}