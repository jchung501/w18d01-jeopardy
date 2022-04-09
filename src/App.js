import './App.css';
import Main from "./components/Main.js"
import { Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>}/>
      </Routes>
    </div>
  );
}
