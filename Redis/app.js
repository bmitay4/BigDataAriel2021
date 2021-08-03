var uuid = require("node-uuid");
const redis = require("redis");

const REDIS_PORT = process.env.PORT || 6379;

const clinet = redis.createClient(REDIS_PORT);

clinet.on("connect", function () {
	console.log(`Redis root listening on port ${REDIS_PORT}`);
});

let count = 0;
clinet.set("Count", count);

async function addCar(car) {
	try {
		let uid = uuid();
		console.log(`Car UID: ${uid}`);

		clinet.HMSET(
			uid,
			"Type",
			car.Type,
			"Event",
			car.Event,
			"EntranceInterchange",
			car.EntranceInterchange,
			"ExitInterchange",
			car.ExitInterchange,
			"Hour",
			car.Hour,
			"Mins",
			car.Mins,
			function (err) {
				if (err) throw err;
			}
		);
		clinet.expire(
			uid,
			12 * (car.ExitInterchange - car.EntranceInterchange),
			function (err) {
				if (err) throw err;
			}
		);
		clinet.SADD(car.EntranceInterchange, uid, function (err) {
			if (err) throw err;
		});
		clinet.INCR("Count", function (err) {
			if (err) throw err;
		});
		count++;
		// console.log(`Cars Count: ${count}`);

		const timer = (ms) => new Promise((res) => setTimeout(res, ms));

		async function carAdvance() {
			var exit_interchange,
				entry_interchange,
				car_ttl,
				car_type,
				car_time_hour,
				car_time_mins;

			try {
				for (let index = 1; index < 5; index++) {
					clinet.SMEMBERS(index, function (err, results) {
						if (err) throw err;
						var cars = results;
						console.log(`Cars in interchange ${index}: ${cars}`);
						for (const uid in cars) {
							clinet.TTL(cars[uid], function (error, ttl) {
								if (error) throw error;
								if (ttl < 1) {
									clinet.SREM(
										index,
										uid,
										function (error, exit) {
											if (error) throw error;
											console.log(
												`Car ${cars[uid]} remove from interchange: ${index}`
											);
										}
									);
								}
								car_ttl = ttl;
								console.log(`TTL of car ${cars[uid]}: ${ttl}`);
							});
							if (car_ttl > 0) {
								clinet.HMGET(
									cars[uid],
									"EntranceInterchange",
									function (error, entry) {
										if (error) throw error;
										entry_interchange = entry;
										console.log(
											`Car ${cars[uid]} entrance interchange: ${entry}`
										);
									}
								);
								clinet.HMGET(
									cars[uid],
									"ExitInterchange",
									function (error, exit) {
										if (error) throw error;
										exit_interchange = exit;
										console.log(
											`Car ${cars[uid]} exit interchange: ${exit}`
										);
										console.log(
											`Car ${cars[uid]} start at interchange ${entry_interchange} and should leave at interchange ${exit_interchange}`
										);
									}
								);
								clinet.HMGET(
									cars[uid],
									"Hour",
									function (error, Hour) {
										if (error) throw error;
										car_time_hour = Hour;
									}
								);
								clinet.HMGET(
									cars[uid],
									"Mins",
									function (error, mins) {
										if (error) throw error;
										car_time_mins = mins;
									}
								);
								clinet.HMGET(
									cars[uid],
									"Type",
									function (error, type) {
										if (error) throw error;
										car_type = type;
									}
								);
							}
							if (car_ttl < 1)
								console.log(`Car ${cars[uid]} leaves road 7`);
							else if (
								(exit_interchange - entry_interchange) * 12 <
								(exit_interchange - entry_interchange - 1) * 12
							) {
								clinet.SREM(
									entry_interchange,
									uid,
									function (error, exit) {
										if (error) throw error;
										console.log(
											`Car ${cars[uid]} remove from interchange: ${exit}`
										);
									}
								);
								clinet.SADD(
									entry_interchange + 1,
									uid,
									function (error, entry) {
										if (error) throw error;
										console.log(
											`Car ${cars[uid]} get into interchange: ${entry}`
										);
									}
								);
							}
						}
					});
				}
			} catch (error) {
				console.log(error);
			}
			await timer(13000);
		}
		carAdvance();
	} catch (error) {
		console.log(error);
	}
}
function getAdvance(type, entry, time, exit) {
	console.log("=====");
	console.log([type, entry, time, exit]);
	console.log("=====");
}

function getCount() {
	return count.toString();
}
async function cache() {
	clinet.get("Count", function (err, data) {
		if (err) throw err;
		if (data != null) return data;
	});
}
function cacheGetCount(data) {
	return data;
}

module.exports = { addCar, getCount, cache };
