// Import package Node HTTP + création serveur
const http = require("http")
// Execution de la fonction à chaque appel du serveur
const app = require("./app")

// Renvoi d'un port valide string/number
const normalizePort = val => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

// Port trouvé sinon 3000
const port = normalizePort(process.env.PORT || "3000")
app.set("port", port)

// Si erreur
const errorHandler = error => {
  if (error.syscall !== "listen") {
    throw error
  }
  const address = server.address()
  // Recupération de l'erreur
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(bind + " is already in use.")
      process.exit(1)
      break
    default:
      throw error
  }
}

// Ecoute de l'événement
//Port ou canal consigné sur lequel le serveur s'exécute dans la console.
const server = http.createServer(app)

server.on("error", errorHandler)
server.on("listening", () => {
  const address = server.address()
  const bind = typeof address === "string" ? "pipe " + address : "port " + port
  console.log("Listening on " + bind)
})

server.listen(port)
