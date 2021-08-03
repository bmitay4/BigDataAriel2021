var Kafka = require("node-rdkafka");
const MongoClient = require("mongodb").MongoClient;
const redis = require("../Redis/app");

// MongoDB configuration and Connection details
const kafkaConf = {
	"group.id": "cloudkarafka-example",
	"metadata.broker.list":
		"dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(
			","
		),
	"socket.keepalive.enable": true,
	"security.protocol": "SASL_SSL",
	"sasl.mechanisms": "SCRAM-SHA-256",
	"sasl.username": "xpb25gkb",
	"sasl.password": "67z9TtrS9KJdYb9oaQjr2TvBT9CTNOgw",
	debug: "generic,broker,security",
};

const uri =
	"mongodb+srv://dsi:ariel2021@cluster0.lkuyv.mongodb.net/vehicles?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const prefix = "xpb25gkb-";
const topics = [`${prefix}Cars`];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
	"auto.offset.reset": "beginning",
});

// Adding a single document to mongoDB
function addCar(car) {
	client.connect((err) => {
		const collection = client.db("vehicles").collection("section_2");
		collection.insertOne(car, function (err, res) {
			if (err) throw err;
			console.log("Car Inserted: " + JSON.stringify(car));
		});
	});
}

consumer.on("ready", function (arg) {
	console.log(`Consumer ${arg.name} ready`);
	consumer.subscribe(topics);
	consumer.consume();
});
consumer.on("data", function (m) {
	addCar(JSON.parse(m.value.toString()));
	redis.addCar(JSON.parse(m.value.toString()));
});
consumer.on("disconnected", function (arg) {
	process.exit();
});

consumer.connect();
