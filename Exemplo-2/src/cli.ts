import * as server from "./server.ts";

const comand = process.argv[2]
const value = process.argv[3]

if(comand === "read"){
    const itens = await server.loadItem();
    console.log(itens.json()) 
    process.exit(0)
}

if (comand === "create"){
    
}