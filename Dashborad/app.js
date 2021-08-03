const express = require("express");
const mongodb = require("../MongoDB/app");
const redis = require("../Redis/app");
const methods = require("./methods");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.all("/", function (req, res) {
	preditc_table = methods.predictTable(req.query);
	predict_values = methods.predictValues(req.query);

	res.render("./index", {
		carsCount: redis.getCount(),
		preditc_table,
		predict_values,
	});
});

app.get("/count", redis.cache);

app.listen(PORT, () =>
	console.log(`App running, listening at http://localhost:${PORT}`)
);
