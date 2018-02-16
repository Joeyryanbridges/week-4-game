
//global varaibles
var attacker; //holds index of attacker object in characters array
var defender; //holds index of defender object in characters array

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




// setting stage for game start 
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
	$('#messageCharacters').html("Choose your player! Cowabunga dude!")

	// showing the basepower and name as captions to the picture of character
	for(var i=0;i<characters.length;i++){
			$('#'+i+' > figcaption:last').text(characters[i].basePower);	
			$('#'+i+' > figcaption:first').text(characters[i].name);
	}		

}

// lets you pick attacker and defender
function pickAttackerAndEnemies(){

	console.log("begin clickpickAttackerandEnemies",attacker,defender);

	// if attacker is not yet chosen, it sets the attacker when a user clicks on the character
	if(attacker ===undefined){
		attacker=parseInt($(this).attr('id'));
		$('#attacker').prepend($(this));
		attackerScore=characters[attacker].basePower;
		attackerPower = characters[attacker].attackPower;
		$('#message').html("Pick enemy to fight from remaining characters.");	
		$('#messageCharacters').html("Available enemies");

	}
	// after the attacker is set, for the next click it sets the defender
	else if(defender === undefined){

		defender=parseInt($(this).attr('id'));
		defenderScore = characters[defender].basePower;
		$('#defender').prepend($(this));
		$('#characters').children().prop("disabled",true);
		$('#btnAttackRestart').show();
		$('#btnAttackRestart').attr("disabled",false);
		$('#message').html("ATTACK!");
		if($('#characters').children().length ===0){
			$('#messageCharacters').html("No more enemies left.");
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

