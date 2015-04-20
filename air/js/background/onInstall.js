//版本更替
(function() {
	var currentVersion = baseInfo.getInstance().info.version,
		oldVersion = Storage.get('currentVersion');
	
	if (!oldVersion) {
		Statistics.trigger(0, '1');
		chrome.tabs.create({url: config.urls.welcome});
		Storage.set('currentVersion', currentVersion);
	} else if (Storage.get('currentVersion') != currentVersion) {
		Statistics.trigger(0, '2', Storage.get('currentVersion'));
		Storage.set('currentVersion', currentVersion);
	}
	
	//1.x或2.0.x版本适配
	if (!oldVersion || /^1\./.test(oldVersion) || /^2\.0\./.test(oldVersion)) {
		//有监控中任务转为monitorBox，没有则记录InputKeeper
		if (Storage.get('monitoring') == 'on') {
			var date = parseInt(Storage.get('flightDate'), 10),
				flight = new Flight({
					from: Storage.get('flightFrom'),
					to: Storage.get('flightTo'),
					date: Storage.get('flightFiveDays') == 'true' ? [date - 172800000, date + 172800000] : [date, date],
					extra: Storage.get('flightFiveDays') == 'true' ? [date - 172800000, date + 172800000] : [date - 172800000, date + 172800000]
				});
			
			Storage.set(flight.getId(), JSON.stringify({
				flight: {
					main: JSON.parse(Storage.get('rightDateTicket')),
					extra: JSON.parse(Storage.get('otherTicketsInfo')),
					lowestPrice: parseInt(Storage.get('lowestPrice'))
				},
				monitor: {
					lastTime: parseInt(Storage.get('lastMonitorTime'), 10),
					time: parseInt(Storage.get('lastMonitorTime'), 10),
					type: Storage.get('monitorType'),
					price: Storage.get('absolutePrice')
				},
				lastShowedPrice: parseInt(Storage.get('lastShowedPrice'), 10)
			}));
			
			Storage.set('monitorBox', JSON.stringify([flight.getId()]));
			Storage.set('monitorHistory', JSON.stringify([flight.getId()]));
		} else {
			Storage.set('lastInput', {
				from: Storage.get('flightFrom'),
				to: Storage.get('flightTo'),
				date: parseInt(Storage.get('flightDate'), 10),
				extra: Storage.get('flightFiveDays') == 'true'
			});
		}
		Storage.remove('flightFrom');
		Storage.remove('flightTo');
		Storage.remove('flightDate');
		Storage.remove('flightFiveDays');
		
		Storage.remove('monitorType');
		Storage.remove('absolutePrice');
		
		Storage.remove('rightDateTicket');
		Storage.remove('otherTicketsInfo');
		Storage.remove('lowestPrice');
		Storage.remove('lastShowedPrice');
		Storage.remove('lastMonitorTime');
		
		var lastStage;
		
		switch (Storage.get('myStage')) {
		case 'ticketRoot':
			lastStage = 'root';
			break;
		case 'monitorGroup':
			if (Storage.get('monitoring') == 'on') {
				lastStage = 'monitorBox';
			} else {
				lastStage = 'flightSetting';
			}
			break;
		case 'cheapTicketList':
			lastStage = 'bargainList';
			break;
		case 'setting':
			lastStage = 'commonSetting';
			break;
		default:
			lastStage = 'root';
		}
		
		Storage.set('lastStage', lastStage);

		Storage.remove('monitoring');
		Storage.remove('myStage');
	}
}());