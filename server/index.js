const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const io = require("socket.io")(http,{cors:
	{
		origin: "*",
	},});
io.on("connection",(socket)=>{
	console.log("user connected! with " + socket.id);

	socket.on("disconnect",()=>{
		console.log("user Disconnect");
	});

	socket.on("join-room",(data)=>{
		socket.join(data.room);
		console.log("user join room "+data.room);
	});
	socket.on("send-message",(data)=>{
		console.log(data.message);
		socket.to(data.id).emit("recieve",({message:data.message}));
	});
});
//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.get('/',(req,res,next)=>{
	res.send("<h1>Hello World!</h1>");
});

app.get("/running",async(req,res,next)=>{
	try {
		let roomID = "running";
		res.status(200).json({ id: roomID });

	}
	catch (err) {
		res.status(500).json({ messgae: "unable to send running ID", error: err.messgae });
	}
});
app.get('/private',async(req,res,next)=>{
	try
	{
		let roomID = "";
		while (roomID.length != 6) {
			roomID = (Math.random() + 1).toString(36).substring(6);
		}
		res.status(200).json({id:roomID});

	}
	catch(err)
	{
		res.status(500).json({messgae:"unable to send private ID",error:err.messgae});
	}
});

//listening server
const PORT = process.env.PORT;
http.listen(PORT,()=>{
	console.log("Server Started on PORT 3030");
});