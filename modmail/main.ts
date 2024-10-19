import getModmail from './getModmail';


async function main() { 
    console.log("hello world!");
    try { 
        const data = await getModmail(); 
        console.log(data); 
    } catch (error) { 
        console.error('Error fetching modmail:', error);
    }
}

interface User { 
    isMod: boolean;
    isAdmin: boolean;
    name: string;
    isOp: boolean;
    isParticipant: boolean;
    isApproved: boolean;
    isHidden: boolean;
    id: number;
    isDeleted: boolean;
}

interface Conversation {
    isAuto: boolean;
    participant: User;
    objIds: { id: string; key: string }[];
    isRepliable: boolean;
    lastUserUpdate: string | null;
    isInternal: boolean;
    lastModUpdate: string;
    authors: User[];
    lastUpdated: string;
    participantSubreddit: object;
    legacyFirstMessageId: string;
    state: number;
    conversationType: string;
    lastUnread: string | null;
    owner: { displayName: string; type: string; id: string };
    subject: string;
    id: string;
    isHighlighted: boolean;
    numMessages: number;
  }