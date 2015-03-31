angular.module('taotrack.controllers', ['highcharts-ng'])

  .controller('AppCtrl', function($scope) {
  })

  .controller('CyclesCtrl', function($scope) {
    Date.prototype.addDays = function(days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    };

    var calculateCycle = function(startDate, endDate, cycleLength) {
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
        data: calculateCycle(birthDate, endDate, 23)
      }, {
        name: 'Emotional',
        color: '#0f76ed',
        data: calculateCycle(birthDate, endDate, 28)
      }, {
        name: 'Intellectual',
        color: '#551A8B',
        data: calculateCycle(birthDate, endDate, 33)
      }];
    };

    $scope.updateBirthdate = function(birthDateString) {
      // TODO fix formatting of birthDate form
      // TODO store this date for next time
      var birthDate = new Date(birthDateString);
      // TODO error handling if incorrectly formatted date

      updateGraph(birthDate);
    };

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'spline',
          zoomType: 'x'
        },
        rangeSelector: {
          enabled: true
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

  });
