	$(document).ready(function(){
    $('.container').slideDown(6000);
	$(".logo").hide();
    $(".logo").fadeIn(15000);
});		
		

// declare global varaibles

//holds index of attacker object in characters array
var attacker;
//holds index of defender object in characters array
var defender; 

var attackerPower;
var attackerScore;
var defenderScore;

// characters as array of objects
var characters=[{
	name:"Homer Simpson",
	basePower:150,
	attackPower:20
},
{
	name:"Bart Simpson",
	basePower:120,
	attackPower:30
},
{
	name:"Marge Simpson",
	basePower:200,
	attackPower:15,
},
{
	name:"Lisa Simpson",
	basePower:150,
	attackPower:20
}];

// calls initialize game function
initializeGame();

// when a character is chosen
$('#characters').on('click', '.character', pickAttackerAndEnemies);

//on pressing the attackRestart button
$('#btnAttackRestart').click(attackRestart);




// sets the stage for starting the game
function initializeGame(){

//variable values at the beginning of the game
	attacker=undefined;    
	defender=undefined;  
	attackerPower=0;
	attackerScore=0;
	defenderScore=0

	// toggle the attackRestart button to Attack
	$('#btnAttackRestart').html("Attack");
	$("#btnAttackRestart").hide();
	$('#messageFooter').html("");
	$('#messageCharacters').html("Welcome to The Simpson's Zombie Edition!<br>Choose your Zombie & fight!"	)

	// showing the basepower and name as captions to the picture of character
	for(var i=0;i<characters.length;i++){
			$('#'+i+' > figcaption:last').text(characters[i].basePower);	
			$('#'+i+' > figcaption:first').text(characters[i].name);
	}		

}

//pick attacker and defender
function pickAttackerAndEnemies(){

	console.log("begin clickpickAttackerandEnemies",attacker,defender);

	// if attacker is not yet chosen, it sets the attacker when a user clicks on the character
	if(attacker ===undefined){
		attacker=parseInt($(this).attr('id'));
		$('#attacker').prepend($(this));
		attackerScore=characters[attacker].basePower;
		attackerPower = characters[attacker].attackPower;

	}
	// after the attacker is set, for the next click it sets the defender
	else if(defender === undefined){

		defender=parseInt($(this).attr('id'));
		defenderScore = characters[defender].basePower;
		$('#defender').prepend($(this));
		$('#characters').children().prop("disabled",true);
		$('#btnAttackRestart').show();
		$('#btnAttackRestart').attr("disabled",false);
		if($('#characters').children().length ===0){
			$('#messageCharacters').html("No more zombies left.");
		}

	}
	console.log("end clickpickAttackerandEnemies",attacker,defender);
}	



// functionality for attack and restart toggle button 
function attackRestart(){
	if($('#btnAttackRestart').html() === "Restart"){
		restart();
	}else if($('#btnAttackRestart').html() === "Attack"){
		attack();
	}
}

// handles the processing after an attack
function attack(){
	var audio = document.getElementById('punch');

	audio.play();
	console.log("inside Attack");
	
	//attacker and defender scores decremented
	defenderScore -= attackerPower;
	attackerScore -= characters[defender].attackPower;
	

	$('#'+attacker+' > figcaption:last').text(attackerScore);
	$('#'+defender+' > figcaption:last').text(defenderScore);

	$('#messageFooter').html("<span>"+"You attacked "+characters[defender].name+" for "+attackerPower+" damage."+"<br>"+characters[defender].name+" attacked you for "+characters[defender].attackPower+" damage."+"</span>"+"<br>");
			
	console.log("inside Attack",attackerPower,characters[attacker].basePower,attackerScore,characters[defender].attackPower,characters[defender].basePower,defenderScore);
	//attackers attack power gets increased
	attackerPower += characters[attacker].attackPower;
	// call result to check result after each attack
	result();
}

// decides if attacker has won, lost, or tied
function result(){
	
	if(attackerScore===0 && defenderScore===0){
		console.log("here 1");
	 	$('#message').html("<span>"+"It's a tie, what the hell?! Game over...!"+"</span>"+"<br>");
	 	beforeRestart();	
	 	return;
	}else if (attackerScore <= 0 && defenderScore>0){
		console.log("here 2");
		$('#message').html("<span>"+"You were zombified "+characters[defender].name+". Game over dude...!"+"</span>"+"<br>");
	 	beforeRestart();
	 	return;

	}else if(attackerScore<0 && defenderScore<0){
		console.log("here 3");
		$('#messageFooter').prepend("<span>"+"You lose. Game over dude...!"+"</span>"+"<br>");
	 	beforeRestart();
	 	return;
	}else if(attackerScore>0 &&  defenderScore<=0){
		console.log("here 4");		
		$('#messageFooter').prepend("<span>"+"You crushed "+characters[defender].name+"</span>"+"<br>");
		
		if($('#characters').children().length ===0){
			$('#messageFooter').prepend("<span>"+"You defeated all zombies!. Radical! "+"</span>"+"<br>");
			$('#messageCharacters').html("CONGRATULATIONS..!!!!");	
			beforeRestart();
	 	}else{
			$('#message').html("Pick another enemy to fight.");
		}
		
		if($('#btnAttackRestart').html() ==="Attack"){
			$('#'+defender).hide();
			defender=undefined;
			$('#btnAttackRestart').attr("disabled",true);
			$('#characters').children().prop("disabled",false);
		}
	}else if(defenderScore>0 &&  attackerScore>0){
		console.log("here 5");
		$('#btnAttackRestart').attr("disabled",false);
	}
}

// handles cleanup before restart
function beforeRestart(){
	
	$('#btnAttackRestart').attr("disabled",false);
	$('#btnAttackRestart').html("Restart");
	$('#message').html("Play again? Press restart to play you dingus!");
}


// restarts by by showing all characters and ccalling initializeGame function
function restart(){

	//show all the characters in default positions
	$('.character').each(function(idx,ele){
			$(ele).show();
			$('#characters').prepend($(ele));
		});
	//set the stage for another game by calling initialize
	initializeGame();
}