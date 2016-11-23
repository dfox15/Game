// script.js

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

function startGame() {
    $("#splashScreen").fadeOut();
}










$(function() {
	$('.player').draggable({
		containment: ".container", 
		scroll: false,
		stack: ".player"
	});

function moveValid() {
    if ($('.room').is(':empty')){
        alert("here")
    }
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
    },
    revert:'invalid'
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
