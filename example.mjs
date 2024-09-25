import dotenv from 'dotenv';
dotenv.config(); //load environment variables

//console.log('API Key:', process.env.OPENAI_API_KEY);

import OpenAI from "openai";

const openai = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: 'gpt-4o-mini'
});

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);