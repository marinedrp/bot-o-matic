const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cat')
	.setDescription('Replies with a random cat!'),
    async execute(interaction){
        const randomCat = await request('https://aws.random.cat/meow');
        const { file } = await randomCat.body.json();

        const catEmbed = new EmbedBuilder()
        .setColor('#cc99ff')
        .setDescription('A wild cat appeared!')
        .setImage(file)

        interaction.reply({ embeds: [catEmbed]});
    }
} 