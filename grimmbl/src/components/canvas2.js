import React, { useRef, useState, useEffect } from "react";
import "../styles/canvas.game.css";
import dustbin from "../assets/dustbin.png";
import brush from "../assets/brush.png";
import eraser from "../assets/eraser.png";

function Canvas2() {

	const canvasRef = useRef(null);
	const ctxRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [color, setColor] = useState("#3B3B3B");
	const [cursor, setCursor] = useState("pointer");
	const [tool, setTool] = useState("brush");
	const [prevMouseX, setPrevMouseX] = useState(0);
	const [prevMouseY, setPrevMouseY] = useState(0);
	const [snapshot, setSnapshot] = useState();

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		canvas.width = canvas.offsetWidth * 2;
		canvas.height = canvas.offsetHeight * 2;
		ctx.scale(2, 2);
		ctx.lineCap = "round";
		ctxRef.current = ctx;

	}, []);

	function startDrawing({ nativeEvent }) {
		setPrevMouseX(nativeEvent.offsetX);
		setPrevMouseY(nativeEvent.offsetY);
		ctxRef.current.beginPath();
		ctxRef.current.moveTo(nativeEvent.offsetX, nativeEvent.offsetY);
		setIsDrawing(true);
		setSnapshot(ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
	}
	function finishDrawing() {
		setIsDrawing(false);
		ctxRef.current.closePath();
	}
	function draw({ nativeEvent }) {
		if (!isDrawing) {
			return;
		}
		ctxRef.current.putImageData(snapshot, 0, 0);
		ctxRef.current.strokeStyle = color;
		ctxRef.current.lineWidth = 3;
		if (tool === "brush" || tool === "eraser") {
			ctxRef.current.strokeStyle = tool==="eraser"?"white":color;
			ctxRef.current.lineWidth = tool==="eraser"?7:3;
			ctxRef.current.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
			ctxRef.current.stroke();
		}
		else if (tool === "rectangle") {
			drawRectangle(nativeEvent);
		}
		else if (tool === "circle") {
			drawCircle(nativeEvent);
		}
		else
		{
			drawTriangle(nativeEvent);
		}
	}
	function clearCanvas() {
		const canvas = canvasRef.current;
		ctxRef.current.clearRect(0, 0, canvas.height, canvas.width);
	}
	function drawRectangle(data) {
		ctxRef.current.strokeRect(data.offsetX, data.offsetY, prevMouseX - data.offsetX, prevMouseY - data.offsetY);
	}
	function drawCircle(data) {
		ctxRef.current.beginPath();
		let redius = Math.sqrt(Math.pow((prevMouseX - data.offsetX), 2) + Math.pow((prevMouseY - data.offsetY), 2))
		ctxRef.current.arc(prevMouseX, prevMouseY, redius, 0, 2 * Math.PI);
		ctxRef.current.stroke();
	}
	function drawTriangle(data)
	{
		ctxRef.current.beginPath();
		ctxRef.current.moveTo(prevMouseX,prevMouseY);
		ctxRef.current.lineTo(data.offsetX,data.offsetY);
		ctxRef.current.lineTo(prevMouseX*2 - data.offsetX,data.offsetY);
		ctxRef.current.closePath();
		ctxRef.current.stroke();
	}
	return <>
		<div className="h-full w-full">
			<canvas className="bg-white h-[79%] w-full"
				style={{ cursor: cursor}}
				onMouseDown={startDrawing}
				onMouseUp={finishDrawing}
				onMouseMove={draw}
				ref={canvasRef}
			/>
			<div className="w-full h-[8%] flex flex-row border-t-2 border-black pl-1">
				<div className="w-[50%] colors">
					<p>Colors</p>
					<div className="w-full h-[80%] flex justify-start items-start flex-row mygap pl-2">
						<div className="h-[50%] w-[20px] mt-1 bg-red-700" onClick={async () => { setColor("red"); }}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-blue-700" onClick={async () => { setColor("blue"); }}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-green-700" onClick={async () => { setColor("green"); }}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-yellow-300" onClick={async () => { setColor("yellow"); }}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-pink-200" onClick={async () => { setColor("pink"); }}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-purple-700" onClick={async () => { setColor("purple"); }}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-cyan-400" onClick={async () => { setColor("cyan"); }}></div>
						<div className="h-[50%] w-[20px] mt-1 bg-black" onClick={async () => { setColor("black"); }}></div>
						<div className="h-[50%] w-[20px] mtInput"><input type="color" className="h-full w-full" onClick={(e) => { setColor(e.target.value) }} /></div>
					</div>
				</div>
				<div className="w-[23%] shapes pl-1">
					<p>Shapes</p>
					<div className="w-full h-[80%] flex justify-start items-start flex-row mygap pl-2">
						<div className="h-[50%] w-[20px] mt-1 square" onClick={() => { setTool("rectangle") }}></div>
						<div className="h-[50%] w-[20px] mt-1 rounded-full circle" onClick={() => { setTool("circle") }}></div>
						<div className="h-[50%] w-[20px] mt-1 triangle" onClick={()=>{setTool("triangle")}}></div>
					</div>
				</div>
				<div className="w-[27%] actions">
					<p>Actions</p>
					<div className="w-full h-[80%] flex justify-start items-start flex-row mygap pl-2">
						<div className="h-[55%] w-[20px] mt-1 dustbin border border-black" onClick={()=>{setTool("brush");setCursor(`url(${brush}),auto`)}}><img src={brush} className="h-full w-full object-fill  mix-blend-darken" alt="not found" /></div>
						<div className="h-[55%] w-[20px] mt-1 dustbin border border-black" onClick={() => { setTool("eraser");setCursor("pointer")}}><img src={eraser} className="h-full w-full object-fill mix-blend-darken" alt="not found" /></div>
						<div className="h-[58%] w-[20px] mt-1 dustbin border border-black" onClick={clearCanvas}><img src={dustbin} className="h-full w-full object-fill mix-blend-darken" alt="not found" /></div>
					</div>
				</div>
			</div>		
		</div>
	</>
}
export default Canvas2;