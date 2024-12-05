import { useState, useEffect } from "react";
import MobileControls from "./MobileControls";

const Snake = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );

  const changeDirection = (newDirection) => {
    if (
      (newDirection === "UP" && direction !== "DOWN") ||
      (newDirection === "DOWN" && direction !== "UP") ||
      (newDirection === "LEFT" && direction !== "RIGHT") ||
      (newDirection === "RIGHT" && direction !== "LEFT")
    ) {
      setDirection(newDirection);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          changeDirection("UP");
          break;
        case "ArrowDown":
          changeDirection("DOWN");
          break;
        case "ArrowLeft":
          changeDirection("LEFT");
          break;
        case "ArrowRight":
          changeDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

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
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score);
      }
    } else if (isEatingFood(newHead)) {
      newSnake.unshift([]);
      setFood(generateFood());
      setSpeed(speed - 10);
      setScore(score + 10);
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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      <div className="relative w-[400px] h-[400px] bg-gray-800 border-4 border-gray-700 mt-8">
        <div className="absolute top-0 left-0 p-2 bg-gray-900 text-white text-xl">
          Score: {score}
        </div>
        <div className="absolute top-0 right-0 p-2 bg-gray-900 text-white text-xl">
          High Score: {highScore}
        </div>

        {gameOver ? (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-75">
            <h1 className="text-white text-3xl">Game Over</h1>
            <p className="text-white text-lg mt-2">Final Score: {score}</p>
            <p className="text-white text-lg">High Score: {highScore}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Restart Game
            </button>
          </div>
        ) : (
          <>
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
      {/* Add Mobile Controls */}
      <MobileControls onDirectionChange={changeDirection} />
    </div>
  );
};

export default Snake;
