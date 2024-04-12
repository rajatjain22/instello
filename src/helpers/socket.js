import io from "socket.io-client"; // Add this

let socketData;

const connectSocket = (user_id) => {
    try {
        socketData = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
            query: `user_id=${user_id}`,
        });
    } catch (error) {
      console.log("socket connection error: ",error)
    }
    return socketData;
};

export { socketData, connectSocket };
