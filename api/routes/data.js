const { Router } = require("express");
const api = Router();

const package = require("../../package.json");
const { getClient } = require("../../");

api.get("/", (req, res) => {
	const client = getClient();

    // Check if client and client.user are defined
    if (!client || !client.user) {
        return res.status(500).json({ error: "Client is not initialized or user data is unavailable." });
    }

	let data = {
		name: client.user.username,
		version: package.version,
		commands: client.slashCommands.map(cmd => {
			return {
				name: cmd.name,
				description: cmd.description,
			};
		}),
		inviteURL: `https://discord.com/oauth2/authorize?client_id=${ client.config.clientId
		}&permissions=${ client.config.permissions
		}&scope=${ client.config.scopes.toString().replace(/,/g, "%20") }`,
		loggedIn: !!req.user,
	};
	res.json(data);
});

module.exports = api;
