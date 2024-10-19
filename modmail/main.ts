import getModmail, { fetchBannedUsers } from './getModmail';
import * as Modmail_interface from './modmail_interface';

interface BannedUser { 
    name: string; 
    conversationId: string;
}

const bannedUsers: BannedUser[] = []; 
const banned_list: string[] = []; 

async function main() { 
    console.log("hello world!");
    try { 
        const data = await getModmail(); 
        //console.log(data); 
        //processResponse(data); 
        
        fetchBannedUsers('appealmodtest', 50).then(bannedUsers => {
            //console.log('Banned Users:', bannedUsers);
            //console.log('Banned Users:', bannedUsers.children[0].name);

            for (let i = 0; i < bannedUsers.children.length; i++){ 
                //console.log('Banned Users:', bannedUsers.children[i].name); 
                banned_list.push(bannedUsers.children[i].name); 
            }
            console.log(banned_list); 
        });

    } catch (error) { 
        console.error('Error fetching modmail:', error);
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
                isBanned(message.author); 
            }
        }
        console.log(`--------------------------------`);
    }
}

async function isBanned(user: Modmail_interface.ParticipantElement) : Promise<boolean> { 
    //we already have a list of banned users in banned_list
    //we can check if the user is in the list and return true if they are, false otherwise
    return banned_list.includes(user.name); 
}




