//where I left off: there is something missing/wrong with output see documentation for structured ouput parser

const inquirer = require('inquirer')
require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');
const { PromptTemplate } = require('langchain/prompts');
const { StructuredOutputParser } = require('langchain/output_parsers');

const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-4o-mini'
});
//console.log({model})

const parser = StructuredOutputParser.fromNamesAndDescriptions({
    explanation: "detailed explanation to the user's question",
    source: "source used to answer the user's question",
});

const formatInstructions = parser.getFormatInstructions();

const promptFunc = async (input) => {
    try {  
        const prompt = new PromptTemplate({
            template: "You are a sociology expert and will answer the user's sociology questions as thoroughly as possible.\n{format_instructions}\n{question}",
            inputVariables: ['question'],
            partialVariables: {format_instructions: formatInstructions}
        });

        const promptInput = await prompt.format({
            question: input
        });

        const res = await model.call(promptInput);
        //console.log('RAW response:', res)
        //console.log('Response:', res)
        console.log(await parser.parse(res))

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