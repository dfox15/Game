// script.js

var curPlayerText = $('#curPlayer')
var state = {};



$.fn.center = function () {
  this.css("position","absolute");
  this.css("top", Math.max(0, (
    ($(window).height() - $(this).outerHeight()) / 2) + 
     $(window).scrollTop()) + "px"
  );
  this.css("left", Math.max(0, (
    ($(window).width() - $(this).outerWidth()) / 2) + 
     $(window).scrollLeft()) + "px"
  );
  return this;
}

$("#splashScreen").show();
$("#splashScreen-content").show().center();

function log(message)
{
	var cur = $('#log').val();
	cur += "Player " + state.curPlayer.attr("title") + " " + message + "\r\n"
	$('#log').val(cur);
	
}


function rollDice(e)
{
	e.preventDefault()
	$('#rollDiceButton').attr('disabled','disabled')
	var rand = Math.ceil(4 * Math.random())
	$('#numbOfMoves').val(rand)
	log("rolled a " + rand)
	return false;
}

function nextPlayerTurn() {
	if(!state.curPlayer) {
		state.curPlayer = $('.player').first()
		return;
	}
	var players = $('.player');
	var index = players.index(state.curPlayer) + 1;
	
	if(index >= state.playerCount)
		index = 0;
	
	state.curPlayer = $(players[index]);

}

function setNextPlayerTurnText()
{
	$('#rollDiceButton').removeAttr('disabled')
	$('#guessButton').attr('disabled', 'disabled');
	$('#numbOfMoves').val(null);
	$('#locationList').val('')
	nextPlayerTurn();

	var nextPlayerText = state.curPlayer.attr('title')
	curPlayerText.text(nextPlayerText);

}

function selectGuilty()
{
	var suspects = $('#suspectList').children('option')
	var suspectLength = suspects.length	
	var selectedSuspect = Math.floor(Math.random() * suspectLength)
	
	state.suspect = $(suspects[selectedSuspect]).val();
	
	var weapons = $('#weaponList').children('option')
	var weaponsLength = weapons.length	
	var selectedWeapon = Math.floor(Math.random() * weaponsLength)
	
	state.weapon = $(weapons[selectedWeapon]).val();
	
	var rooms = $('#locationList').children('option')
	var roomsLength = rooms.length	
	var selectedRoom = Math.floor(Math.random() * roomsLength)
	
	state.location = $(rooms[selectedRoom]).val();
}

function guess() {
	var win = true;
		if($('#suspectList').val() !== state.suspect) {
		win = false;
		alert("You have the wrong suspect!");
	}
	
	if($('#weaponList').val() !== state.weapon && win) {
		win = false;
		alert("You have the wrong weapon!");
	}
		
	if($('#locationList').val() !== state.location && win) {
		win = false;
		alert("You have the wrong location!");
	}
	if(!win){
	log("was proved " + win)
	setNextPlayerTurnText();

	}
	else {
	alert("Your instincts are correct, you have suspected correctly.");
	log("was not proved" + win)
	}
}

function accuse(){
	var win = true;
			if($('#suspectList').val() !== state.suspect) {
		win = false;
		alert("You have made a false accusation, YOU LOSE!");
	}
	
	if($('#weaponList').val() !== state.weapon && win) {
		win = false;
		alert("You have made a false accusation, YOU LOSE!");
	}
		
	if($('#locationList').val() !== state.location && win) {
		win = false;
		alert("You have made a false accusation, YOU LOSE!");
	}
	if(!win){
		log("made a " + win + " accusation and is now out of the game.")
		var temp = state.curPlayer;
		setNextPlayerTurnText();
		state.playerCount--;
		temp.remove();

		}
	else {
	alert("YOU WIN!!!");
	log("made a correct accusation and has won the game. Game Over!")
	}
	
}



function startGame() {
	state.playerCount = parseInt($("#numPlayers").val());
	$('.player').each(function(i, p) {
		if(i >= state.playerCount)
			$(p).hide();
	})
	
    $("#splashScreen").fadeOut();
	
	setNextPlayerTurnText();
	selectGuilty();
	$('#log').val("");
}



$(function() {
	$('.player').draggable({
		containment: ".container", 
		scroll: false,
		stack: ".player",
		revert: moveInvalid
	});

function distance(startRoom, endRoom) {
	
	var sx = startRoom % 5
	var sy = Math.floor(startRoom / 5)
	
	var ex = endRoom % 5
	var ey = Math.floor(endRoom / 5)
	
	return Math.abs(sx - ex) + Math.abs(sy - ey)
}
	
function moveInvalid(room) {
    if(this.attr('id') !== state.curPlayer.attr('id')) {
		alert("Wait your turn!");
		return true;
	}
	
	var rooms = $('.room');
	var totalNumbOfMoves = $('#numbOfMoves').val();
	
	if(!totalNumbOfMoves) {
		alert("Please roll the dice");
		return true;
	}
	var startRoom = this.data('curRoom') || this.next()
	var start = rooms.index(startRoom);
	var end = rooms.index(room);
	
	

	var numbOfMoves = distance(start, end);	
	
	if((start === 0&& end === 24)||
	(start === 4&& end === 20) ||
	(start === 24&& end === 0)|| 
	(start === 20&& end === 4)){
		numbOfMoves = 1;
		
	}
	
	if(numbOfMoves > totalNumbOfMoves) {
		alert("Please move only within your roll");
		return true;
	}
	
	$('#numbOfMoves').val(totalNumbOfMoves - numbOfMoves);
		
	this.data('curRoom', room);
	var roomId = room.attr('id');
	$('#locationList').val(roomId)
	
	if(roomId) {
		$('#guessButton').removeAttr('disabled');
	}
	else {
		$('#guessButton').attr('disabled', 'disabled');
	}

	log('moved ' + numbOfMoves + " space(s)")
	return false;
	
}

function isEmpty() {
    if(!($('#board').find('.row').find('room')))
        alert("here")
    //$( "#draggable" ).draggable({ revert: true });
}
	
$('.room').droppable({
    tolerance: 'intersect',
    drop: function(event, ui) {
        var drop_p = $(this).offset();
        var drag_p = ui.draggable.offset();
        var left_end = drop_p.left - drag_p.left + 1;
        var top_end = drop_p.top - drag_p.top + 1;
        ui.draggable.animate({
            top: '+=' + top_end,
            left: '+=' + left_end
        });
        
        isEmpty();
    },
	stop: function (event, ui) {
		var item = $(ui.item);
		var to = item.parent().is(".room");
		var siblingsCount = item.siblings().size();
		if (to && siblingsCount > 0) {
		  alert("only one item allowed here");
		  return false;
		}
    }
});

$('.boxArt').draggable({
    revert: 'invalid',
    scroll: false,
    stack: ".boxArt"
});
});

$("#droppable_widget, .draggable_widget").sortable({
  connectWith: "#droppable_widget, .draggable_widget",
  start: function (event, ui) {
  },
  stop: function (event, ui) {
    var item = $(ui.item);
    var to = item.parent().is("#droppable_widget");
    var siblingsCount = item.siblings().size();
    if (to && siblingsCount > 0) {
      alert("only one item allowed here");
      return false;
    }
  }
});





/*$(function() {
    // Character draggable operations
    $('#missScarlet').draggable();
	$('#profPlum').draggable();
	$('#mrsWhite').draggable();
	$('#mrsPeacock').draggable();
	$('#mrGreen').draggable();
	$('#colMustard').draggable();
	
	//$('#box1').draggable({scroll: true, revert: "invalid"});    
	$('#box2').draggable({axis: "x"});	
	$('#box3').draggable({axis: "y"});	
	$('#box4').draggable({containment: ".container", revert: "valid"});
	
	$('#droppable').droppable({
		accept: '#box1',
		drop: function() {
			$(this).find('span').html("when a box to attitude, drop it like it's hot!");
		}
		
	});
	
	
	
	function Game(strategy) {
    this.strategy = strategy;
}

Game.prototype.playScene = function() {
    return this.strategy();
}

var sceneThree = function() {
     console.log('Third scene logic here');   
    
    return {
        text: 'scene3 played',
    }
}

var sceneTwo = function() {
    console.log('Second scene logic here');
    
    return {
        text: 'scene2 played',
        next: sceneThree
    }
}

var sceneOne = function() {
    console.log('First scene logic here');
    
    // based upon some conditions return next scene
    // let's keep it simple and just return sceneTwo
    return {
        text: 'How many players are there?',
        next: sceneTwo
    }
}

var game = new Game(sceneOne);
var scene;

$('#playGame').click(function() {
    scene = game.playScene();
    
    $('#current').html(scene.text);
    
    if(scene.next !== undefined) {
        game = new Game(scene.next);
    }
});
	
  var numeric = [
        ['input','input'],
        ['input','input']
    ];
    var obj = {
        'row1' : {
            'key1' : 'input1',
            'key2' : 'inpu2'
        },
        'row2' : {
            'key3' : 'input3',
            'key4' : 'input4'
        }
    };
    var mixed = {
        'row1' : ['input1', 'inpu2'],
        'row2' : ['input3', 'input4']
    };

console.log(numeric);
console.log(obj);
console.log(mixed);*/
	
	
	
	
	
	// SORTABLE
	// https://jqueryui.com/sortable/
	/*$('#sortable').sortable({connectWith: "#sortableToo", 		placeholder: "placeholderBox"});
	$('#sortableToo').sortable({connectWith: "#sortable", 		placeholder: "placeholderBox"});
	
	// ACCORDION
	$('#accordion').accordion({collapsible: true, 
		heightStyle: "content"
	});

	// DATEPICKER
	$('.date').datepicker({showOtherMonths: true, 
		selectOtherMonths: true, 
		showButtonPanel: true,
		changeMonth: true,
		changeYear: true,
		numberOfMonths: 2,
		minDate: "-1",
		maxDate: "+1W +5D"
		
	});
	
	// TO DO LIST
	$('#todoList ul').sortable({
		items: "li:not('.listTitle, .addItem')",
		connectWith: "ul",
		dropOnEmpty: true,
		placeholder: "emptySpace"		
	});
	
	$('input').keydown(function(e) {
		if(e.keyCode == 13) {
			var item = $(this).val();
			
            $(this).parent().parent().append('<li>' + item + '</li>');
            $(this).val('');
        }
    });
    
    $('#trash').droppable({
        drop: function(event, ui) {
            ui.draggable.remove();
        }
    });
    
});*/
