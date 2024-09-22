const form = document.querySelector("form")
const resultDiv=document.querySelector(".result")


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    getWordInfo(form.elements[0].value)
    
})
    const getWordInfo=async(word)=>{
        resultDiv.innerHTML="<h2>Fetching Recipes......</h2>"
        try {
        const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const data= await response.json()
        let definitions=data[0].meanings[0].definitions[0];
        resultDiv.innerHTML=`
                            <p><strong>Word:</strong>${data[0].word}</p>
                            <p><strong>Part Of Speech:</strong>${data[0].meanings[0].partOfSpeech}</p>
                            <p><strong>Meaning:</strong>:${definitions.definition===undefined ? "Not Found!":definitions.definition}</p>
                            <p><strong>Example:</strong>:${definitions.example===undefined ? "Not Found !":definitions.example}</p>
                            <p><strong>Antonyms:</strong>
                            
                            `
                            if(definitions.antonyms.length===0){
                                resultDiv.innerHTML+=`<span>Not Found!!</span></br>`
                            }else{
                                for(let i=0; i<definitions.antonyms.length;i++){
                                    resultDiv.innerHTML+=`<li>${definitions.antonyms[i]}</li>`
                                }
                            }
    
                            
                            if(definitions.synonyms.length===0){
                                resultDiv.innerHTML+=`<span>Not Found!</br></span>`
                            }else{
                                resultDiv.innerHTML+=`<p><strong>Synonyms:</strong>`
                                for(let i=0; i<definitions.synonyms.length;i++){
                                    resultDiv.innerHTML+=`<li>${definitions.synonyms[i]}</li>`
                                }
                            }
                            console.log(data)

                            resultDiv.innerHTML+=`<a href="https://en.wikipedia.org/wiki/${word}">ReadMore</a>`
                        
                        } 
                        catch (error) {
                            resultDiv.innerHTML="<h2>Not Found that...</h2>"
                        }
        // alert("Word: "+ word)
    }

