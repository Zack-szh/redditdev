import getModmail, { fetchBannedUsers } from './getModmail';
import * as Modmail_interface from './modmail_interface';

interface User { 
    name: string; 
    conversationId: string;
}

const bannedUsers: User[] = []; 
const banned_list: string[] = []; 

async function main() { 
    console.log("hello world!");
    try { 
        // First, fetch the banned users
        const bannedUsersData = await fetchBannedUsers('appealmodtest', 50);
        for (let i = 0; i < bannedUsersData.children.length; i++) {
            banned_list.push(bannedUsersData.children[i].name);
        }

        // Then, fetch and process the modmail data
        const data = await getModmail();
        processResponse(data);

        // Now print the banned users
        for (let i = 0; i < bannedUsers.length; i++) {
            console.log(`Banned User: ${bannedUsers[i].name} - Conversation ID: ${bannedUsers[i].conversationId}`);
        }

    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main(); 


function processResponse(response: Modmail_interface.Modmail) {
    // Accessing conversations
    for (const convId of response.conversationIds) {
        const conversation = response.conversations[convId as keyof Modmail_interface.Conversations];
        console.log(`Conversation ID: ${convId}`);
        console.log(`Subject: ${conversation.subject}`);
        console.log(`Number of Messages: ${conversation.numMessages}`);
        
        // Accessing messages related to this conversation
        for (const objId of conversation.objIds) {
            const message = response.messages[objId.id];
            if (message) {
                console.log(`Message ID: ${message.id}`);
                console.log(`Author: ${message.author.name}`);
                console.log(`Date: ${message.date}`);
                console.log(`Body: ${message.bodyMarkdown}`);
                if (isBanned(message.author.name)){ 
                    bannedUsers.push({name: message.author.name, conversationId: convId}); 
                }
            }
        }
        console.log(`--------------------------------`);
    }
}

function isBanned(name: string) : boolean { 
    //we already have a list of banned users in banned_list
    //we can check if the user is in the list and return true if they are, false otherwise
    return banned_list.includes(name); 
}




