import axios from 'axios';

 export function getWordTranslation(word){

	return axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)


}