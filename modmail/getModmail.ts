import dotenv from 'dotenv'; 
import fs from 'fs'; 

dotenv.config(); 

const clientId = process.env.REDDIT_CLIENT_ID;
const clientSecret = process.env.REDDIT_CLIENT_SECRET;
const accessToken = process.env.REDDIT_ACCESS_TOKEN;

export interface Message {
    body: string;
    author: { name: string; id: string }; // Assuming author has name and id
    isInternal: boolean;
    date: string; // ISO date string
    bodyMarkdown: string;
    id: string;
    participatingAs: string;
}

export interface Conversation {
    isAuto: boolean;
    participant: { name: string; id: string }; // Assuming participant has name and id
    objIds: string[]; // Assuming objIds is an array of strings
    isRepliable: boolean;
    lastUserUpdate: string | null;
    isInternal: boolean;
    lastModUpdate: string; // ISO date string
    authors: { name: string; id: string }[]; // Assuming authors is an array of user objects
    lastUpdated: string; // ISO date string
    participantSubreddit: Record<string, unknown>; // Placeholder for subreddit data
    legacyFirstMessageId: string;
    state: number; // Assuming this is a status code
    conversationType: string;
    lastUnread: string | null; // ISO date string or null
    owner: { name: string; id: string }; // Assuming owner has name and id
    subject: string;
    id: string;
    isHighlighted: boolean;
    numMessages: number;
}

export interface ApiResponse {
    conversations: Record<string, Conversation>;
    messages: Record<string, Message>;
}

async function getModmail(): Promise<any> { 
    try { ;
        const response = await fetch('https://oauth.reddit.com/api/mod/conversations', { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': 'ZSSZH/1.0',
                'srName': 'appealmodtest'
            }
        }); 

        console.log('Response Status:', response.status);
        console.log('Response Headers:', Object.fromEntries(response.headers));

        const responseText = await response.text();
        //console.log('Response Body:', responseText); 

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
        }

        const data: ApiResponse = JSON.parse(responseText);
        fs.writeFileSync('modmail_data.json', JSON.stringify(data, null, 2), 'utf-8');
        //console.log('Parsed Data:', JSON.stringify(data, null, 2));
        return data;
    } catch (error) { 
        console.error('Error fetching modmail:', error);
    }
}

export default getModmail; 