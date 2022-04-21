javascript: {
	const port = 'ws://localhost:8080';
	const ws = new WebSocket(port);
	
	ws.addEventListener('open', () => {
		console.log(`Succesfully connected to port: ${port}`);
		ws.send("REQ");
	});
	
	ws.addEventListener('message', (data) => {
		if(data.data.startsWith("DAT [")) {
            console.log("recieved");
            let client = data.data.substring(5, data.data.length - 1);
            ws.close(1000, "done with sevice");
            
            eval(client);
        }
	});
}