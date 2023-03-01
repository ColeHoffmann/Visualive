import logo from "./logo.svg";
import "./App.css";
import Intro from "./components/Intro";

function App() {
  return (
    <div
      class="flex items-center justify-center h-64  
    bg-gradient-to-r 
    from-blue-400 
    to-orange-500 
    via-purple-500
    animate-gradient-x
    "
    >
      <Intro />
    </div>
  );
}

export default App;
