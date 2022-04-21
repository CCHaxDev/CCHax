javascript: {
    async function getClient() {
        try {
            let res = await fetch("https://pastebin.com/raw/0BnNh59B");
            return await res.text();
        }
        catch(e) {
            alert(e);
        }
    }

    alert("running");
    
    getClient();
}