// usersRoute.mjs

import express from "express";
import User from "../modules/user.mjs";
import {HTTPCodes, HTTPMethods} from "../modules/httpConstants.mjs";
import {validateInput, getIllegalInputs, inputType} from "../modules/inputValidator.mjs";

const USER_API = express.Router();
USER_API.use(express.json());

const users = [];

USER_API.get("/:id", (req, res, next) => {
	const userId = req.params.id;

	const user = users.find((user) => user.id === userId);

	if (user) {
		res.status(HTTPCodes.SuccesfullRespons.Ok).json(user);
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.NotFound).send("User not found").end();
	}
});

function createUser(userData) {
	const newUser = new User();
	newUser.id = btoa(userData.name + userData.email);
	newUser.name = userData.name;
	newUser.email = userData.email;
	newUser.pswHash = userData.pswHash;
	newUser.creator = userData.creator;
	newUser.credits = 0;
	newUser.purchasedKits = [];
	newUser.uploadedKits = [];

	users.push(newUser);

	return newUser;
}

function checkIfUserExists(email) {
	return users.some((user) => user.email === email);
}

USER_API.post("/", (req, res, next) => {
	const userData = req.body;
	const {name, email, pswHash} = req.body;
	console.log("User data:", {name, email, pswHash});

	validateInput(email, inputType.email);
	validateInput(name, inputType.name);
	validateInput(pswHash, inputType.pswHash);

	const illegalInputs = getIllegalInputs();

	if (illegalInputs === "") {
		const userExists = checkIfUserExists(email);
		console.log("userExists: ", userExists);

		if (!userExists) {
			const newUser = createUser(userData);

			console.log("User created successfully:", newUser);
			res.status(HTTPCodes.SuccesfullRespons.Ok).json({userId: newUser.id});
		} else {
			console.log("User already exists");
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("User already exists").end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(illegalInputs).end();
	}
});

USER_API.put("/:id", (req, res) => {
	// TODO: Edit user
});

USER_API.delete("/:id", (req, res) => {
	// TODO: Delete user.
});

export default USER_API;
