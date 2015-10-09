(function() {
	var app = angular.module( 'weatherapp', [] );
	app.controller('ReviewController', function() {
		this.review = {};
		this.addReview = function( product ){
			this.review.createdOn = Date.now();
			product.reviews.push(this.review);
			this.review = {};
		};
	});

	app.controller('weatherController', function( $scope, getWeatherService ){
			this.learnmoreaboutweatherapp = 0;
		 	$scope.weathers = [];
		 	loadRemoteData( 'Florianopolis, Brazil' );

			function applyRemoteData( newWeather ) {
				if ( newWeather ) {
					console.log( newWeather );
					$scope.weathers.push( newWeather );
				}
				$scope.weatherloading = 0;
				//$scope.place = '';
			}

			function loadRemoteData( place ) {
				getWeatherService.getWeather( place )
					.then(
						function( weathers ) {
							applyRemoteData( weathers );
						}
					);
			}
			this.addWeather = function( weather ){
				var place = this.place;
				var result = loadRemoteData( place );
				this.place = '';
			};
		});

	app.service("getWeatherService",
        function( $http, $q ) {
            return({
                getWeather: getWeatherHttp,
            });
	 		function getWeatherHttp( $q ){
				var request = $http.get('http://api.openweathermap.org/data/2.5/weather?q='+$q+'&units=metric' ).success( function( data ) {});
				return( request.then( handleSuccess, handleError ) );
			}
			function handleError( response ) {
                if ( ! angular.isObject( response.data ) || ! response.data.message ) {
                	return( $q.reject( "An unknown error occurred." ) );
                }
				return( $q.reject( response.data.message ) );
           	}
            function handleSuccess( response ) {
                return( response.data );
            }
	});
	
})();