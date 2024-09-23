const questions = [
    {
      "question": "Who is the creator of PHP?",
      "reponses": [
        "Jack Sparrow", 
        "Rasmus Lerdorf", 
        "Tim Berners-Lee", 
        "Dennis Ritchie"
      ],
      "solution": "2"
    },
    {
      "question": "When was the first implementation of Blockchain Technology?",
      "reponses": [
        "2009", 
        "2008", 
        "2000", 
        "1991"
      ],
      "solution": "1"
    },
    {
      "question": "In which year was the first Playstation made?",
      "reponses": [
       "1994", 
       "1992", 
       "1990", 
       "1995"
      ],
      "solution": "1"
    },
     {
      "question": "What does PHP mean today ?",
      "reponses": [
       "PHP: Personal Home Page",
       "PHP: Program High Performace",
       "PHP: Hypertext Preprocessor",
       "PHP: Hypertext Page"
      ],
      "solution": "3"
    },
     {
      "question": "What is the last Sega console?",
      "reponses": [
       "Dreamcast", 
       "Saturn", 
       "S-Gage", 
       "Lindbergh"
      ],
      "solution": "1"
    },
     {
      "question": "What does www stands for ?",
      "reponses": [
      "Web wasabi world",
      "World wide web",
      "Wide web world",
      "Web war song"
      ],
      "solution": "2"
    },
     {
      "question": "What's the name of the UNIX creator?",
      "reponses": [
      "Mark Shuttleworth", 
      "Kenneth Thompson",
      "Linus Torvalds",
      "Bill Gates"
      ],
      "solution": "2"
    },
    {
      "question": "When was born Alan Turing ?",
      "reponses": [
      "1981", 
      "1891", 
      "1934",
      "1912"
      ],
      "solution": "4"
    },
      {
      "question": "What is the port for the http",
      "reponses": [
        "70",
        "90",
        "82",
        "80"
      ],
      "solution": "4"
    }
  ]
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


let score = 0;
let questionIndex = 0;

submitBtn.onclick = checkAnswer;

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
};

clearPage();

function showQuestion() {
    console.log('showQuestin')

    // console.log(questions[questionIndex]['question'])
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

    headerContainer.innerHTML = title;

    for([index ,item] of questions[questionIndex]['reponses'].entries()){
        // console.log(item);
        console.log(index+1, item);
        const questionTemplate = 
        `<li>
            <table>
                <input value="%number%" type="radio" name="answer" class="answer">
                <span>%Answer%</span>
            </table>
        </li>`

        let answer = questionTemplate.replace('%Answer%', item);
        
        answer = answer.replace('%number%', index+1)

        listContainer.innerHTML += answer;
    }
}

showQuestion();

function checkAnswer(){
    // console.log('Done')

    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
    // console.log(checkedRadio);

    if(!checkedRadio){
        submitBtn.blur()
        return
    }

    // console.log(checkedRadio.value);

    const userAnswer = checkedRadio.value;

    // console.log(userAnswer, questions[questionIndex]['solution'])

    if(userAnswer === questions[questionIndex]['solution']){
        // console.log('Donee')
        score++;
    }

    function showResult(){
        console.log('konec')
         console.log(score);

         const resultTemplate = `
         <h2 class="title">%title%</h2>
                <h3 class="summary">%message%</h3>
                <p class="result">%result%</p>
         `;

         let title = "You're done"
         let summary = "Your score is:"
         let result = `${score}/${questions.length}`

         const finalMessage = resultTemplate.replace('%title%', title).replace('%message%', summary).replace('%result%', result);

         headerContainer.innerHTML = finalMessage;
    }

    if(questionIndex !== questions.length - 1){
        questionIndex++;
        clearPage();
        showQuestion();
        return;
    } else {
        clearPage();
        showResult();
        
    }
}