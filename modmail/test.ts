import getModmail, { fetchBannedUsers, getPrivateNote } from './getModmail';
import * as Modmail_interface from './modmail_interface';

async function main(){ 
    console.log("Hello world");
    getPrivateNote("modmail_data.json");
}

main(); 