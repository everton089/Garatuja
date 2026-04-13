// const temp: string[]=[]
// const server = Bun.serve({
//   routes: {
//     "/pessoas/:id": (req, res) => new Response(`Hello User ${req.params.id}!`),

//     "/pessoas/criar/:id": (req, res) => {
//      if(!timeStamp.incluedes(req.params.id)){
//         temp.push(req.params.id)
//         return new Response(
//             'ID pessoa ${req.params.id}'
//         )
//      }
//     },

//     "/api/*": Response.json({ message: "Not found" }, { status: 404 }),

//     "/blog/hello": Response.redirect("/blog/hello/world"),

//     "/favicon.ico": Bun.file("./favicon.ico"),
//   },

//   fetch(req) {
//     return new Response("hello", { status: 404 });
//   },
// });

// console.log(`Server running at ${server.url}`);

const temp: string[] = [];

const server = Bun.serve({
  routes: {
    "/pessoas/:id": (req) => {
      return new Response(`Hello User ${req.params.id}!`);
    },

    "/pessoas/criar/:id": (req) => {
      const id = req.params.id;

      if (!temp.includes(id)) {
        temp.push(id);

        return new Response(
          `ID pessoa ${id} criado com sucesso`,
          { status: 201 }
        );
      }

      return new Response(
        `ID pessoa ${id} já existe`,
        { status: 400 }
      );
    },

    "/api/*": () =>
      Response.json({ message: "Not found" }, { status: 404 }),

    "/blog/hello": () =>
      Response.redirect("/blog/hello/world"),

    "/favicon.ico": () =>
      new Response(Bun.file("./favicon.ico")),
  },

  fetch() {
    return new Response("hello", { status: 400 });
  },
});

console.log(`Server running at ${server.url}`);