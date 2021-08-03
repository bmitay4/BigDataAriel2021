var uuid = require("node-uuid");
const redis = require("redis");

const REDIS_PORT = process.env.PORT || 6379;

const clinet = redis.createClient(REDIS_PORT);

clinet.on("connect", function () {
	console.log(`Redis root listening on port ${REDIS_PORT}`);
});

let count = 0;
clinet.set("Count", 0);

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
		clinet.SADD(car.EntranceInterchange, uid, function (err) {
			if (err) throw err;
		});
		clinet.expire(
			uid,
			60 *
				(car.ExitInterchange - car.EntranceInterchange,
				function (err) {
					if (err) throw err;
				})
		);
		clinet.INCR("Count", function (err) {
			if (err) throw err;
		});
		count++;
		// console.log(`Cars Count: ${count}`);
		carAdvance();
	} catch (error) {
		console.log(error);
	}
}
async function carAdvance() {
	try {
		for (let index = 1; index < 5; index++) {
			clinet.SMEMBERS(index, function (err, results) {
				var cars = results;

				for (const uid in cars) {
					// console.log(clinet.TTL(cars[uid]));
				}
			});
		}
	} catch (error) {
		console.log(error);
	}
}
function getCount() {
	return count.toString();
}
function cache(req, res, next) {
	clinet.get("Count", (err, data) => {
		if (err) throw err;

		if (data != null) {
			res.send(cacheGetCount(data));
		} else {
			next();
		}
	});
}
function cacheGetCount(data) {
	return data;
}

module.exports = { addCar, getCount, cache };
