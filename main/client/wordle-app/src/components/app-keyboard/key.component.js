import "./key.component.css";
const KeyboardKey = (props) => {
  let max600 = window.matchMedia("(max-width: 600px)");
  let max400 = window.matchMedia("(max-width: 400px)");
  let alreadyIn = [];
  let savedAlreadyIn = window.localStorage.getItem("alreadyIn");
  if (savedAlreadyIn) {
    savedAlreadyIn = JSON.parse(savedAlreadyIn);
    alreadyIn = [...savedAlreadyIn];
  }

  const alreadyInStyle = {
    backgroundColor: "white",
    color: "black",
  };
  const correctKeyStyle = {
    backgroundColor: "#82dd55",
    color: "white",
  };

  function checkCorrectLetterSoFar() {
    let boardStat = JSON.parse(window.localStorage.getItem("boardStat"));
    let flatArray = [];
    if (boardStat) {
      let correctLetters = boardStat
        .map((row) => {
          return row
            .filter((col) => {
              return col.status === "correct";
            })
            .map((m) => m.value);
        })
        .filter((row) => row.length > 0);

      correctLetters.forEach((arr) => {
        flatArray = [...flatArray, ...arr];

        flatArray = Array.from(new Set(flatArray)).map((letter) =>
          letter.toLowerCase()
        );
      });

      if (flatArray.includes(props.cellKey.toLowerCase())) {
        return true;
      }

      return false;
      console.log("correct letters", correctLetters);
    }
  }

  function checkAlreadyIn(letter) {
    if (alreadyIn.includes(letter.toLowerCase())) {
      return true;
    }
    return false;
  }

  function checkEnterKey(letter) {
    return props.cellKey === "ENTER";
  }

  let enterKeyStyle = {
    width: "63px",
  };

  if (max400.matches) {
    enterKeyStyle.width = "30px";
  } else if (max600.matches) {
    enterKeyStyle.width = "40px";
  }

  let commonStyle = {};

  if (checkAlreadyIn(props.cellKey)) {
    commonStyle = Object.assign(commonStyle, alreadyInStyle);
  }

  if (checkEnterKey(props.cellKey)) {
    commonStyle = Object.assign(commonStyle, enterKeyStyle);
  }
  if (checkCorrectLetterSoFar()) {
    commonStyle = Object.assign(commonStyle, correctKeyStyle);
  }

  return (
    <div
      onClick={(e) => {
        props.onCellKeyPress(props.cellKey);
      }}
      className="keyboard-key"
      style={commonStyle}
    >
      {props.cellKey === "ERASE" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-eraser"
          viewBox="0 0 16 16"
        >
          <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
        </svg>
      ) : (
        props.cellKey
      )}
    </div>
  );
};

export default KeyboardKey;
