javascript: {
	const port = 'ws://localhost:8080';
	const ws = new WebSocket(port);
	
	ws.addEventListener('open', () => {
		console.log(`Succesfully connected to port: ${port}`);
		let update = prompt("Update");
		if(update != "cancel" && update != undefined) {
			ws.send(`UPD [${update}]`);
		}
	});
	
	ws.addEventListener('message', (data) => {
		if(data.data == "END") {
			alert("Update succesfull");
            ws.close(1000, "done with service");
        }
	});
}