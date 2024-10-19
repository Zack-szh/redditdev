import dotenv from 'dotenv'; 
import fs from 'fs'; 

dotenv.config(); 

const clientId = process.env.REDDIT_CLIENT_ID;
const clientSecret = process.env.REDDIT_CLIENT_SECRET;
const accessToken = process.env.REDDIT_ACCESS_TOKEN;


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

        const data = JSON.parse(responseText);
        console.log('Parsed Data:', JSON.stringify(data, null, 2));
        return data;
    } catch (error) { 
        console.error('Error fetching modmail:', error);
    }
}

export default getModmail; 