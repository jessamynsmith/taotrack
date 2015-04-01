describe('controllers', function() {
  var scope;

  // Mock unavailable modules
  angular.module('ngMessages', []);
  angular.module('highcharts-ng', []);

  // load the controller's module
  beforeEach(module('taotrack.controllers'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('CyclesCtrl', {$scope: scope});
  }));

  it('should have no params initially', function() {
    expect(scope.params).toEqual({});
  });

  it('should have no cycles if start and end date are the same', function() {
    expect(scope.calculateCycle(new Date(), new Date(), 10)).toEqual([]);
  });

  it('should have cycles if start and end date are different', function() {
    var expected = [[1422766800000, 0], [1423198800000, 100], [1423630800000, 0],
      [1424062800000, 100], [1424494800000, 0], [1424926800000, 100]];
    expect(scope.calculateCycle(new Date(2015, 1, 1), new Date(2015, 1, 30), 10)).toEqual(expected);
  });
});
