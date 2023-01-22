const wait = require('node:timers/promises').setTimeout;
const { Configuration, OpenAIApi } = require('openai');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { OPENAI_API_KEY } = require('../config.json');

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

module.exports = {
    data: new SlashCommandBuilder()
    .setName('create')
	.setDescription('There are endless possibilities...')
    .addStringOption(option =>
		option.setName('input')
			.setDescription('Enter your prompt')
            .setRequired(true)),

    async execute(interaction){
        await interaction.deferReply();
        await wait(2000)
        const prompt = await interaction.options.getString("input")
        
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'url'
        })

        const imageUrl = aiResponse.data.data[0].url

        const embed = new EmbedBuilder()
        .setColor('#66ffff')
        .setDescription(prompt)
        .setImage(imageUrl)
        
        await interaction.editReply({ embeds: [embed] });
    }
} 
