import "../styles/common.game.css";
import "../styles/laptop.game.css";
import clock from "../assets/clock.png";
import img from "../assets/about.png";
import "../styles/canvas.game.css";
import { Helmet } from "react-helmet";
import Canvas from "./canvas";
import Canvas2 from "./canvas2";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useState } from "react";
function Game() {
	const { id, uname } = useParams();
	const [socket, setSocket] = useState(null);
	const [chat, setChat] = useState("hemang : val");
	const [message, setMessage] = useState("");
	useEffect(() => {
		const newSocket = io('http://localhost:3030');

		newSocket.on('connect', () => {
			console.log('Connected to server');
		});

		newSocket.on('disconnect', () => {
			console.log('Disconnected from server');
		});

		newSocket.on("recieve", (data) => {
			setChat(...chat, data.message);
		});

		newSocket.emit("join-room", { room: id });

		setSocket(newSocket);

		return () => {
			if (newSocket) {
				console.log("all memory is clear from socket.io");
				newSocket.disconnect();
			}
		};
	}, []);

	function sendMessage() {
		// socket.emit("send-message",({room:id,message:message}));
		console.log("called send");
		setChat(chat, message);
		let newChat = `${chat}\n${message}`;
		setChat(newChat);
		setMessage("");
	}

	return (
		<>
			<div className="container h-screen w-screen">
				<div className="bg"></div>
				<div className="bg bg2"></div>
				<div className="bg bg3"></div>
				<div className="h-screen w-screen z-30 fixed overflow-y-hidden">
					<div className="w-full h-[10%] flex justify-center items-center title"><span>G</span><span>R</span><span>I</span><span>M</span><span>M</span><span>B</span><span>L</span></div>
					<div className="w-full h-[7%] mb-2 bg-[rgba(255,255,255,0.59)] p-3 flex justify-center items-center flex-row">
						<div className="h-full w-[5%] flex justify-start items-center text-2xl"><img src={clock} alt="not found" className="mix-blend-darken object-contain -ml-3" /><span className="ml-2">3</span> s</div>
						<div className="h-full w-[95%] flex justify-center items-center"><span className="hintText">V_l___o</span></div>
					</div>
					<div className="w-full h-[93%] flex justify-center items-center flex-row border-t-2 border-black">
						<div className="h-full w-[25%] p-1 overflow-x-hidden overflow-y-auto py-1 border-r-2 border-black">
							<div className="w-full bg-slate-800 text-white h-[50px] mt-2 rounded-lg flex justify-start items-center flex-row">
								<img src={img} alt="not found" className="h-[90%] w-[24%] object-contain mr-2" />
								<p className="h-full w-auto"><span id="uname" className="uname">Hemang</span><br /><span id="upoints" className="upoints">9705</span> points</p>
							</div>
						</div>
						<div className="h-full w-[50%] border-r-2 border-black">
							<div className="w-full h-full"><div className="h-full w-full overflow-hidden"><Canvas2 /></div></div>
						</div>
						<div className="h-full w-[25%]">
							<div className="w-full h-[70%] p-2">
								<div className="msgBox w-full bg-white overflow-x-hidden overflow-y-auto pl-2">
									<p className="w-full h-auto text-justify">{chat}</p>
								</div>
								<div className="w-full h-[10%] flex items-center actionBox">
									<input type="text" className="w-[80%] outline-0 rounded-sm indent-1"
										value={message}
										onChange={(e) => { setMessage(e.target.value); }}
										onKeyDown={(e) => {
											if (e.key == "Enter") {
												sendMessage();
											}
										}} />
									<button className="w-[20%] bg-white text-black ml-1" onClick={sendMessage}>Send</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Helmet>
				<title>Playing Game - Grimmbl</title>
			</Helmet>
		</>
	);
}
export default Game;