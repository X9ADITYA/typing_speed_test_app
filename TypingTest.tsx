import React, { useState, useEffect } from "react";

const TypingTest: React.FC = () => {
  const [text, setText] = useState<string>(""); // Random sentence
  const [userInput, setUserInput] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30 seconds countdown
  const [started, setStarted] = useState<boolean>(false);
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [grade, setGrade] = useState<string>(""); // New state for grade

  const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "React makes it painless to create interactive UIs.",
    "TypeScript adds static typing to JavaScript.",
    "Frontend development is both an art and a science.",
    "Consistency is the key to success in programming.",
    "Typing fast helps improve coding productivity.",
    "Multiline text allows for a more realistic typing test.",
  ];

  // Generate a random multiline sentence
  useEffect(() => {
    const randomSentences = Array(3) // Generate 3 sentences for a multiline test
      .fill(null)
      .map(() => sentences[Math.floor(Math.random() * sentences.length)])
      .join(" ");
    setText(randomSentences);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      calculateResults();
      setStarted(false);
    }
  }, [timeLeft, started]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!started) setStarted(true);
    setUserInput(e.target.value);
  };

  const calculateResults = () => {
    const wordsTyped = userInput
      .trim()
      .split(" ")
      .filter((word) => word !== "").length;
    const correctChars = userInput
      .split("")
      .filter((char, idx) => char === text[idx]).length;
    const totalChars = text.length;

    const calculatedWpm = Math.round((wordsTyped / 30) * 60); // Adjusted for 30 seconds
    setWordsPerMinute(calculatedWpm);
    setAccuracy(Math.round((correctChars / totalChars) * 100));
    setGrade(determineGrade(calculatedWpm)); // Set grade based on WPM
  };

  const determineGrade = (wpm: number): string => {
    if (wpm > 80) return "Expert";
    if (wpm > 60) return "Proficient";
    if (wpm > 40) return "Intermediate";
    if (wpm > 20) return "Beginner";
    return "Needs Improvement";
  };

  const restartTest = () => {
    setUserInput("");
    setTimeLeft(30); // Reset to 30 seconds
    setStarted(false);
    setWordsPerMinute(0);
    setAccuracy(100);
    setGrade(""); // Reset grade
    const randomSentences = Array(3)
      .fill(null)
      .map(() => sentences[Math.floor(Math.random() * sentences.length)])
      .join(" ");
    setText(randomSentences);
  };

  return (
    <div className="typing-test">
      <p className="text">{text}</p>
      <textarea
        value={userInput}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        rows={6} // Allows multiline input
        disabled={timeLeft === 0}
      />
      <div className="stats">
        <p>Time Left: {timeLeft}s</p>
        <p>WPM: {wordsPerMinute}</p>
        <p>Accuracy: {accuracy}%</p>
        <p>Grade: {grade}</p> {/* Display the grade */}
      </div>
      {timeLeft === 0 && <button onClick={restartTest}>Restart Test</button>}
    </div>
  );
};

export default TypingTest;
