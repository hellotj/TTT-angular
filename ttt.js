var TTTapp = angular.module("ttthomander", ["firebase"]);
console.log(TTTapp);
TTTapp.controller('TTT_ctrl', function($scope, $firebase) {
	var ticTacRef = new Firebase("https://ttthomander.firebaseio.com/games");

	var playerNum = null;

	var lastGame;
	// Ask for all existing game info from firebase
	ticTacRef.once('value', function(gamesSnapshot) {
	// get the actual games data
	var games = gamesSnapshot.val();
	if(games == null)
	{
	// No games at all, so make a new game -- As if we're Areg
	lastGame = ticTacRef.push( {waiting: true} );
	playerNum = 1;
}
	else // I do have at least one game out there...
	{
		var keys = Object.keys(games);
		var lastGameKey = keys[ keys.length - 1 ];
		var lastGame = games[ lastGameKey ];
		console.log("This person's game: " + lastGameKey);
		if(lastGame.waiting)
		{
// Currently someone is waiting -- Areg is there and we're Rocky
// Grab from Firebase its last game object
	lastGame = ticTacRef.child(lastGameKey);
// Set a new game on this
	lastGame.set( {
		xWin: 0, 
		oWin: 0, 
		waiting:false, 
		playerTurn: 0,
		win: 0,
		cells: [' ',' ',' ',' ',' ',' ',' ',' ',' '],
		clicks: 0,
		isXturn: true
		});
		playerNum = 2;
}
else
{
// Make a new game -- As if we're Areg
lastGame = ticTacRef.push( {waiting: true} );
playerNum = 1;
}

// Attach the last game to what we're up to
$scope.game = $firebase(lastGame);


}
});


	$scope.winningStrings = ["t _ _ t _ _ t _ _", "t {i} _ t _ _ t _ _", "t i {c} t _ _ t _ _", "t i c t {a} _ t _ _ ","t i c t a {c} t _ _", "t i c t a c t {o} _", "t i c t a c t o {e}"];
	var originalback = "-webkit-linear-gradient(193deg, rgba(281,85,5,.9),rgba(134,173,77,.8),rgba(43,195,244,1),rgba(281,85,5,.9))";



function changeback(color){
	var body = document.getElementsByTagName("body")[0];
	body.style.background = color;
}


	$scope.changeVar = function(c){
					if (c == -1){
						return "O";
					} else if (c ==1) {
						return "X";
					}

	};
	$scope.makeMove = function (clickedCell) {
		console.log($scope.game.win);
		console.log($scope.game.cells[clickedCell]);
		// console.log("Clicks: " + $scope.game.clicks);
		if ($scope.game.win === 0){
			if($scope.game.cells[clickedCell]===" "){
				cell = $scope.game.cells;
				console.log("I'm in!");
				$scope.game.cells[clickedCell] = $scope.game.isXturn? 1:-1;
				$scope.filled();
				$scope.game.isXturn = !$scope.game.isXturn;
	

			}
		}
		console.log("Scope.game.clicks: " + $scope.game.clicks);
		$scope.game.$save();
	};

	function winCount(player){ //Winner counter
		if (player == -1){
			$scope.game.oWin +=1;
			
		}
		if (player == 1){
			$scope.game.xWin +=1;
			
		}
	}
	$scope.$watch("game.win", function(newVal, oldVal){
		switch(newVal) {
			case 0: 
				changeback ("-webkit-linear-gradient(193deg, rgba(281,85,5,.9),rgba(134,173,77,.8),rgba(43,195,244,1),rgba(281,85,5,.9))");
				break;
			case 1: 
				changeback("#FF8300");
				break;
			case -1: 
				changeback("#61B4CF");
				break;
			case 2: 
				changeback("#000000");
				break;
		}
	});
	
	$scope.newgame = function(){
		$scope.game.cells = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
		$scope.game.clicks=0;
		$scope.game.win = 0;
		changeback(originalback);
	};

	$scope.filled = function() {
		var player = $scope.game.isXturn? 1:-1;
		var cells = $scope.game.cells;

		$scope.game.clicks+=1;

		for(var i=0; i < $scope.game.cells.length; i++) {
			console.log($scope.game.cells[i]);

			if ((i+1) % 3 === 0){

				if ($scope.game.cells[i] == player && $scope.game.cells[i-1] == player && $scope.game.cells[i-2] == player){
					$scope.game.win = player;
					winCount(player);

				}
			}
		}
		for(var i=6; i <=8; i++) {
			if ($scope.game.cells[i] == player && $scope.game.cells[i-3] == player && $scope.game.cells[i-6] == player){
				$scope.game.win = player;
				$scope.game.win();
				winCount(player);

			}
		}
			if ($scope.game.cells[8] == player && $scope.game.cells[4] == player && $scope.game.cells[0] == player){
				$scope.game.win = player;
				winCount(player);
			
			}
			if ($scope.game.cells[2] === player && $scope.game.cells[4] === player && $scope.game.cells[6] === player){
				$scope.game.win = player;
				winCount(player);
				
		}
		else if ($scope.game.clicks==9 && $scope.game.win === false){
			$scope.game.win = player;
				$scope.game.win();
				winCount(player);
				
		}
	
	};

});
