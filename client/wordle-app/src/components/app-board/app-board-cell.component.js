import './app-board-cell.component.css'
import {CSSTransition}  from 'react-transition-group' // ES6
const AppBoardCellComponent = (props)=>{


	const style={
		background : "white",
		///transitionProperty : "background-color"

	};
	

	switch(props.status){
	
		case "misplaced":
			style.background ="#edb95e"
			style.color = "white"
			//style.transitionDelay = props.transition+"s";
			break;
		case "incorrect":
			style.background = "#e23636"
			style.color = "white"
		//	style.transitionDelay = props.transition+"s"
			break;
		case "correct":
			style.background ='#82dd55';
			style.color= "white"
		  //  style.transitionDelay = props.transition+"s"
			break;
	}

	if(props.cellValue !=""){
		style.border ="2px solid white"
	}
	//console.log("props & styles ",props, style)
	return(
		
		<div  style={style} className='cell'>
			
				<div>{props.cellValue}</div>

		</div>
	)
}

export default AppBoardCellComponent