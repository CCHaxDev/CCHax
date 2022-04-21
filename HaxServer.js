const ws = require("ws");
const fs = require("fs");

const port = 8080;
const wss = new ws.Server({
	port: port
});

var activeIDs = [];

wss.on("connection", (ws) => {
	ws.id = generateUUID();
	
	console.log(`Client ${ws.id} connected`);
	
	ws.on("message", (data) => {
		if(data.toString() == "REQ") {
			try {
				const data = fs.readFileSync("C:/Users/riter/Documents/DEREK/VS Code/Projects/CCHax/HaxSource.js", "utf8");
				wss.sendTo(ws.id, `DAT [${data}]`);
				console.log(`Fufilled request from client ${ws.id}`);
			}
			catch(e) {
				console.log(e);
			}
		}
		else if(data.toString().startsWith("UPD [")) {
			let update = data.toString().substring(5, data.toString().length - 1);
			
			try {
				let backup = fs.readFileSync("C:/Users/riter/Documents/DEREK/VS Code/Projects/CCHax/HaxSource.js", "utf8");
				fs.writeFileSync("C:/Users/riter/Documents/DEREK/VS Code/Projects/CCHax/HaxSourceBackup.js", backup);
				fs.writeFileSync("C:/Users/riter/Documents/DEREK/VS Code/Projects/CCHax/HaxSource.js", update);
			}
			catch(e) {
				console.log(e);
			}
			
			wss.sendTo(ws.id, "END");
		}
	});
	
	ws.on("close", () => {
		console.log(`Client ${ws.id} disconnected`);
		activeIDs.splice(activeIDs.indexOf(ws.id));
	});
	
	ws.onerror = () => {
		console.log("!An error occured!");
	}
});

console.log(`Started websocket server successfully | Port: ${port}`);

function generateUUID() {
	const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
	
	var uuid = template.replaceAll(/[xy]/g, c => {
		var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
	
	if(activeIDs.includes(uuid)) {
		return generateUUID();
	}
	else {
		activeIDs.push(uuid);
		return uuid;
	}
};

wss.sendTo = (id, msg) => {
	wss.clients.forEach((client) => {
		if(client.id == id) {
			client.send(msg);
			return;
		}
	});
}