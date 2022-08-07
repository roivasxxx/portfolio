import Logo from "@/assets/logo.png";

import "./styles/app.css";

function App() {
  return (
    <div>
      <img src={Logo} alt="" />
      <h1>Hello React TS</h1>
      <div className="text-green-400">test</div>
    </div>
  );
}

export default App;
