// Generated by https://quicktype.io

export interface Conversation {
    conversations:   Conversations;
    messages:        { [key: string]: Message };
    viewerId:        string;
    conversationIds: string[];
}

export interface Conversations {
    "2bn7ds": The25_Fw81;
    "2bn78t": The25_Fw81;
    "2afym5": The25_Fw81;
    "2bn7eq": The25_Fwdj;
    "27z0qn": The25_Fw81;
    "25fwdj": The25_Fwdj;
    "2bn7cs": The25_Fw81;
    "2b12zw": The25_Fw81;
    "25fw81": The25_Fw81;
}

export interface The25_Fw81 {
    isAuto:               boolean;
    participant:          ParticipantElement;
    objIds:               ObjID[];
    isRepliable:          boolean;
    lastUserUpdate:       null | string;
    isInternal:           boolean;
    lastModUpdate:        null | string;
    authors:              ParticipantElement[];
    lastUpdated:          string;
    participantSubreddit: ParticipantSubredditClass;
    legacyFirstMessageId: string;
    state:                number;
    conversationType:     string;
    lastUnread:           null;
    owner:                Owner;
    subject:              string;
    id:                   string;
    isHighlighted:        boolean;
    numMessages:          number;
}

export interface ParticipantElement {
    isMod:         boolean;
    isAdmin:       boolean;
    name:          Name;
    isOp:          boolean;
    isParticipant: boolean;
    isApproved:    boolean;
    isHidden:      boolean;
    id:            number;
    isDeleted:     boolean;
}

export enum Name {
    InteractiveWorkflow = "interactive-workflow",
    Moderationresearch = "moderationresearch",
    TryOwn7908 = "TryOwn7908",
    Zsszh = "ZSSZH",
}

export interface ObjID {
    id:  string;
    key: string;
}

export interface Owner {
    displayName: string;
    type:        string;
    id:          string;
}

export interface ParticipantSubredditClass {
}

export interface The25_Fwdj {
    isAuto:               boolean;
    participant:          ParticipantSubredditClass;
    objIds:               ObjID[];
    isRepliable:          boolean;
    lastUserUpdate:       null;
    isInternal:           boolean;
    lastModUpdate:        string;
    authors:              ParticipantElement[];
    lastUpdated:          string;
    participantSubreddit: ParticipantSubredditClass;
    legacyFirstMessageId: string;
    state:                number;
    conversationType:     string;
    lastUnread:           null | string;
    owner:                Owner;
    subject:              string;
    id:                   string;
    isHighlighted:        boolean;
    numMessages:          number;
}

export interface Message {
    body:            string;
    author:          ParticipantElement;
    isInternal:      boolean;
    date:            string;
    bodyMarkdown:    string;
    id:              string;
    participatingAs: string;
}