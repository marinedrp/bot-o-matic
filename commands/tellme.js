const wait = require("node:timers/promises").setTimeout;
const { SlashCommandBuilder, EmbedBuilder, codeBlock } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require("../config.json");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


module.exports = {
  data: new SlashCommandBuilder()
    .setName("tellme")
    .setDescription("Get an instant expert answer from the wizard bot.")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Enter your question.")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    await wait(3000);
    
    const prompt = await interaction.options.getString("input");

    const aiResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.5,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    });

    const answer =  aiResponse.data.choices[0].text
    const newArray = prompt.toLowerCase().split(/[^\w+#]/)

    function checkIfCode(){
        const javascript = ["javascript", "js"];
        const python = ['py', 'python'];
        const cpp = ["c++", "cpp", "c plus plus", "cplusplus"]
        const cs = ['c#', 'csharp', 'c sharp']
        const css = ['css', 'cascading style sheets']
    
        const isJavascript = newArray.some( r => javascript.indexOf(r) >= 0)
        const isPython = newArray.some( r => python.indexOf(r) >= 0)
        const isCpp = newArray.some( r => cpp.indexOf(r) >= 0)
        const isCSharp = newArray.some( r => cs.indexOf(r) >= 0)
        const isCSS = newArray.some( r => css.indexOf(r) >= 0)
        
        if (isJavascript){
            return codeBlock('js', answer)
        } else if (!isJavascript){
            if (isPython) return codeBlock('py', answer)
            else if (isCpp) return codeBlock('cpp', answer)
            else if (isCSharp) return codeBlock('cs', answer)
            else if (isCSS) return codeBlock('css', answer)
            else return answer;
        }
    }


    const embed = new EmbedBuilder()
    .setColor('#ccffff')
    .setTitle(prompt)
    .setDescription(checkIfCode())

    await interaction.editReply({ embeds: [embed] });
  },
};
