import React, { useState, useEffect } from "react";

const Snake = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);

  // Handle keypress for direction
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  // Snake movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!gameOver) moveSnake();
    }, speed);
    return () => clearInterval(moveInterval);
  }, [snake, direction, gameOver]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = newSnake[newSnake.length - 1];
    let newHead;

    switch (direction) {
      case "UP":
        newHead = [head[0] - 1, head[1]];
        break;
      case "DOWN":
        newHead = [head[0] + 1, head[1]];
        break;
      case "LEFT":
        newHead = [head[0], head[1] - 1];
        break;
      case "RIGHT":
        newHead = [head[0], head[1] + 1];
        break;
      default:
        break;
    }

    newSnake.push(newHead);
    newSnake.shift();

    if (checkCollision(newHead)) {
      setGameOver(true);
    } else if (isEatingFood(newHead)) {
      newSnake.unshift([]);
      setFood(generateFood());
      setSpeed(speed - 10); // Increase speed
    }

    setSnake(newSnake);
  };

  const checkCollision = (head) => {
    return (
      head[0] < 0 ||
      head[1] < 0 ||
      head[0] >= 20 ||
      head[1] >= 20 ||
      snake.some((segment) => segment[0] === head[0] && segment[1] === head[1])
    );
  };

  const isEatingFood = (head) => head[0] === food[0] && head[1] === food[1];

  const generateFood = () => [
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 20),
  ];

  return (
    <div className="relative w-[400px] h-[400px] bg-gray-800 border-4 border-gray-700 mx-auto mt-8">
      {gameOver ? (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75">
          <h1 className="text-white text-3xl">Game Over</h1>
        </div>
      ) : (
        <>
          {/* Render snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className="absolute bg-green-500 w-5 h-5"
              style={{
                top: `${segment[0] * 20}px`,
                left: `${segment[1] * 20}px`,
              }}
            />
          ))}
          {/* Render food */}
          <div
            className="absolute bg-red-500 w-5 h-5"
            style={{
              top: `${food[0] * 20}px`,
              left: `${food[1] * 20}px`,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Snake;
