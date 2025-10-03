import React from "react";
import Navbar from "./components/Navbar/Navbar";

import Hero from "./components/Hero/Hero";
import "./App.css"; // global styles

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
