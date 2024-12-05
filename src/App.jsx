import React from "react";
import Snake from "./Snake";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      <h1 className="text-white text-4xl font-bold mt-8">Snake Game</h1>
      <Snake />
    </div>
  );
};

export default App;
