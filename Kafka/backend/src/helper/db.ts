import { primsaClient } from "./prismaClient";

export async function addTodo({title}: {title: string}){
    console.log("Title is: ", title)
    const resp = await primsaClient.todo.create({
        data: {
            title : title
        }
    })
    return resp;
}

export async function getTodos(){
    const resp = await primsaClient.todo.findMany();
    return resp;
}