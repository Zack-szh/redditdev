import getModmail, { Message, Conversation, ApiResponse } from './getModmail';

async function main() { 
    console.log("hello world!");
    try { 
        const data = await getModmail(); 
        console.log(data); 
        parseResponse(data); 

    } catch (error) { 
        console.error('Error fetching modmail:', error);
    }
}

main(); 


function parseResponse(response: ApiResponse) {
    // Accessing conversations
    for (const [convId, conversation] of Object.entries(response.conversations)) {
        console.log(`Conversation ID: ${convId}`);
        console.log(`Subject: ${conversation.subject}`);
        console.log(`Number of Messages: ${conversation.numMessages}`);
        
        // Accessing messages related to this conversation
        for (const objId of conversation.objIds) {
            const message = response.messages[objId];
            if (message) {
                console.log(`Message ID: ${message.id}`);
                console.log(`Author: ${message.author.name}`);
                console.log(`Date: ${message.date}`);
                console.log(`Body: ${message.bodyMarkdown}`);
                
            }
        }
        console.log(`--------------------------------`);
    }
}