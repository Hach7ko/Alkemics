/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'plusOne',
    'nvd3'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController($scope, $http) {

        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.search  = '';     // set the default search/filter term
        $scope.products     = '';

        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                transitionDuration: 500,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $http.get('assets/products.json')
            .success(function(response) {
                $scope.products = response.data;
                $scope.numberOfProducts = response.totalResults;
                sortByBand();
                sortByWeight();
                sortByCertification();
            })
            .error(function(response){
                $scope.products = [{heading:"Error",description:"Could not load json data"}];
            });

        function sortByBand() {
            $scope.dataBrand = [];

            for(var i in $scope.products) {
                var product = $scope.products[i];

                if($scope.dataBrand.length > 0) {
                    for(var j in $scope.dataBrand) {
                        brandName = $scope.dataBrand[j];

                        if(brandName.key === product.isBrandedBy.name) {
                            brandName.y += 1;
                        } else if(brandName === $scope.dataBrand[$scope.dataBrand.length-1]) {
                            $scope.dataBrand.push({
                                key: product.isBrandedBy.name,
                                y: 1
                            });
                        }
                    }
                } else {
                    $scope.dataBrand.push({
                        key: product.isBrandedBy.name,
                        y: 1
                    });
                }

            }
        }

        function sortByWeight() {
            $scope.dataWeight= [
                {
                    key: "0 to 200",
                    y: 0
                },
                {
                    key: "250 to 500",
                    y: 0
                },
                {
                    key: "500 to 1000",
                    y: 0
                },
                {
                    key: "more than 1000",
                    y: 0
                }];

            for(var i in $scope.products) {
                product = $scope.products[i];

                if(product.quantityNormalized >= 0 && product.quantityNormalized <= 200) {
                    $scope.dataWeight[0].y += 1;
                } else if(product.quantityNormalized >= 250 && product.quantityNormalized <= 500) {
                    $scope.dataWeight[1].y += 1;
                } else if(product.quantityNormalized >= 500 && product.quantityNormalized <= 1000) {
                    $scope.dataWeight[2].y += 1;
                } else if(product.quantityNormalized > 1000) {
                    $scope.dataWeight[3].y += 1;
                }
            }
        }

        function sortByCertification() {
            $scope.dataCertification = [
                {
                    key: "Accepted",
                    y: 0
                },
                {
                    key: "Certified",
                    y: 0
                },
                {
                    key: "Attribued",
                    y: 0
                }
            ];

            for(var i in $scope.products) {
                product = $scope.products[i];

                if(product.certified === 1) {
                    $scope.dataCertification[0].y += 1;
                } else if(product.certified === 2) {
                    $scope.dataCertification[1].y += 1;
                } else if(product.certified === 5) {
                    $scope.dataCertification[2].y += 1;
                }
            }
        }
    });

