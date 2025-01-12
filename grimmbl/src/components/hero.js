import "../styles/hero.css";
import aboutImage from "../assets/about.png";
import htpImage from "../assets/howtoplay.png";
import useImage from "../assets/use.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Hero() {
	const [uname, setUname] = useState("");
	const navigate = useNavigate();
	const validUname = async () => {
		if(uname==""){alert("uname is empty.");return false}
		else if(uname.length>=20){
			alert("Please enter short name");
			return false;
		}
		else
		{
			var regex = /^[a-zA-Z]+$/;
			if (regex.test(uname)) {
				return true;
			} else {
				alert("Please enter only alphabet characters.");
				return false;
			}
		}
	}
	async function startRunningGame() {
		let valid = await validUname();
		if (valid) {
			const data = await fetch("http://localhost:3030/running")
			.then((res) => { return res.json(); })
			.then((res) => { return res });
			navigate("/" + data.id + "/" + uname);
		}
	}
	async function startPersonalGame() {
		let valid = await validUname();
		if (valid) {
			const data = await fetch("http://localhost:3030/private")
				.then((res) => { return res.json() })
				.then((res) => { return res });
			navigate("/" + data.id + "/" + uname);
		}
	}
	return (
		<>
			<div className="container w-screen mybg">
				<div className="bg"></div>
				<div className="bg bg2"></div>
				<div className="bg bg3"></div>
				<div className="main h-full w-full z-20">
					<div className="w-full h-[13%] flex justify-center items-center flex-row nav">
						<span>G</span>
						<span>R</span>
						<span>I</span>
						<span>M</span>
						<span>M</span>
						<span>B</span>
						<span>L</span>
					</div>
					<div className="w-full h-[87%]">
						<div className="h-full w-[45%] leftdiv flex justify-center items-center">
							<div className="infoBox h-[65%] p-2 rounded-md flex justify-center items-center flex-col">
								<div className="w-full h-[15%] flex justify-center items-center">
									<input type="text" placeholder="Enter your Name :)~" className="w-full h-[90%] my-1 rounded-md indent-3 outline-0" required onKeyUp={(e) => { setUname(e.target.value); }} />
								</div>
								<div className="w-full h-[55%] bg-red-400"></div>
								<div className="w-full h-[15%]"><button className="h-[85%] mt-2 w-full text-white rounded-md bg-blue-500 text-3xl cursor-pointer" onClick={startRunningGame}>Play</button></div>
								<div className="w-full h-[15%]">
									<button className="h-[85%] mt-2 w-full text-white rounded-md bg-green-500 text-3xl cursor-pointer" onClick={startPersonalGame}>Play with Friends</button>
								</div>
							</div>
						</div>
						<div className="h-full w-[55%] rightdiv three_divs">
							<div className="w-full h-1/3 sm:h-[27%] mb-1">
								<div className="w-full h-[22%] pl-0 flex justify-start items-center flex-row">
									<img src={aboutImage} className="object-contain h-[95%] w-[10%]" alt="image not found" />
									<span className="text-3xl">ABOUT</span>
								</div>
								<div className="w-[84%] h-[78%]">
									<p className="ml-2 text-justify mt-2 paras">This Website <strong>grimbbl.com</strong> is completely free to play with fun. This is a multiplayer game plays inside either globar or private rooms. you can also customize your avatar and name without any identity.<br />Crack The World!</p>
								</div>
							</div>
							<div className="w-full h-1/3 sm:h-[27%]">
								<div className="w-full h-[22%] pl-0 flex justify-start items-center flex-row">
									<img src={htpImage} className="object-contain h-[95%] w-[10%]" alt="image not found" />
									<span className="text-3xl">HOW TO PLAY</span>
								</div>
								<div className="w-[84%] h-[78%]">
									<p className="ml-2 text-justify mt-2 paras">There will be only 3 round in the game. One players will select the word and draw something about that perticular word. Remaining all the players will guess the word and after the rounds over, the player who have highest point will be the winner of this game.</p>
								</div>
							</div>
							<div className="w-full h-1/3 sm:h-[27%]">
								<div className="w-full h-[22%] -mt-2 pl-0 flex justify-start items-center flex-row">
									<img src={useImage} className="object-contain h-[95%] w-[10%]" alt="image not found" />
									<span className="text-3xl">USE</span>
								</div>
								<div className="w-[84%] h-[78%]">
									<ul className="ml-2 text-justify mt-2 list-none paras">
										<li>1. Enhance Memory Power</li>
										<li>2. Enhance Creativity</li>
										<li>3. Stimulating Both Sides of The Brain.</li>
										<li>4. Make Logical Skilld Powerful</li>
										<li>5. Boosting Self-Esteem</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>);
}
export default Hero;