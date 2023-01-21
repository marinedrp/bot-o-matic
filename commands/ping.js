/*At a minimum, the definition of a slash command must have a name and a description. 
Slash command names must be between 1-32 characters and contain no capital letters, spaces, or symbols other than - and _.*/

// If you have a command that performs longer tasks, be sure to call deferReply() as early as possible.
// Note that if you want your response to be ephemeral, you must pass an ephemeral flag to the InteractionDeferOptions here:

/*await interaction.deferReply();
OR await interaction.deferReply({ ephemeral: true });
await wait(4000);
await interaction.editReply('Pong!');*/

const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
        const message = await interaction.fetchReply();
        console.log("This is a message: ", message);
        // await wait(2000);
        // await interaction.followUp('Pong again!');
	},
};