import express from "express";
import User from "../modules/user.mjs";
import {HTTPCodes} from "../modules/httpConstants.mjs";
import SuperLogger from "../modules/SuperLogger.mjs";
import {validateInput, getIllegalInputs, inputType} from "../modules/inputValidator.mjs";

const USER_API = express.Router();
USER_API.use(express.json()); // This makes it so that express parses all incoming payloads as JSON for this route.

USER_API.get("/", (req, res, next) => {
	SuperLogger.log("Demo of logging tool");
	SuperLogger.log("A important msg", SuperLogger.LOGGING_LEVELS.CRTICAL);
});

USER_API.get("/:id", (req, res, next) => {
	// Tip: All the information you need to get the id part of the request can be found in the documentation
	// https://expressjs.com/en/guide/routing.html (Route parameters)
	/// TODO:
	// Return user object
	res.json(req.params.id); // Send the user object as response
});

USER_API.post("/", async (req, res, next) => {
	// This is using javascript object destructuring.
	// Recomend reading up https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#syntax
	// https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
	const {name, email, pswHash, creator} = req.body;

	validateInput(email, inputType.email);
	validateInput(name, inputType.name);
	validateInput(pswHash, inputType.pswHash);

	const illegalInputs = await getIllegalInputs();

	if (illegalInputs === "") {
		if (name != "" && email != "" && pswHash != "") {
			let user = new User();
			user.name = name;
			user.email = email;
			user.credits = 0;
			user.purchased_kits = "";
			user.uploaded_kits = "";
			user.creator = creator;

			///TODO: Do not save passwords.
			user.pswHash = pswHash;

			///TODO: Does the user exist?
			let exists = false;

			if (!exists) {
				//TODO: What happens if this fails?
				user = await user.save();
				res.status(HTTPCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
			} else {
				res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).end();
			}
		} else {
			res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
		}
	} else {
		res.status(HTTPCodes.ClientSideErrorRespons.BadRequest).send(illegalInputs).end();
	}
});

USER_API.post("/:id", (req, res, next) => {
	/// TODO: Edit user
	const user = new User(); //TODO: The user info comes as part of the request
	user.save();
});

USER_API.delete("/:id", (req, res) => {
	/// TODO: Delete user.
	const user = new User(); //TODO: Actual user
	user.delete();
});

export default USER_API;
