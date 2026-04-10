const filePach = "Itens.json"

export async function saveItem(item: string){
    const file = Bun.file(filePach)
    const content = await file.json()
    content.push(item)
    const newContent = JSON.stringify(content)
    await Bun.write(filePach, newContent)
}

export function deleteItem(item: string){

}

export function loadItem(){
const file = Bun.file(filePach)
return file.json()
}

export function updateItem(oldItem: string, newItem: string){

}

 saveItem("fsths")