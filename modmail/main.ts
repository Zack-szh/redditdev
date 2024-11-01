import getModmail, { fetchBannedUsers, getPrivateNote } from './getModmail';
import * as Modmail_interface from './modmail_interface';

interface User { 
    name: string; 
    conversationId: string;
}

const bannedUsers: User[] = [];     //hash map containing banned user and associated conversation id
const banned_list: string[] = [];   //store all banned members of a subreddit

async function main() { 
    console.log("hello world!");
    try { 
        //fetch list of banned user from specified subreddit
        const subreddit: string = 'appealmodtest'; 
        const bannedUsersData = await fetchBannedUsers(subreddit, 50);
        for (let i = 0; i < bannedUsersData.children.length; i++) {
            banned_list.push(bannedUsersData.children[i].name);
        }

        //fetch and process modmail data
        const data = await getModmail();
        processResponse(data);

        //print all banned users and its associated conversation id
        for (let i = 0; i < bannedUsers.length; i++) {
            console.log(`Banned User: ${bannedUsers[i].name} - Conversation ID: ${bannedUsers[i].conversationId}`);
        }

        //print all messages that contain private note
        getPrivateNote(data); 

    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main(); 


function processResponse(response: Modmail_interface.Modmail) {
    //conversations
    for (const convId of response.conversationIds) {
        const conversation = response.conversations[convId as keyof Modmail_interface.Conversations];
        console.log(`Conversation ID: ${convId}`);
        console.log(`Subject: ${conversation.subject}`);
        console.log(`Number of Messages: ${conversation.numMessages}`);
        
        //messages in conversation
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




