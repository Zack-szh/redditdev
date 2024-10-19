type user = [
    name: string, 
    isBanned: boolean, 
]

const users: user[] = []; 

users.push(["1", true]); 
users.push(["2", false]); 
users.push(["3", true]); 
users.push(["4", false]); 

for (let i = 0; i < users.length; i++){ 
    if (users[i][1] == true){ 
        console.log(`User ${users[i][0]} is banned`);
    }else{ 
        console.log(`User ${users[i][0]} is not banned`);
    }
}



