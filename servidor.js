
const app = require("./app");
const port = 8000;

app.listen(port, '0.0.0.0', () => {
	console.log(`Servidor rodando na porta ${port}`)
	console.log("Para desativar o servidor use ctrl + c")
});