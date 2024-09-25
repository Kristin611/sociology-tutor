import OpenAI from 'openai'; //import openAI library
import dotenv from 'dotenv';
import inquirer from 'inquirer'; //command line input
dotenv.config();

//initialize the openAI object with the API key
const openai = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-4o-mini'
});

//function to handle chat request
const getChatResponse = async (messages) => {
    try {
        //send chat completion request
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages, //pass the messages array as input
        });
        return completion.choices[0].message.content; //return the content of the assistant's reply
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, something went wrong.';
        
    }
}

//function to manage interaction with student
const tutorInteraction = async () => {
    //create initial message with the role of the system, defining the assistant
    const messages = [
        {
            role: 'system',
            content: "You are a sociology expert and will answer the user's sociology questions as thoroughly as possible."
        }
    ];

    //prompt the user for a sociology question
    const { studentQuestion } = await inquirer.prompt([
        {
            type: 'input',
            name: 'studentQuestion',
            message: 'Ask a question about sociology:',
        },
    ]);

    //add the student's question to the messages array
    messages.push({
        role: 'user',
        content: studentQuestion
    })

    //get the tutor's response from the OpenAI API
    const tutorResponse = await getChatResponse(messages);

    //log the tutor's response
    console.log("Tutor's response:", tutorResponse)
}

tutorInteraction();
