var TTT_ctrl = function($scope) {
 $scope.cells = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
 $scope.isXturn = true;
 $scope.makeMove = function (clickedCell) {
	if($scope.cells[clickedCell]==" "){
		cell = $scope.cells;
		// console.log(clickedCell);
		$scope.cells[clickedCell] = $scope.isXturn? 1:-1;
		$scope.isXturn = !$scope.isXturn;
 	}

		$scope.filled();
	 };

	$scope.winner = [[1,1,1],[-1,-1,-1]];

	$scope.filled = function() {
		$scope.storage = 0;
		for (var index = 0; index <= 2; index++){
			if ($scope.cells[index] != " "){
				$scope.storage += $scope.cells[index];
				console.log($scope.storage);
				
				var play1 = 3;
				var play2 = -3;
			}
		}

		if ($scope.storage == play1 || $scope.storage == play2){
		alert("winner!");
	}
	};
	$scope.filled = function() {
		$scope.storage = 0;
		for (var index = 3; index <= 5; index++){
			if ($scope.cells[index] != " "){
				$scope.storage += $scope.cells[index];
				console.log($scope.storage);
				
				var play1 = 3;
				var play2 = -3;
			}
		}
		
		if ($scope.storage == play1 || $scope.storage == play2){
		alert("winner!");
	}
	};
	$scope.filled = function() {
		$scope.storage = 0;
		for (var index = 6; index <= 8; index++){
			if ($scope.cells[index] != " "){
				$scope.storage += $scope.cells[index];
				console.log($scope.storage);
				
				var play1 = 3;
				var play2 = -3;
			}
		}
		
		if ($scope.storage == play1 || $scope.storage == play2){
		alert("winner!");
	}
	};
};