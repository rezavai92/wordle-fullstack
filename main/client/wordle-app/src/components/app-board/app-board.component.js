import React, { useState, useEffect } from "react";
import "./app-board.component.css";
import KeyBoardComponent from "../app-keyboard/keyboard.component";
import AppBoardCellComponent from "../app-board/app-board-cell.component";
import AppResultModalComponent from "../app-result/app-result-modal.component";
import { getWordTranslation } from "../../services/common.service";
import { Container } from "react-bootstrap";
import CustomToastComponent from "../app-toast/toast.component";
import { Dropdown,Button} from "react-bootstrap";
import axios from 'axios'
const AppBoardComponent = () => {
  const word = "skill";
  const [boardStat, setBoardStat] = useState([]);
  const [erasable, setErasable] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gamestat, setGameStat] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultObject, setResultObject] = useState({});
  const[alreadyIn,setAlreadyIn] = useState([]);
  const [showInvalidWordToast,setShowInvalidWordToast] = useState(false)
  let mappedBoard = [];

  useEffect(() => {

    axios.get("/gtw").then((res)=>{
      console.log("ser res",res)
    }).catch((err)=>{
      console.log("init error",err)
    })
    

    if(window.localStorage.getItem("boardStat")){
      setBoardStat(JSON.parse(window.localStorage.getItem("boardStat")));
    }
    else{
      setBoardStat([
        [
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
        ],
        [
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
        ],
        [
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
        ],
        [
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
        ],
        [
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
        ],
        [
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
          { value: "", status: "unjudged" },
        ],
      ]);
    }

    loadCurrentRow();
    loadCurrentCol();
    loadIsGameOver();
    loadResultObject();
    loadGameStat();
    loadAlreadInLetters();



  }, []);

  function loadAlreadInLetters(){
    if(window.localStorage.getItem("alreadyIn")){
      setAlreadyIn( JSON.parse(window.localStorage.getItem("alreadyIn")));
    }
    else{
      
      window.localStorage.setItem("alreadyIn",JSON.stringify([]));
    }
  }

  function loadGameStat (){
    if(window.localStorage.getItem("gameStat")){
      setGameStat( JSON.parse(window.localStorage.getItem("gameStat")));
    }
    else{
      
      window.localStorage.setItem("gameStat",JSON.stringify([]));
    }
  }

  function loadResultObject(){
    if(window.localStorage.getItem("resultObject")) {
      setResultObject( JSON.parse(window.localStorage.getItem("resultObject")) )

    } 
  }
  function loadIsGameOver(){
    if(window.localStorage.getItem("isGameOver")) {
      setIsGameOver( JSON.parse(window.localStorage.getItem("isGameOver")) )

    } 
  }
  function loadCurrentRow(){
    if(window.localStorage.getItem("currentRow")) {
      setCurrentRow( parseInt(window.localStorage.getItem("currentRow")) )

    }
    else{
      window.localStorage.setItem("currentRow",currentRow);
    }
  }
  function loadCurrentCol(){
    if(window.localStorage.getItem("currentCol")) {
      setCurrentCol( parseInt(window.localStorage.getItem("currentCol"))  )
    }
    else{
      window.localStorage.setItem("currentCol",currentCol);
    }
  }

  
  function evaluate() {

   
    let verdict = "";
    let triedWord = "";
    let currentBoardStat = [...boardStat];
    let gameOver = isGameOver;
   // console.log("current board stat",currentBoardStat[currentRow])

    triedWord = currentBoardStat[currentRow]
      .map((col) => {
        return col.value;
      })
      .join("");

    triedWord = triedWord.toLowerCase();

   
    getWordTranslation(triedWord).then((res)=>{
         //update already in
    updateAlreadyInLetters(triedWord.split(''))

    if (triedWord === word) {
      verdict = "win";
      gameOver = true;
      setIsGameOver(true);
      window.localStorage.setItem("isGameOver",true)
    } else {
      verdict = "incorrect";
    }
    
    let trackLetter ={};
    let misplaced ={};

    word.split("").forEach((letter)=>{
      const val = letter.toLowerCase();
      if(val in trackLetter){
        trackLetter[val]++;
      }
      else{
        trackLetter[val] = 1;
      }
    });
  
    const verdictedBoardStatRow = currentBoardStat[currentRow].map(
      (col, index) => {
        let newStatus = "";
        let char = col.value.toLowerCase();
        if (word.includes(char) && char !== word[index]) {
          
          
          if(misplaced[char]){
            misplaced[char]++;
          }
          else{
            misplaced[char] =1;
          }
          newStatus = "misplaced";
         
          
        } 
        else if (char === word[index]) {
  
    
          newStatus = "correct";
          // if(char in misplaced){
          //   misplaced[char]--;
          // }
        }
         else{
         
          newStatus = "incorrect";
        }

        return { ...col, status: newStatus };
      }


    );

    //filter verdictBoardStatRow
   

    const copiedVerdictBoardStatRow = [...verdictedBoardStatRow]
   // console.log("copied row",copiedVerdictBoardStatRow)

    const finalVerdictedBoardStatRow = verdictedBoardStatRow.map((col,index)=>{

      const currentChar = col.value.toLowerCase();
      if(misplaced[currentChar]>0 && word.includes(currentChar) && word[index]!==currentChar ){

        const foundCorrectCharList = copiedVerdictBoardStatRow.filter((m)=>{

          return m.value.toLowerCase() === currentChar && m.status==="correct";
          
        });
        //console.log("found correct char list",foundCorrectCharList)

       const remainingCorrectChar = trackLetter[currentChar] - foundCorrectCharList.length;

       if(remainingCorrectChar<1){
         col.status = "incorrect"
       }
       else{
         trackLetter[currentChar]--;
       }

      }

      return col;
    })

    currentBoardStat[currentRow] = [...finalVerdictedBoardStatRow];

   // console.log("currentBoard stat ", currentBoardStat)
    setBoardStat([...currentBoardStat]);
    window.localStorage.setItem("boardStat",JSON.stringify(currentBoardStat));

    let currentGameStat = [...gamestat];
    currentGameStat.push(verdict);
    setGameStat([...currentGameStat]);
    if (currentRow === 5) {
      gameOver = true;
      setIsGameOver(true);
      window.localStorage.setItem("isGameOver",true);
    }

    if (verdict != "win" && !gameOver) {
      unLockNextRow();
    }

    if (verdict === "win" || gameOver) {
      const result = {
        text: "",
        tried: currentGameStat.length,
        gameStat: currentGameStat,
        boardStat: currentBoardStat,
      };
      if (gameOver) {
        if (verdict === "win") {
          result.text = "Congratulations! You have matched it.";
          result.imgUrl = "assets/congo.jpg"
        } else {
          result.text = "You could not matach it today, Better luck next Day!";
        }
      }

      setResultObject(result);
      window.localStorage.setItem("resultObject",JSON.stringify(result));
     setTimeout(()=>{ setShowResultModal(true);},1500);

   //  setCurrentCol(0);
    // setCurrentRow(0);
    // window.localStorage.setItem("currentRow",0);
   //  window.localStorage.setItem("currentCol",0);
   let currentLocalGameStat = JSON.parse(window.localStorage.getItem("gameStat"));
   currentLocalGameStat.push(currentGameStat);
   window.localStorage.setItem("gameStat",JSON.stringify(currentLocalGameStat))
     
    }




    }).catch((error)=>{

    //  console.log("error ",error)

      setShowInvalidWordToast(true);
    
    })
    
 

  }

  function handleInvalidWordToastClose(){
    setShowInvalidWordToast(false);
  }

  function updateAlreadyInLetters(letters){

   // console.log("n1 ",alreadyIn)
    const currentAlreadyIn = [...alreadyIn];

    const newAlreadyIn = [...currentAlreadyIn,...letters]
   // console.log("n ",newAlreadyIn)
    const n = Array.from(new Set(newAlreadyIn));
   
    setAlreadyIn(n);
    window.localStorage.setItem("alreadyIn",JSON.stringify(n));
  }
  //console.log("current game stat ", gamestat);

  function updateRowAndCol(command) {
    if (!isGameOver) {
      const col = currentCol;
      const row = currentRow;

      if (command.toLowerCase() === "insert") {
        if (col < 5) {
          setCurrentCol(col + 1);
          window.localStorage.setItem("currentCol",col+1)
        }
      }

      if (command.toLowerCase() === "erased") {
        if (col > 0) {
          setCurrentCol(col - 1);
          window.localStorage.setItem("currentCol",col-1)
        }
      }

      
    }
  }

  function openResultModal(){
    if(isGameOver){
      setShowResultModal(true)
    }
  }

  function closeResultModal(){
    //console.log("closing result modal")
    setShowResultModal(false)
  }

  function unLockNextRow() {
    const col = currentCol;
    const row = currentRow;
    if (col === 5) {
      setCurrentCol(0);
      window.localStorage.setItem("currentCol",0)
      setCurrentRow(row + 1);
      window.localStorage.setItem("currentRow",row+1);
    }
  }

  function updateBoardStat(letter) {
    const row = currentRow;
    const col = currentCol;

    const currentBoardStat = [...boardStat];
    let currentBoardCell = currentBoardStat[row][col];

    if (letter.toLowerCase() != "enter" && letter.toLowerCase() != "erase") {
      if (col < 5 && !isGameOver) {
        currentBoardStat[row][col] = { ...currentBoardCell, value: letter };
        updateRowAndCol("insert");
        setBoardStat([...currentBoardStat]);
        window.localStorage.setItem("boardStat",JSON.stringify(currentBoardStat));
      }
    
    }

    if (letter.toLowerCase() === "enter") {
      if (col ===5 && !isGameOver ) {
        evaluate();
      } else {
       
      }
    
    }

    if (letter.toLowerCase() === "erase") {
      if (col > 0 && col < 6 && !isGameOver) {
        currentBoardStat[row][col - 1] = { status : "unjudged", value: "" };
        updateRowAndCol("erased");
        setBoardStat([...currentBoardStat]);
        window.localStorage.setItem("boardStat",JSON.stringify(currentBoardStat));
      }

     
    
    }
  }

  mappedBoard = boardStat.map((row) => {
    return row.map((col,index) => {
      return (
        <AppBoardCellComponent key={index} transition={index*1000} cellValue={col.value} status={col.status} />
      );
    });
  });

  //console.log("board", boardStat);

  return (
    <Container>
      <div className="board-wrapper">
        <div className="board-header">
          <div className="w-100" ></div>
        <div className="game-header">
          WORDLE
        </div>
        <div className="setting-share-flex">
           <div>
           <Dropdown >
              <Dropdown.Toggle variant="success" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-gear-fill" viewBox="0 0 16 16">
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="https://github.com/rezavai92/wordle-fullstack">Github</Dropdown.Item>
                <Dropdown.Item href="mailto:rezaink1996@gmail.com">Feedback</Dropdown.Item>
                <Dropdown.Item href="https://rezavai92.github.io/" >My Profile</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
         
           </div>
           <Button  className="opn-rslt-btn" variant="success" onClick={()=>{ openResultModal()}}>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-share-fill" viewBox="0 0 16 16">
  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
</svg>
           </Button>
        </div>
        </div>
        <div>
        
        </div>
        <hr style={{ width : "100%" , color : "white" }} />
        <div className="board">
          {mappedBoard.map((row,index) => {
            return <div key={index} className="row"> {row} </div>;
          })}
        </div>
       
          { showInvalidWordToast && <CustomToastComponent toastMessage="Invalid Word" toastPosition="middle-center" background ="red" color ="white" onCloseToast={handleInvalidWordToastClose} /> }
        

        <div  className="keyboard-wrapper">
          <KeyBoardComponent
            updateBoard={(letter) => {
              updateBoardStat(letter);
            }}
          />
        </div>

        {showResultModal && (
          <div>
            <AppResultModalComponent  OnCloseResultModal= {closeResultModal} result={resultObject} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default AppBoardComponent;
