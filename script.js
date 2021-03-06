var startbtn = document.getElementById("start");
var timer = document.getElementById("timer");
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
var question = document.getElementById("question");
var submit = document.getElementById("submit");
var body = document.getElementById("box");
var scorescreen = document.getElementById("scorescreen");

var save = document.getElementById("save");
var clear = document.getElementById("clear");
var scores = document.getElementById("scores");

scorescreen.style.display = "none";

var qnum = 0;
var time = 30;
var score = 0;
var questionlist = [
	{
		question: "Is javascript a programming language?",
		answers: {
			a: 'no',
			b: 'yes',
			c: 'maybe'
		},
		correctAnswer: 'b'
	},
	{
		question: "How do you define a variable in javascript?",
		answers: {
			a: 'car',
			b: 'char',
			c: 'var'
		},
		correctAnswer: 'c'
  },
  {
		question: "Can you create objects in javascript?",
		answers: {
			a: 'maybe',
			b: 'no',
			c: 'yes'
		},
		correctAnswer: 'c'
  }
];

//Question Buttons
a.addEventListener("click", function(){ans="a"});
b.addEventListener("click", function(){ans="b"});
c.addEventListener("click", function(){ans="c"});

//question render
function showquestion() {
  
  ans= '';
  question.textContent = questionlist[qnum].question;
  a.textContent = questionlist[qnum].answers.a;
  b.textContent = questionlist[qnum].answers.b;
  c.textContent = questionlist[qnum].answers.c;
  
  return;
}



function derender() {
  body.style.display = "none";
  startbtn.style.display = "none";
  timer.style.display = "none";
  question.style.display = "none";
  submit.style.display = "none";
  scorescreen.style.display = "block";

}

//score screen
var initialsave = localStorage.getItem("initialsave");
var scoresave = localStorage.getItem("scoresave");

clear.addEventListener("click", function(){
  event.preventDefault();
  localStorage.clear();
  renderscores();
})

function renderscores() {
  var initialsave = localStorage.getItem("initialsave");
  var scoresave = localStorage.getItem("scoresave");
  if(initialsave==null || scoresave==null){
    scores.textContent = '';
    console.log("null");
  }
  else{
    scores.textContent = (initialsave+": "+scoresave);
  }

}

function highscores() {
  document.getElementById("showscore").textContent = ("Score: "+score);
  console.log("done");
  derender();
  renderscores();

  save.addEventListener("click", function(){
    event.preventDefault();
    var initials = document.getElementById("fname").value;
    localStorage.setItem("initialsave", initials);
    localStorage.setItem("scoresave", score);
    renderscores();
  });
  
}

//timer
function setTime() {
  var timerInterval = setInterval(function() {
    time--;
    timer.textContent = "Time Left: "+time+" seconds";
    
    if(time < 1) {
      clearInterval(timerInterval);
      highscores();
    }
    
  }, 1000);
}

//start button
startbtn.addEventListener("click", function(){
  ans='';
  showquestion();
  setTime();

  //submit button
  submit.addEventListener("click", function(){
    
    
    console.log(qnum);
    
    if(ans == questionlist[qnum].correctAnswer) {
      score++;
    }
    else{
      time = time-10;
    }
    
    qnum++;
    
    if(questionlist.length !== qnum){
      showquestion();
    }
    else{
      time = 0;
      highscores();
    }
    
    return;
  });
});