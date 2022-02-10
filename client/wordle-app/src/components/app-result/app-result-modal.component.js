import React,{useState,useEffect} from 'react'
import './app-result-modal.component.css'
import {Modal,Button} from 'react-bootstrap'
import HorizontalGraphComponent from '../app-graph/horizontal-graph/horizontalGraph.component'
import CustomToastComponent from '../app-toast/toast.component'
const AppResultModalComponent =(props)=>{

	const [show,setShow] = useState(true);
	const [showToast,setShowToast] = useState(false);
	const [showCopyToast,setShowCopyToast] = useState(false);
	const [toastMessage,setToastMessage] =useState("")

	let data = []
	
		let currentStoredGameStat = window.localStorage.getItem("gameStat");
		let parsedCurrentStoreGameStat = JSON.parse(currentStoredGameStat);
		if(parsedCurrentStoreGameStat && parsedCurrentStoreGameStat.length>0){

			let arr = []
			parsedCurrentStoreGameStat.forEach((play)=>{
				let temp_arr = []
				for(let i=0;i<6;i++){
					if(i < play.length){
						if(play[i]==="win"){
							temp_arr.push(1)
						}
						else{
							temp_arr.push(0)
						}
					}
					else{
						temp_arr.push(0);
					}
				};
				arr.push(temp_arr)
			})

			data =arr;

		}
		console.log("data is",props);
		const mappedCopyText = 	props.result && props.result.boardStat ? props.result.boardStat.map((row)=>{
			return (
					row.map((col,index)=>{
						return(<div  key={index} className='copy-column'>
								{col.status === "misplaced" ? "🟧" : null  }
								{col.status === "incorrect" ? "⬛" : null  }
								{col.status === "correct" ? "🟩" : null  }
							 </div>)
					})
				 )
		}) : []	;

		console.log("mapped copy text ",mappedCopyText)
	
	
	const handleClose = ()=>{
		setShow(false);
		props.OnCloseResultModal();

	}

	

	const prepareCopyText = ()=>{
		const copyTextArray = props.result.boardStat.map((row)=>{
			return row.map((col)=>{
				switch (col.status){
					case "misplaced" :
						return "🟧";
					case "incorrect" :
						return "⬛";
					case "correct":
						return "🟩"
				}
			}).filter((checkCol)=>checkCol!==undefined)
		}).filter((checkRow)=>checkRow.length>0)

		const text = copyTextArray.map((row)=>row.join(' ')).join('\n');
		return text

	
	}


	const copyToClipBoard = ()=>{
		try{
			const copyText = prepareCopyText();
  			navigator.clipboard.writeText(copyText);
			setToastMessage("Copied successfully");
		}
		catch(e){

			setToastMessage("Something went wrong!")
		}
		
		openToast();
		openCopyToast();
	}

	const openToast =()=>{
		setShowToast(true)
	}
	const closeToast = ()=>{
		setShowToast(false)
	}

	const openCopyToast =()=>{
		setShowCopyToast(true)
	}
	const closeCopyToast = ()=>{
		setShowCopyToast(false)
	}


	return(
	<Modal show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
        </Modal.Header>
        <Modal.Body>
			<div className='body'>
			
			 {props.result.imgUrl ? <div className='image'> 
				<img  src = {props.result.imgUrl} width="180px" height = "100px" />
			</div> : null } 

			<div className='stat'>
				{/* <h5 style={{textAlign : "center"}}>GAME STAT</h5> */}
				<h5 style={{textAlign : "center"}}>GUESS DISTRIBUTION</h5>
				<div style={{textAlign : "center"}}>
					<HorizontalGraphComponent dataset={data } />
				</div>
			</div>


			{/* <div className='copy-board'>
			<h5 style={{textAlign : "center"}}>RESULT  </h5>
				{
					mappedCopyText.map((row,index)=>{return(<div key={index} className='copy-row'> {row} </div>)})
				}
			</div> */}
			
			</div>
		</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <div>
		  <Button variant="primary" onClick={copyToClipBoard}>
			Copy
          </Button>
		  </div>
        </Modal.Footer>
		
		{showCopyToast && <CustomToastComponent
			 background="white"
			  toastPosition="middle-center" 
			   toastMessage={mappedCopyText.map((row,index)=>{return(<div key={index} className='copy-row'> {row} </div>)})} 
			   onCloseToast ={()=>{closeCopyToast()}}
			   /> }
			
		{showToast && 	<CustomToastComponent
		 background="green"
		  color ="white" 
		  toastMessage={  toastMessage}
		   toastPosition= "top-center"
		
		onCloseToast ={()=>{closeToast()}}  />}
    </Modal>)
}

export default AppResultModalComponent;