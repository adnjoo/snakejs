import React from "react";
import Snake from "./Snake";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      <h1 className="text-white text-4xl font-bold mt-8">Snake Game</h1>
      <Snake />
      <Footer />
    </div>
  );
};

export default App;
