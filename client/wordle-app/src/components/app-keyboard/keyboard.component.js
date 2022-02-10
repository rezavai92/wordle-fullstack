import React,{useState,useEffect} from 'react'
import KeyboardKey from "./key.component";
import './keyboard.component.css'
const KeyBoardComponent= (props)=>{

	const firstRowKeys =["Q","W","E","R","T","Y","U","I","O","P"];
	const secondRowKeys = ["A","S","D","F","G","H","J","K","L"];
	const thirdRowKeys =["ENTER","Z","X","C","V","B","N","M","ERASE"];
	//const [alreadyInletter,setAlreadyInLetters] =useState([])
	
	const onCellKeyPress = (letter)=>{

	//	console.log("keyboard comp ",letter)
		props.updateBoard(letter)

	}


	const mappedFirstRow = firstRowKeys.map((cellKey,index)=>{
		return(<KeyboardKey key={index} onCellKeyPress ={onCellKeyPress} cellKey={cellKey}  />)
	});
	const mappedSecondRow = secondRowKeys.map((cellKey,index)=>{
		return(<KeyboardKey key={index}  onCellKeyPress ={onCellKeyPress} cellKey={cellKey}  />)
	});
	const mappedThirdRow = thirdRowKeys.map((cellKey,index)=>{
		
		return(<KeyboardKey  key={index}  onCellKeyPress ={onCellKeyPress}  cellKey={cellKey}  />)
	})


	return(<div className="keyboard container">

		<div className="first-row">{mappedFirstRow}</div>
		<div className="second-row"> {mappedSecondRow} </div>
		<div className="third-row">  {mappedThirdRow} </div>

	</div>)

}

export default KeyBoardComponent