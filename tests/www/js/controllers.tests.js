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

  it('should have Date.addDays', function() {
    expect(new Date(1422766800000).addDays(2)).toEqual(new Date(1422939600000));
  });

  it('should have no params initially', function() {
    expect(scope.params).toEqual({});
  });

  it('should have no cycles if start and end date are the same', function() {
    expect(scope.calculateCycle(new Date(), new Date(), 10)).toEqual([]);
  });

  it('should have cycles if start and end date are different', function() {
    var expected = [[1422766800000, 0], [1423198800000, 100], [1423630800000, 0],
      [1424062800000, 100], [1424494800000, 0], [1424926800000, 100]];
    expect(scope.calculateCycle(new Date(1422766800000), new Date(1425272400000), 10)).toEqual(expected);
  });

  it('should update chartConfig.series', function() {
    scope.todayDate = new Date(1425272400000);
    var expected = [
      {
        name: 'Physical', color: '#E31230',
        data: [[1422766800000, 0], [1423760400000, 100], [1424754000000, 0], [1425747600000, 100]]
      }, {
        name: 'Emotional',
        color: '#0f76ed',
        data: [[1422766800000, 0], [1423976400000, 100], [1425186000000, 0], [1426395600000, 100]]
      }, {
        name: 'Intellectual',
        color: '#551A8B',
        data: [[1422766800000, 0], [1424192400000, 100], [1425618000000, 0]]
      }];

    scope.updateGraph(new Date(1422766800000));
    expect(scope.chartConfig.series).toEqual(expected);
  });

  it('should not update when given invalid date', function() {
    scope.updateBirthDate('');
    expect(scope.chartConfig.series).toEqual([]);
  });

  it('should update when given valid date', function() {
    scope.todayDate = new Date(1425272400000);
    var expected = [
      {
        name: 'Physical', color: '#E31230',
        data: [[1423872000000, 0], [1424865600000, 100], [1425859200000, 0]]
      }, {
        name: 'Emotional',
        color: '#0f76ed',
        data: [[1423872000000, 0], [1425081600000, 100], [1426291200000, 0]]
      }, {
        name: 'Intellectual',
        color: '#551A8B',
        data: [[1423872000000, 0], [1425297600000, 100]]
      }];

    scope.updateBirthDate('2015-02-14');
    expect(scope.chartConfig.series).toEqual(expected);
  });

});
