import {Server} from 'socket.io';
import jwt from 'jsonwebtoken'
let socketIdToUserId = new Map();

const configureSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: '*'
		}
	});

	io.use((socket, next) => { //This is middleware for the socket connection
		const token = socket.handshake.auth.sessionToken
		if (!token) next(new Error('Please provide a token'));
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
			if (err) new(new Error("Invalid token"));
			socket.username = userInfo.username;
		})
		next();
	})

	io.on('connection', (socket) => {
		console.log('User', socket.username, 'connected with id:', socket.id);
		socketIdToUserId.set(socket.id, socket.username);
		socket.on('disconnect', () => {
			console.log("User", socket.username, 'with ID:', socket.id, 'disconnected');
		})
	})
}

export default configureSocket;