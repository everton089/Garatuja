import { ToDo, Item } from './core.ts';

const file = process.argv[2]
const command = process.argv[3];

if (!file) {
  console.error("Por favor, forneça o caminho do arquivo.");
  process.exit(1);
}

const todo = new ToDo(file);

if (command === "add") {
  const itemDescription = process.argv[4];
  
  if (!itemDescription) {
    console.error("Por favor, forneça uma descrição para o item.");
    process.exit(1);
  }

  const item = new Item(itemDescription);
  await todo.addItem(item);
  console.log(`Item "${itemDescription}" adicionado com sucesso!`);
  process.exit(0);
}

if (command === "list") {
  const items = await todo.getItems();

  if (items.length === 0) {
    console.log("Nenhum item na lista.");
    process.exit(0);
  }

  console.log("Lista de itens:");
  items.forEach((item, index) => console.log(`${index}: ${item.toJSON().description}`));
  process.exit(0);
}

if (command === "update") {
  const indexStr = process.argv[4];
  const newDescription = process.argv[5];
  
  if (!indexStr || isNaN(parseInt(indexStr)) || !newDescription) {
    console.error("Por favor, forneça o índice e a nova descrição.");
    process.exit(1);
  }

  const index = parseInt(indexStr);

  try {
    const newItem = new Item(newDescription);
    await todo.updateItem(index, newItem);
    console.log(`Item no índice ${index} atualizado com sucesso!`);
    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error(`Erro ao atualizar item: ${message}`);
    process.exit(1);
  }
}

if (command === "remove") {
  const indexStr = process.argv[4];
  
  if (!indexStr || isNaN(parseInt(indexStr))) {
    console.error("Por favor, forneça o índice do item a ser removido.");
    process.exit(1);
  }

  const index = parseInt(indexStr);

  try {
    await todo.removeItem(index);
    console.log(`Item no índice ${index} removido com sucesso!`);
    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error(`Erro ao remover item: ${message}`);
    process.exit(1);
  }
}

console.error("Comando desconhecido. Use 'add', 'list', 'update' ou 'remove'.");
process.exit(1);