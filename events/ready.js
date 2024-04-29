/**
 *
 * @param {import("../lib/DiscordMusicBot")} client
 */
module.exports = (client) => {
    if (!client || !client.manager || !client.user || !client.config) {
        console.error("Client and its properties must be fully initialized before setting up.");
        return;
    }

    if (typeof client.manager.init !== 'function') {
        console.error("Init function is missing from client.manager");
        return;
    }

    client.manager.init(client.user.id);

    if (client.config.presence) {
        client.user.setPresence(client.config.presence);
    } else {
        console.error("Presence configuration is missing.");
    }

    client.log("Successfully Logged in as " + client.user.tag);
};
