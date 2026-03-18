import { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  const [selectedMood, setSelectedMood] = useState("");

  const moods = [
    { key: "happy", emoji: "😄" },
    { key: "sad", emoji: "😢" },
    { key: "angry", emoji: "😡" },
    { key: "confused", emoji: "🤔" },
  ];

  // ---------- LOGIN PAGE ----------
  if (page === "login") {
    return (
      <div style={styles.loginPage}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="snowflake">*</div>
        ))}

        <div style={styles.loginForm}>
          <h1 style={{ color: "#fff", marginBottom: "20px" }}>Wellness Hub</h1>
          <input style={styles.input} placeholder="Username" />
          <input style={styles.input} type="password" placeholder="Password" />
          <button style={styles.button} onClick={() => setPage("moodStep")}>
            Login
          </button>
        </div>

        <div style={styles.snowman}>☃️</div>

        <style>{`
          .snowflake {
            color: #fff;
            font-size: 1em;
            position: absolute;
            top: -10px;
            animation: fall linear infinite;
            opacity: 0.8;
          }
          ${Array.from({ length: 100 }).map(
            (_, i) => `
            .snowflake:nth-child(${i + 1}) {
              left: ${Math.random() * 100}%;
              animation-duration: ${5 + Math.random() * 7}s;
              animation-delay: ${Math.random() * 5}s;
              font-size: ${8 + Math.random() * 25}px;
            }
          `
          ).join("")}

          @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 0.8; }
          }
        `}</style>
      </div>
    );
  }

  // ---------- MOOD SELECTION PAGE ----------
  if (page === "moodStep") {
    return (
      <div style={styles.featurePage}>
        {Array.from({ length: 80 }).map((_, i) => (
          <div key={i} className="star"></div>
        ))}

        <h2 className="animatedText">Pick your mood for today ⭐</h2>
        <div style={styles.moodContainer}>
          {moods.map((mood) => (
            <span
              key={mood.key}
              className="emoji"
              style={{ fontSize: "6em", margin: "20px", cursor: "pointer" }}
              onClick={() => {
                setSelectedMood(mood.key);
                if (mood.key === "happy") setPage("happyFeature");
                else if (mood.key === "sad") setPage("sadFeature");
                else if (mood.key === "angry") setPage("angryFeature");
                else if (mood.key === "confused") setPage("ConfusionFeature");
              }}
            >
              {mood.emoji}
            </span>
          ))}
        </div>

        <button style={styles.backBtn} onClick={() => setPage("login")}>⬅ Back</button>

        <style>{`
          .animatedText {
            color: #fff;
            font-size: 2.5em;
            margin-bottom: 40px;
            animation: floatText 2s ease-in-out infinite alternate;
          }
          @keyframes floatText {
            0% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0); }
          }

          .star { position: absolute; background: white; width: 2px; height: 2px; border-radius: 50%; top: -5px; animation: fallStar linear infinite; opacity: 0.8; }
          ${Array.from({ length: 80 }).map(
            (_, i) => `
            .star:nth-child(${i + 1}) {
              left: ${Math.random() * 100}%;
              animation-duration: ${3 + Math.random() * 5}s;
              animation-delay: ${Math.random() * 5}s;
              width: ${1 + Math.random() * 3}px;
              height: ${1 + Math.random() * 3}px;
              opacity: ${0.5 + Math.random() * 0.5};
            }
          `
          ).join("")}
          @keyframes fallStar { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
        `}</style>
      </div>
    );
  }

  // ---------- HAPPY FEATURE / CELEBRATE YOUR HAPPINESS ----------
  if (page === "happyFeature") return <HappyFeature setPage={setPage} />;

  // ---------- HAPPINESS PITCH MINI-GAME ----------
  if (page === "happinessPitch") return <HappinessPitch setPage={setPage} />;

  // ---------- SAD FEATURE ----------
  if (page === "sadFeature") return <SadFeature setPage={setPage} />;

  // ---------- SAD JOKES PAGE ----------
  if (page === "sadJokes") return <SadJokes setPage={setPage} />;

  // ---------- ANGRY FEATURE ----------
  if (page === "angryFeature") return <AngryFeature setPage={setPage} />;

  // ---------- CONFUSED FEATURE ----------
  if (page === "ConfusionFeature") return <ConfusionFeature setPage={setPage} />;

  
}

// ---------------- HAPPY FEATURE COMPONENT ----------------
function HappyFeature({ setPage }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [effects, setEffects] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEffects((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 90 + "%",
          type: ["🎉", "✨", "😄", "💖"][Math.floor(Math.random() * 4)]
        }
      ]);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { from: "user", text: inputText }]);
    setInputText("");
    setTimeout(() => {
      const replies = [
        "Wowww amazing 😄! Tell me more!",
        "Your happiness is contagious! 🌟",
        "Keep smiling and shining! ✨",
        "Yay! Love this energy! 🎉",
        "Awesome! Keep spreading joy! 💖",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 800);
  };

  return (
    <div style={{ ...styles.featurePage, overflow: "hidden", position: "relative" }}>
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} className="snowflake">*</div>
      ))}

      {effects.map((e) => (
        <div
          key={e.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: e.left,
            fontSize: "1.5em",
            animation: `floatDown 4s linear forwards`,
            pointerEvents: "none"
          }}
        >
          {e.type}
        </div>
      ))}

      <h2 style={{ color: "#fff", fontSize: "2.2em", marginBottom: "20px", animation: "floatText 2s infinite alternate" }}>
        🎉 Yay! Let’s celebrate your happiness! 🥳
      </h2>

      <button
        style={{
          padding: "12px 20px",
          fontSize: "1.2em",
          borderRadius: "15px",
          border: "none",
          background: "linear-gradient(45deg, #ff6ec4, #7873f5)",
          color: "#fff",
          cursor: "pointer",
          animation: "pulse 1.5s infinite",
          marginBottom: "20px"
        }}
      >
        Share your happiness with me
      </button>

      <div style={{ width: "90%", maxWidth: "400px" }}>
        <div style={{ height: "200px", overflowY: "auto", background: "#fff8", borderRadius: "15px", padding: "10px", fontSize: "0.9em" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ textAlign: m.from === "bot" ? "left" : "right", margin: "5px 0" }}>
              <span style={{
                padding: "8px",
                borderRadius: "10px",
                background: m.from === "bot" ? "#fff" : "#6c63ff",
                color: m.from === "bot" ? "#000" : "#fff"
              }}>{m.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "10px", display: "flex", gap: "5px" }}>
          <input
            style={{ flex: 1, padding: "8px", borderRadius: "10px", border: "none" }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your happiness..."
          />
          <button style={{ padding: "8px 12px", borderRadius: "10px", border: "none", background: "#6c63ff", color: "#fff" }} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>

      <button
        onClick={() => setPage("happinessPitch")}
        style={{
          marginTop: "40px",
          padding: "12px 20px",
          borderRadius: "12px",
          fontSize: "1.2em",
          border: "none",
          background: "#00d4ff",
          cursor: "pointer",
          animation: "pulse 1.5s infinite"
        }}
      >
        Next: Happiness Pitch 🎤
      </button>

      <button style={styles.backBtn} onClick={() => setPage("moodStep")}>⬅ Back</button>

      <style>{`
        @keyframes floatText { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        @keyframes floatDown { 0% { transform: translateY(0); opacity: 0; } 50% { opacity:1; } 100% { transform: translateY(500px); opacity:0; } }

        .snowflake { color: #fff; font-size: 1em; position: absolute; top: -10px; animation: fall linear infinite; opacity: 0.8; }
        ${Array.from({ length: 100 }).map(
          (_, i) => `
          .snowflake:nth-child(${i+1}) {
            left: ${Math.random()*100}%;
            animation-duration: ${3+Math.random()*5}s;
            animation-delay: ${Math.random()*5}s;
            font-size: ${8+Math.random()*20}px;
          }
        `
        ).join("")}
        @keyframes fall { 0% { transform: translateY(0); opacity:0;} 50% { opacity:1;} 100%{ transform: translateY(100vh); opacity:0.8;} }
      `}</style>
    </div>
  );
}

// ---------------- HAPPINESS PITCH MINI-GAME COMPONENT ----------------
function HappinessPitch({ setPage }) {
  const [sparkles, setSparkles] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 90 + "%",
          top: Math.random() * 50 + "%",
          type: ["✨", "🎉", "💖", "🌟"][Math.floor(Math.random() * 4)],
        },
      ]);
      if (sparkles.length > 20) setSparkles((prev) => prev.slice(prev.length - 20));
    }, 400);
    return () => clearInterval(interval);
  }, [sparkles]);

  const catchSparkle = (id) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id));
    setScore(score + 1);
  };

  return (
    <div style={styles.page}>
      <h2 style={{ fontSize: "2em", marginBottom: "10px", color: "#fff" }}>🎮 Catch the Happiness! 🎮</h2>
      <div style={{ color: "#fff", marginBottom: "10px" }}>Score: {score}</div>

      {sparkles.map((s) => (
        <span
          key={s.id}
          style={{ position: "absolute", left: s.left, top: s.top, fontSize: "2em", cursor: "pointer" }}
          onClick={() => catchSparkle(s.id)}
        >
          {s.type}
        </span>
      ))}

      <button style={styles.backBtn} onClick={() => setPage("happyFeature")}>⬅ Back</button>
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {
  loginPage: { height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)", position: "relative", overflow: "hidden", textAlign: "center", },
  loginForm: { background: "rgba(0,0,0,0.6)", padding: "40px", borderRadius: "20px", display: "flex", flexDirection: "column", gap: "15px", zIndex: 2, minWidth: "300px", },
  input: { padding: "12px", borderRadius: "10px", border: "none", fontSize: "1em", outline: "none", },
  button: { padding: "12px", borderRadius: "12px", border: "none", background: "#6c63ff", color: "#fff", fontSize: "1.2em", cursor: "pointer", transition: "transform 0.3s", },
  snowman: { position: "absolute", bottom: "10px", right: "10px", fontSize: "3em", },
  featurePage: { height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(to bottom, #1f1c2c, #928dab)", textAlign: "center", overflow: "hidden", },
  moodContainer: { display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "center", },
  page: { height: "100vh", width: "100%", background: "linear-gradient(to bottom, #1f1c2c, #928dab)", display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden", padding: "20px", color: "#fff" },
  chatContainer: { marginTop: "20px", width: "90%", maxWidth: "400px" },
  chatBox: { height: "200px", overflowY: "auto", background: "#fff8", borderRadius: "15px", padding: "10px" },
  sendBtn: { padding: "8px 12px", borderRadius: "10px", border: "none", background: "#6c63ff", color: "#fff", cursor: "pointer" },
  nextBtn: { marginTop: "20px", padding: "12px 20px", borderRadius: "12px", fontSize: "1.2em", border: "none", background: "#ff69b4", cursor: "pointer", animation: "pulse 1.5s infinite" },
  backBtn: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 20px",
    borderRadius: "12px",
    fontSize: "1em",
    border: "none",
    background: "#ff6961",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    zIndex: 999,
  },
};
// ---------------- SAD FEATURE / GUIDANCE CHATBOT ----------------
// ---------------- SAD FEATURE / GUIDANCE CHATBOT ----------------
// ---------------- SAD FEATURE COMPONENT ----------------
function SadFeature({ setPage }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const guidance = [
    "Take a deep breath and smile 😊",
    "It's okay to feel sad sometimes.",
    "I'm here with you. Let's find a little happiness together 🌟",
  ];

  const [msgIndex, setMsgIndex] = useState(0);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages([...messages, { from: "user", text: inputText }]);
    setInputText("");
    // Chatbot reply one by one
    setTimeout(() => {
      if (msgIndex < guidance.length) {
        setMessages((prev) => [...prev, { from: "bot", text: guidance[msgIndex] }]);
        setMsgIndex(msgIndex + 1);
      }
    }, 500);
  };

  const goToJokes = () => setPage("sadJokes");

  return (
    <div style={{ ...styles.featurePage, overflow: "hidden", position: "relative" }}>
      <h2 style={{ color: "#fff", fontSize: "2em", marginBottom: "20px" }}>😢 Feeling Sad? Let's chat!</h2>

      <div style={{ width: "90%", maxWidth: "400px" }}>
        <div style={{ height: "200px", overflowY: "auto", background: "#fff8", borderRadius: "15px", padding: "10px" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ textAlign: m.from === "bot" ? "left" : "right", margin: "5px 0", fontSize: "0.9em" }}>
              <span style={{
                padding: "8px",
                borderRadius: "10px",
                background: m.from === "bot" ? "#fff" : "#6c63ff",
                color: m.from === "bot" ? "#000" : "#fff",
                display: "inline-block",
              }}>
                {m.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "10px", display: "flex", gap: "5px" }}>
          <input
            style={styles.input}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type here..."
          />
          <button style={styles.sendBtn} onClick={sendMessage}>Send</button>
        </div>
      </div>

      <button style={styles.nextBtn} onClick={goToJokes}>Next: Jokes 😄</button>
      <button style={styles.backBtn} onClick={() => setPage("moodStep")}>⬅ Back</button>
    </div>
  );
}

// ---------------- SAD JOKES PAGE ----------------
function SadJokes({ setPage }) {
  const jokes = [
    "Why don’t scientists trust atoms? Because they make up everything! 😂",
    "I told my computer I needed a break, and it said: 'No problem – I’ll go to sleep.' 🖥️😄",
    "Why did the math book look sad? Because it had too many problems! 📚😆",
    "Why don't skeletons fight each other? They don't have the guts! 💀😂",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextJoke = () => setCurrentIndex((prev) => (prev + 1) % jokes.length);

  return (
    <div style={{ ...styles.featurePage, overflow: "hidden", position: "relative" }}>
      <h2 style={{ color: "#fff", fontSize: "2em", marginBottom: "20px" }}>😄 Here's a Joke to cheer you up!</h2>

      <div style={{ color: "#ffff88", fontSize: "1.2em", marginBottom: "20px", textAlign: "center", maxWidth: "600px" }}>
        {jokes[currentIndex]}
      </div>

      <button style={styles.nextBtn} onClick={nextJoke}>Next Joke 😄</button>
      <button style={styles.backBtn} onClick={() => setPage("sadFeature")}>⬅ Back</button>
    </div>
  );
}

function AngryFeature({ setPage }) {
  const [score, setScore] = useState(0);

  return (
    <div style={styles.featurePage}>
      <h2 style={{ color: "#fff", fontSize: "2em", marginBottom: "20px" }}>😡 Punch Out Your Anger!</h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "90%", maxWidth: "600px" }}>
        <div
          style={{ fontSize: "6em", cursor: "pointer" }}
          onClick={() => setScore(score + 1)}
        >
          👊
        </div>
        <div style={{ fontSize: "2em", color: "#fff" }}>Score: {score}</div>
      </div>

      <button style={styles.backBtn} onClick={() => setPage("moodStep")}>⬅ Back</button>
    </div>
  );
}

// ---------------- CONFUSED FEATURE / RIDDLES ----------------
// ---------------- CONFUSION / RIDDLES PAGE ----------------
// ---------------- CONFUSION FEATURE COMPONENT ----------------
// ---------------- CONFUSION FEATURE COMPONENT ----------------
function ConfusionFeature({ setPage }) {
  const riddles = [
    { q: "I speak without a mouth and hear without ears. What am I?", a: "An echo" },
    { q: "What has keys but can't open locks?", a: "A piano" },
    { q: "What has hands but can't clap?", a: "A clock" },
    { q: "What gets wetter the more it dries?", a: "A towel" },
  ];
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextRiddle = () => {
    setIndex((prev) => (prev + 1) % riddles.length);
    setShowAnswer(false);
  };

  return (
    <div style={{ ...styles.featurePage, color: "#fff" }}>
      <h2 style={{ marginBottom: "20px" }}>🧐 Riddle Time!</h2>
      <p style={{ background: "#fff8", padding: "20px", borderRadius: "15px", fontSize: "1em" }}>{riddles[index].q}</p>
      {showAnswer && <p style={{ marginTop: "15px", fontWeight: "bold" }}>Answer: {riddles[index].a}</p>}
      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        {!showAnswer && <button style={styles.nextBtn} onClick={() => setShowAnswer(true)}>Show Answer ✅</button>}
        {showAnswer && <button style={styles.nextBtn} onClick={nextRiddle}>Next Riddle ➡️</button>}
        <button style={styles.backBtn} onClick={() => setPage("moodStep")}>⬅ Back</button>
      </div>
    </div>
  );
}