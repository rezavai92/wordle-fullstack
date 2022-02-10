import React,{useState,useEffect} from 'react'
import { ToastContainer ,Toast} from 'react-bootstrap'
import './toast.component.css'

const CustomToastComponent = ({toastMessage,toastPosition, onCloseToast,background,color})=>{
	const [show, setShow] = useState(true);

	useEffect(()=>{

		setTimeout(()=>{
			setShow(false);
			onCloseToast();
		},3000)
	},[])

	const closeToast = ()=>{
		setShow(false);
		onCloseToast();
	}

	return(<ToastContainer  position={toastPosition}>
		<Toast show={show} onClose={closeToast}>
          <Toast.Body className={background} > 
		  
		  {toastMessage} 
		  
		    </Toast.Body>
        </Toast>
	</ToastContainer>)
}

export default CustomToastComponent