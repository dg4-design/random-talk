const App = () => {
  const [data, setData] = React.useState([]);
  const [content, setContent] = React.useState(null);

  React.useEffect(() => {
    fetch("gumData.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("データの取得に失敗しました:", error));
  }, []);

  const handleClick = () => {
    if (data.length === 0) return;

    const randomData = data[Math.floor(Math.random() * data.length)];
    const randomTopic = randomData[Math.floor(Math.random() * randomData.length)];

    setContent(
      <div className="card">
        {randomData.map((e, i) => {
          const isAccent = e === randomTopic;
          return (
            <div key={i} className={`item ${isAccent ? "accent" : ""}`}>
              <p className="number">{i + 1}</p>
              <p className="theme">{e}話</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="app">
      <div className="wrapper">
        <div className="record">現在{data.length * 6}個の話題が登録されています</div>
        <div className="output">{content}</div>
        <button className="button" onClick={handleClick}>
          Let's Talk!
        </button>
      </div>
    </div>
  );
};

const target = document.querySelector("#app");
const root = ReactDOM.createRoot(target);
root.render(<App />);
