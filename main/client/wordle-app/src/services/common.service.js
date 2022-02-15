import axios from 'axios';

 export function getWordTranslation(word){

	return axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)


}

function decrypt(word){

	let s ="";

	for(let i=0;i<word.length;i++){
		const code = word[i].charCodeAt(0);
		let newCode = code+i;
		if(newCode>97 && newCode<=122){

		}
		else if(newCode>122){
			newCode = 96+(newCode-122)
		}

		s+=String.fromCharCode(newCode)
	
	}
	return s;

}

export function decrypt(word){

	let s ="";

	for(let i=0;i<word.length;i++){
		const code = word[i].charCodeAt(0);
		let newCode = code+i;
		if(newCode>97 && newCode<=122){

		}
		else if(newCode>122){
			newCode = 96+(newCode-122)
		}

		s+=String.fromCharCode(newCode)
	
	}
	return s;

}