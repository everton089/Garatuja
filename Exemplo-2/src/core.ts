const jsonFilePath = __dirname + '/data.todo.json';
const list: string[] = await loadFromFile();

async function loadFromFile() {
  try {
    const file = Bun.file(jsonFilePath);
    const content = await file.text();
    return JSON.parse(content) as string[];
  } catch (error: any) {
    if (error.code === 'ENOENT')
      return [];
    throw error;
  }
}

async function saveToFile() {
  try {
    await Bun.write(jsonFilePath, JSON.stringify(list));
  } catch (error: any) {
   throw new Error("Erro ao salvar os dados no arquivo: " + error.message);
  }
}

async function addItem(item: string) {
  list.push(item);
  await saveToFile();
}

async function getItems() {
  return list;
}

async function updateItem(index: number, newItem: string) {
  if (index < 0 || index >= list.length)
    throw new Error("Index fora dos limites");
  list[index] = newItem;
  await saveToFile();
}

async function removeItem(index: number) {
  if (index < 0 || index >= list.length)
    throw new Error("Index fora dos limites");
  list.splice(index, 1);
  await saveToFile();
}

async function listEspecifico(index: number) {
 return list[index]
}

export default { addItem, getItems, updateItem, removeItem };


// export class Item {
//   private description: string;

//   constructor(description: string) {
//     this.description = description;
//   }

//   updateDescription(newDescription: string) {
//     this.description = newDescription;
//   }

//   toJSON() {
//     return {
//       description: this.description
//     }
//   }
// }

// export class ToDo {
//   private filepath: string;
//   private items: Promise<Item[]>;

//   constructor(filepath: string) {
//     this.filepath = filepath;
//     this.items = this.loadFromFile();
//   }

//   private async saveToFile() {
//     try {
//       const items = await this.items;
//       const file = Bun.file(this.filepath);
//       const data = JSON.stringify(items);
//       return Bun.write(file, data);
//     } catch (error) {
//       console.error('Error saving to file:', error);
//     }
//   }

//   private async loadFromFile() {
//     const file = Bun.file(this.filepath);
//     if (!(await file.exists()))
//       return []
//     const data = await file.text();
//     return JSON.parse(data).map((itemData: any) => new Item(itemData.description));
//   }

//   async addItem(item: Item) {
//     const items = await this.items;
//     items.push(item);
//     this.saveToFile();
//   }

//   async getItems() {
//     return await this.items
//   }

//   async updateItem(index: number, newItem: Item) {
//     const items = await this.items;
//     if (index < 0 || index > items.length) 
//       throw new Error('Index out of bounds');
//     items[index] = newItem;
//     this.saveToFile();
//   }

//   async removeItem(index: number) {
//     const items = await this.items;
//     if (index < 0 || index > items.length) 
//       throw new Error('Index out of bounds');
//     items.splice(index, 1);
//     this.saveToFile();
//   }

//   async findItemByDescription(description: string): Promise<Item | undefined> {
//     const items = await this.items;
//     return items.find(item => item.toJSON().description === description);    
//   }

//   async findItemByIndex(index: number): Promise<Item | undefined> {
//     const items = await this.items;
//     if (index < 0 || index > items.length) 
//       throw new Error('Index out of bounds');
//     return items[index];
//   }
// }