import io from "socket.io-client";
import SERVER_URL from "./Server_URL";

const socket = ()=> {
    (async()=> {
        const conn = await io(SERVER_URL.URL, {
            transports: ["websocket"],
            jsonp: false,
        });
        return conn;
    })();
    
}

export default socket;