
import dotenv from 'dotenv'; 
dotenv.config(); 

const accessToken = process.env.REDDIT_ACCESS_TOKEN;

async function getModmail(): Promise<void> { 
    try { 
        const response = await fetch('https://oauth.reddit.com/api/mod/conversations', { 
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
                'srName': 'appealmodtest', 
                'User-Agent': 'ZSSZH'
            }
        }); 

        const data = await response.json(); 
        console.log(data); 
    } catch (error) { 
        console.error('Error fetching modmail:', error); 
    }
}

getModmail(); 