function encrypt(word){

	let s =""
	for(i=0;i<word.length;i++){

		word=word.toLowerCase()
		const code = word[i].charCodeAt(0)
		let newCode = (code-i);
		if(newCode>=97 && newCode<=122){
			
		}
		else if(newCode<97){
			newCode = 123-(97-newCode);
		}
		else{
			newCode = 96+(122-newCode);
		}

		s+=String.fromCharCode(newCode);

	}
	return s;

}
module.exports={
	encrypt : encrypt
}