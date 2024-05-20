let score = JSON.parse(localStorage.getItem
  ('score')) || {
    Wins : 0,
    Losses : 0,
    Ties : 0
  };

  updateScore();

  // if(score === null)
  // {
  //   score = {
  //     Wins : 0,
  //     Losses : 0,
  //     Ties : 0
  //   };
  // }

  function change()
  {
    const chgName = document.querySelector('.js-auto-button');

    const name = chgName.innerHTML;
    if(name === 'Auto Play')
    {
      chgName.innerHTML = 'Stop'
    }
    else{
      chgName.innerHTML = 'Auto Play'
    }
  }

  let isAutoPlaying = false;
  let intervalId;


  function autoplay()
  {
    if(!isAutoPlaying)
    {
      intervalId = setInterval(function automatic(){
        const autoCompMove = compMove();
        playGame(autoCompMove);
      },1000);
      isAutoPlaying = true;
      console.log(intervalId);
    }
    else{
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }

  document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r')
    {
      playGame('Rock');
    }
    else if(event.key==='p')
    {
      playGame('Paper');
    }
    else if(event.key==='s')
    {
      playGame('Scissors');
    }
  });
  
  function playGame(playerMove)
  {
    const computerMove = compMove();
    console.log(`Computer Picked ${computerMove}`);

    let result ='';
    if(playerMove === 'Scissors')
    {
        if(computerMove === 'Rock')
      {
        result = 'You Loose.';
      }
      else if(computerMove === 'Paper')
      {
        result = 'You Win.';
      }
      else if(computerMove === 'Scissors')
      {
        result = 'Tie.';
      }  
    }
    
    else if(playerMove === 'Paper')
    {
      if(computerMove === 'Rock')
      {
        result= 'You Win.';
      }
      else if(computerMove === 'Paper')
      {
        result = 'Tie.';
      }
      else if(computerMove === 'Scissors')
      {
        result = 'You Loose.';
      }
    }
    
    else
    {
      if(computerMove === 'Rock')
      {
        result = 'Tie.';
      }
      else if(computerMove === 'Paper')
      {
        result = 'You Loose.';
      }
      else if(computerMove === 'Scissors')
      {
        result = 'You Win.';
      }
    }
    
    if(result === 'You Win.')
    {
      score.Wins++;
    }
    else if(result === 'You Loose.')
    {
      score.Losses++;
    }
    else
    {
      score.Ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();

    document.querySelector('.js-result').
      innerHTML = result;

    document.querySelector('.js-moves').
      innerHTML = 
      `You
      <img src="Images/${playerMove}-emoji.png" class="move-icon">
      <img src="Images/${computerMove}-emoji.png" class="move-icon">
      Computer`;

  }

  function compMove()
  {
    const randomNumber = Math.random();
    let computerMove = '';

    if(randomNumber >= 0 && randomNumber <1/3)
    {
      computerMove ='Rock';
    }
    else if(randomNumber >= 1/3 && randomNumber <2/3)
    {
      computerMove = 'Paper';
    }
    else if(randomNumber >= 2/3 && randomNumber <1)
    {
      computerMove = 'Scissors';
    }
    return computerMove;
  }

  function updateScore(){
    document.querySelector('.js-score').
      innerHTML =`Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
  }