angular.module('taotrack.controllers', ['highcharts-ng'])

  .controller('AppCtrl', function($scope) {
  })

  .controller('CyclesCtrl', function($scope) {
    Date.prototype.addDays = function(days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    };

    $scope.calculateCycle = function(startDate, endDate, cycleLength) {
      var currentDate = startDate;
      var increment = (cycleLength / 2.0) * 24 * 60 * 60 * 1000;
      var cycles = [];
      var currentValue = false;
      while (currentDate < endDate) {
        cycles.push([currentDate.getTime(), currentValue * 100.0]);
        currentValue = !currentValue;
        currentDate = new Date(currentDate.getTime() + increment);
      }
      return cycles;
    };

    var updateGraph = function(birthDate) {
      var todayDate = new Date();
      var endDate = todayDate.addDays(14);

      $scope.chartConfig.series = [{
        name: 'Physical',
        color: '#E31230',
        data: $scope.calculateCycle(birthDate, endDate, 23)
      }, {
        name: 'Emotional',
        color: '#0f76ed',
        data: $scope.calculateCycle(birthDate, endDate, 28)
      }, {
        name: 'Intellectual',
        color: '#551A8B',
        data: $scope.calculateCycle(birthDate, endDate, 33)
      }];

      // If this is enabled, the graph does not display until the range selector is clicked manually
      //$scope.chartConfig.options.rangeSelector.selected = 1;
    };

    $scope.updateBirthDate = function(birthDateString) {
      // TODO error handling if incorrectly formatted date
      var birthDate = new Date(birthDateString);
      window.localStorage.birthDate = birthDate.toISOString();
      updateGraph(birthDate);
    };

    $scope.params = {};

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'spline',
          zoomType: 'x'
        },
        rangeSelector: {
          enabled: true,
          inputEnabled: false
        },
        xAxis: {
          type: 'datetime',
          plotLines: [{
            color: 'black',
            dashStyle: 'longdash',
            label: {
              rotation: 0,
              text: 'Today'
            },
            value: Date.now(),
            width: 2
          }]
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Level (percentage)'
          }
        },
        tooltip: {
          headerFormat: '',
          pointFormat: '{series.name}: {point.x:%b. %e %Y}: {point.y:.0f}%<br>'
        }
      },
      series: [],
      useHighStocks: true
    };

    var birthDate = window.localStorage.birthDate;
    if (birthDate) {
      $scope.params.birthDate = new Date(birthDate);
      updateGraph($scope.params.birthDate);
    }

  });
