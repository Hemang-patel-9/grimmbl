import React, { useRef, useState, useEffect } from "react";
import "../styles/canvas.game.css";
import dustbin from "../assets/dustbin.png";
import paint from "../assets/paint.png"
import brush from "../assets/brush.png";
import eraser from "../assets/eraser.png";

function Canvas() {
	const [isDrawing, setIsDrawing] = useState(false);
	const [color, setColor] = useState("#3B3B3B");
	const [size, setSize] = useState("3");
	const canvasRef = useRef(null);
	const ctx = useRef(null);
	const timeout = useRef(null);
	const [cursor, setCursor] = useState("default");

	useEffect(() => {
		const canvas = canvasRef.current;
		ctx.current = canvas.getContext("2d");

		//Resizing
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;

	}, [ctx]);

	const startPosition = ({ nativeEvent }) => {
		setIsDrawing(true);
		draw(nativeEvent);
	};

	const finishedPosition = () => {
		setIsDrawing(false);
		ctx.current.beginPath();
	};

	const draw = ({ nativeEvent }) => {
		if (!isDrawing) {
			return;
		}
		console.log(nativeEvent);
		const canvas = canvasRef.current;
		ctx.current = canvas.getContext("2d");
		ctx.current.lineWidth = size;
		ctx.current.lineCap = "round";
		ctx.current.strokeStyle = color;
		ctx.current.lineTo(nativeEvent.clientX, nativeEvent.clientY);
		ctx.current.stroke();
		ctx.current.beginPath();
		ctx.current.moveTo(nativeEvent.clientX, nativeEvent.clientY);
	};

	const drawRect = (e) =>{
		ctx.current.strokeRect(e.offsetX,e.offsetY, e.offsetX,e.offsetY);
	}

	const clearCanvas = () => {
		localStorage.removeItem("canvasimg");
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		context.fillStyle = "white";
		context.fillRect(0, 0, canvas.width, canvas.height);
	};

	const getPen = () => {
		setCursor("default");
		setSize("3");
		setColor("#3B3B3B");
	};

	const eraseCanvas = () => {
		setCursor("grabbing");
		setSize("20");
		setColor("#FFFFFF");

		if (!isDrawing) {
			return;
		}
	};

	return (
		<>
			{/* <div className="block">
				<button onClick={getPen} className="btn-width">
					Pencil
				</button>
				<div className="btn-width">
					<input
						id="inputColor"
						type="color"
						value={color}
						onChange={(e) => setColor(e.target.value)}
					/>
				</div>
				<div>
					<select
						className="btn-width"
						value={size}
						onChange={(e) => setSize(e.target.value)}
					>
						<option> 1 </option>
						<option> 3 </option>
						<option> 5 </option>
						<option> 10 </option>
						<option> 15 </option>
						<option> 20 </option>
						<option> 25 </option>
						<option> 30 </option>
					</select>
				</div>
				<button id="clearCanvasBoard" onClick={clearCanvas} className="btn-width">
					Clear
				</button>
				<div>
					<button onClick={eraseCanvas} className="btn-width">
						Eras
					</button>
				</div>
			</div> */}
			<canvas
				className="bg-white h-[79%] w-full"
				style={{ cursor: cursor }}
				onMouseDown={startPosition}
				onMouseUp={finishedPosition}
				onMouseMove={draw}
				ref={canvasRef}
			/>
			<div className="w-full h-[8%] flex flex-row border-t-2 border-black">
				<div className="w-[50%] colors">
					<p>Colors</p>
					<div className="w-full h-[80%] flex justify-center items-start flex-row mygap">
						<div className="h-[50%] w-[20px] mt-1 bg-red-700" onClick={()=>{setColor("red")}}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-blue-700" onClick={()=>{setColor("blue")}}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-green-700" onClick={()=>{setColor("green")}}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-yellow-300" onClick={()=>{setColor("yellow")}}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-pink-200" onClick={()=>{setColor("pink")}}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-purple-700" onClick={()=>{setColor("purple")}}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-cyan-400" onClick={()=>{setColor("cyan")}}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-black" onClick={()=>{setColor("black")}}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-white" onClick={()=>{setColor("white")}}></div>
						<div className="h-[50%] w-[20px] mt-1"><input type="color" className="h-full w-full" onChange={(e)=>{
							setColor(e.target.value);
						}}/></div>
					</div>
				</div>
				<div className="w-[23%] shapes">
					<p>Shapes</p>
					<div className="w-full h-[80%] flex justify-start items-start flex-row mygap pl-2">
						<div className="h-[50%] w-[20px] mt-1 square" onClick={drawRect}></div>
						<div className="h-[50%] w-[20px] mt-1 rounded-full circle"></div>
						<div className="h-[50%] w-[20px] mt-1 triangle"></div>
					</div>
				</div>
				<div className="w-[27%] actions">
					<p>Actions</p>
					<div className="w-full h-[80%] flex justify-start items-start flex-row mygap pl-2">
						<div className="h-[55%] w-[20px] mt-1 dustbin border border-black" onClick={getPen}><img src={brush} className="h-full w-full object-fill  mix-blend-darken" alt="not found" /></div>
						<div className="h-[55%] w-[20px] mt-1 dustbin border border-black"><img src={paint} className="h-full w-full object-fill mix-blend-darken" alt="not found" /></div>
						<div className="h-[55%] w-[20px] mt-1 dustbin border border-black" onClick={eraseCanvas}><img src={eraser} className="h-full w-full object-fill mix-blend-darken" alt="not found" /></div>
						<div className="h-[58%] w-[20px] mt-1 dustbin border border-black" onClick={clearCanvas}><img src={dustbin} className="h-full w-full object-fill mix-blend-darken" alt="not found" /></div>
					</div>
				</div>
			</div>

		</>
	);
}

// const clearCanvas = () =>{
// 	document.getElementById("clearCanvasBoard").click();
// }
// const setCanvasColor = (e) =>{
// 	console.log(e.target.value);
// 	// setColor(e.target.value)
// }
// const setCanvasFixedColor = (val) =>{
// 	document.getElementById("inputColor").value = val;
// }
export default Canvas;