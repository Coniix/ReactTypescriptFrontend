import useSWR from "swr";
import useTypingGame from "react-typing-game-hook";
import "../styles.css";
import { useState, useEffect } from 'react';
import { useShallowEffect } from "@mantine/hooks";
// import { clearInterval } from "timers";

const Play = () => {
  const fetcher = (url: string) =>
    fetch(`${globalThis.apiUrl}/${url}`).then((r) => r.json());
    const { data, mutate } = useSWR("actors/", fetcher);
    let [text, setText] = useState("");
    let [timerId, setTimerId] = useState<any>();
    let [countdown, setCountdown] = useState<number>(-1);
    let [score, setScore] = useState<number>(0);
    let [gameStart, setGameStart] = useState<boolean>(false);

    const {
        states: {
          charsState,
          length,
          currIndex,
          currChar,
          correctChar,
          errorChar,
          phase,
          startTime,
          endTime
        },
        actions: { insertTyping, resetTyping, deleteTyping }
      } = useTypingGame(text);

    const handleKey = (key: any) => {
      if (key === "Escape") {
          resetTyping();
      } else if (key === "Backspace") {
          deleteTyping(false);
      } else if (key === "Enter") {
          clearTimeout(timerId);
          setCountdown((countdownNum: number)=> countdownNum = 5)
          updateScore();
          nextWord();
      } else if (key.length === 1) {
          insertTyping(key);
      }
    };

    function nextWord () {
        setText(data[0].FirstName.toLowerCase() + " " + data[0].LastName.toLowerCase());
        data.shift();

        //Timer before changing words
        setTimerId(setTimeout(() => {
            setCountdown((countdownNum: number)=> countdownNum = 5)
            updateScore();
            nextWord();
        }, 5000));
    }

    function updateScore() {
      setScore((prevScore) => prevScore + (correctChar - errorChar));
      console.log("score " + (correctChar));

      return <div />;
    }


    useEffect(() => {
      console.log("effect")
      const interval = setInterval(() => {
        setCountdown((prev: number)=>prev-0.05);
      }, 50);

      return ()=>{
        clearInterval(interval)
      }
    }, []);

    //Start game on click
    const handleClick = async (event: { preventDefault: () => void; }) => {
        setCountdown((countdownNum: number)=> countdownNum = 5)
        nextWord();
        setGameStart(true)
        document.getElementById("typing-test")!.focus();        
    }

    return (
        <div>  
            <h1>{!gameStart ? "Play" : 
                <p>Score: {score}</p>
            }</h1>

            <div>{countdown >= 0 && countdown?.toFixed(2)}</div>

            {!data ? "Loading..." : 
            <div> 
                <button id="button" onClick={handleClick.bind(data)}>Start</button>
            </div>
            }
            <div
        className="typing-test"
        id="typing-test"
        onKeyDown={(e) => {
          handleKey(e.key);
          e.preventDefault();
        }}
        tabIndex={0}
      >
        {text.split("").map((char: string, index: number) => {
          let state = charsState[index];
          let color = state === 0 ? "black" : state === 1 ? "green" : "red";
          return (
            <span
              key={char + index}
              style={{ color }}
              className={currIndex + 1 === index ? "curr-letter" : ""}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div> 
    );
}
  
export default Play;