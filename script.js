const inquirer = require('inquirer')
require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');

const model = new OpenAI({
    openAIApiKey: process.env.apiKey,
    temperature: 0,
    model: 'gpt-3.5-turbo'
});
//console.log({model})

const promptFunc = async (input) => {
    try {
        const res = await model.call(input);
        console.log(res)
    }
    catch (err) {
        console.error(err);
    }
};

// promptFunc();

const init = () => {
    inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Ask a question about sociology:',
    },
]).then((inquirerResponse) => {
    promptFunc(inquirerResponse.name)
});
};

init();