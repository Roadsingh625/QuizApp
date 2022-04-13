// const quizdb = [
//     {

//         question: "Q1: Which of the following JavaScript cannot do?",
//         a: "JavaScript can react to events",
//         b: "JavaScript can manipulate HTML elements",
//         c: "JavaScript can be use to validate data",
//         d: "All of the Above",
//         answer: "answer4"

//     },
//     {
//         question: "Q2: Whats so great about XML?",
//         a: "Easy data exchange",
//         b: "High speed on network",
//         c: "Only B.is correct",
//         d: "Both A & B",
//         answer: "answer4"
//     },
//     {
//         question: "Q3: Which is not a property of attribute Behaviour of <Marquee> tag?",
//         a: "alternate",
//         b: "blur",
//         c: "scroll",
//         d: "slide",
//         answer: "answer2"
//     },
//     {
//         question: "Q4: _________ keyword is used to declare variables in javascript.",
//         a: "Var",
//         b: "Dim",
//         c: "String",
//         d: "None of the above",
//         answer: "answer1"
//     },
//     {
//         question: "Q5: The attribute used to define a new namespace is.",
//         a: "XMLNS",
//         b: "XmlNameSpace",
//         c: "Xmlns",
//         d: "XmlNs",
//         answer: "answer3"
//     }
// ];
const question= document.querySelector('.question');
const option1=document.querySelector('#option1');
const option2=document.querySelector('#option2');
const option3=document.querySelector('#option3');
const option4=document.querySelector('#option4');
const submit=document.querySelector('#Submit');
const answers=document.querySelectorAll('.answer');
const ShowScore=document.querySelector('#showscore')
let questionCount=0;
let score=0;
let i=1;
let temp;
let j=0;
var result=[];
let loadfun=()=>{
    fetch('https://opentdb.com/api.php?amount=4&category=18&difficulty=easy&type=multiple').then((apidata)=>{

// console.log(apidata)
return apidata.json()
}).then((actualdata)=>{
    //console.log(actualdata)
     result=actualdata;
     //console.log(result)
    const data=result.results[0]
    const options1=data.incorrect_answers[0]
    const options2=data.incorrect_answers[1]
    const options3=data.incorrect_answers[2]
    const options4=data.correct_answer
    // const questionList=quizdb[questionCount]
    question.textContent=data.question
    option1.textContent=options1
    option2.textContent=options2
    option3.textContent=options3
    option4.textContent=options4
}).catch((error)=>{
   console.log(`error is :${error}`)
});

//     const questionList=quizdb[questionCount]
//    question.textContent=data.results[index]
//    option1.textContent=questionList.a
//    option2.textContent=questionList.b
//    option3.textContent=questionList.c
//    option4.textContent=questionList.d

};

 loadfun()

const dselect = () =>{
    answers.forEach((currAnsElement) => currAnsElement.checked = false);
};

const GetCheckAns =( () => {
    let answer;
    answers.forEach((currAnsElement) => {
        if(currAnsElement.checked){
            let nextSibling = currAnsElement.nextElementSibling;
            answer=nextSibling.textContent
        }
    }); 
    return answer;
});

submit.addEventListener('click', ()  => {
    let anna=result.results;
        let answer=anna[j].correct_answer;
        j++;
        //console.log(result)
        let temp=result.results;
    const checkedAns = GetCheckAns()
     console.log(checkedAns);
     if(checkedAns==answer){
         score++;
     }
     dselect()
     questionCount++;
     //console.log(temp.length)
     if(questionCount<temp.length){
        question.textContent=temp[i].question
        const options1=temp[i].incorrect_answers[0]
        const options2=temp[i].correct_answer
        const options3=temp[i].incorrect_answers[2]
        const options4=temp[i].incorrect_answers[1]
        option1.textContent=options1
        option2.textContent=options2
        option3.textContent=options3
        option4.textContent=options4
        i++;
     }
     else{
            ShowScore.innerHTML =`<h3>Your Score is ${score}/${temp.length}</h3>
         <button class="btn" onclick="location.reload()">Play Again</button>
         `
         ShowScore.classList.remove('scorearea')
         }
});
