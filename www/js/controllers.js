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
        cycles.push([currentDate.getTime(), currentValue * 100]);
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
      // TODO tooltip isn't showing full date, just month and year
      // TODO graph doesn't show until zoom is clicked

      updateGraph(birthDate);
    };

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'spline'
        },
        // TODO make crosshairs available anywhere on graphed line, if possible
        tooltip: {
          crosshairs: {
            color: 'black',
            dashStyle: 'longdash'
          },
          shared: true
        },
        rangeSelector: {
          enabled: true,
          selected: 1,
          inputEnabled: false
        },
        scrollbar: {
          enabled: true
        },
        xAxis: {
          type: 'datetime',
          range: 1 * 30 * 24 * 3600 * 1000,
          plotLines: [{
              color: 'black',
              dashStyle: 'longdash',
              label: {
                  rotation: 0,
                  text: 'Now'
              },
              value: Date.now(),
              width: 2
            }]
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Cycle Length'
          }
        }
      },
      series: [],
      title: {
        text: ''
      },
      useHighStocks: true
    };

  });
