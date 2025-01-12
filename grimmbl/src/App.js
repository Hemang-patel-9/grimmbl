import './App.css';
import Game from './components/game';
import Hero from './components/hero';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const cw = window.screen.width;
  function Decide() {
    if (cw <= 555) {
      return (<h1>mobile view</h1>);
    }
    else {
      return <Game/>;
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/:id/:uname" element={<Decide />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;