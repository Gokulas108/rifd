const express = require("express");
const router = express.Router();
const sql = require("./../database.js");

function routes(app) {
	let io = app.get("io");

	router.post("/getCard", (req, res) => {
		console.log(req.body);
		let card_id = req.body.cardid ? req.body.cardid : "";
		let site = req.body.site ? req.body.site : "";
		console.log(card_id);
		if (card_id && site) {
			sql.query(
				`SELECT * FROM cards WHERE card_id = '${card_id}'`,
				(err, response) => {
					if (err) {
						console.log("error: ", err);
						res.status(400).send({ mssg: "Error!" });
					}
					if (response.length) {
						let name = response[0].name;
						let pfid = response[0].pfid;
						const timestamp = new Date();
						sql.query(
							`INSERT INTO log (card_id, pfid, name, site, timestamp)
						 VALUES ('${card_id}', '${pfid}', '${name}', '${site}', ${timestamp.getTime()} )`,
							(err, response) => {
								if (err) {
									console.log("error: ", err);
									res.status(400).send({ mssg: "Error!" });
								}

								if (response) {
									console.log(response);
									res.status(200).send({ mssg: "Success!" });
									io.emit("new_card", {
										card_id,
										name,
										pfid,
										site,
										timestamp: `${timestamp.getHours()}:${timestamp.getMinutes()}, ${timestamp.getDate()}/${
											timestamp.getMonth() + 1
										}/${timestamp.getFullYear()}`,
										key: timestamp.getTime(),
									});
								}
							}
						);
					}
				}
			);
		} else {
			res.status(400).send({ mssg: "Error!" });
		}
	});

	//LOGIN
	router.post("/login", (req, res) => {
		console.log(req.body);
		let pfid = req.body.pfid;
		let password = req.body.password;

		sql.query(
			`SELECT Name, Role FROM users WHERE PFID = ${pfid} AND Password = PASSWORD('${password}')`,
			(err, response) => {
				if (err) {
					console.log("error: ", err);
					res.status(400).send({ mssg: "Error!" });
				}

				if (response.length) {
					console.log("found users: ", response[0].Name);
					if (response[0].Name && response[0].Role) {
						req.session.user_name = response[0].Name;
						req.session.user_role = response[0].Role;
						res.status(200).send({ mssg: "Logged in Successfully!" });
					}
				} else {
					res.status(400).send({ mssg: "Invalid Username or Password!" });
				}
			}
		);
	});

	router.get("/getRfid", (req, res) => {
		let users = {
			1346170: {
				name: "A K Shaji",
				pfid: 1299,
			},
			1872790: {
				name: "Nihal A K",
				pfid: 1298,
			},
			121387530: {
				name: "Gokul Shaji",
				pfid: 1297,
			},
			303715480: {
				name: "XYZ",
				pfid: 1296,
			},
		};

		sql.query(`SELECT * FROM rfid`, (err, response) => {
			if (err) {
				console.log("error: ", err);
				res.status(400).send({ mssg: "Error!" });
			}
			if (response.length) {
				let data = [];
				response.map((row) => {
					data.push({
						pfid: users[row.UID].pfid,
						name: users[row.UID].name,
						site: "Site S1",
						timestamp: row.Timestamp,
					});
				});
				res.status(200).send({ data: data });
			}
		});
	});

	//LOGOUT
	router.get("/logout", (req, res) => {
		req.session.destroy();
		res.status(200).send({ mssg: "Logged out Successfully!" });
	});
	return router;
}

module.exports = routes;
