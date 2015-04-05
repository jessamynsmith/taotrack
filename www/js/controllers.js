angular.module('taotrack.controllers', ['ngMessages', 'highcharts-ng'])

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

    $scope.updateGraph = function(birthDate) {
      var endDate = $scope.todayDate.addDays(14);

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
      var timestamp = Date.parse(birthDateString);
      if (!isNaN(timestamp)) {
        var birthDate = new Date(timestamp);
        window.localStorage.birthDate = birthDate.toISOString();
        $scope.updateGraph(birthDate);
      }
    };

    $scope.todayDate = new Date();
    $scope.params = {};

    var content = angular.element(document.querySelector('#cycles-content')),
      header = angular.element(document.querySelector('ion-header-bar')),
      tabBar = angular.element(document.querySelector('.tab-nav')),
      form = angular.element(document.querySelector('form')),
      height = content.prop('offsetHeight') - header.prop('offsetHeight') -
        tabBar.prop('offsetHeight') - form.prop('offsetHeight') - 26;

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'spline',
          zoomType: 'x',
          height: height
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
          max: 100,
          title: {
            text: 'Level (%)'
          }
        },
        legend: {
          enabled: true,
          layout: 'vertical',
          labelFormatter: function() {
            var descriptions = {
              Physical: 'strength, endurance',
              Emotional: 'cheerfulness, cooperation, optimism',
              Intellectual: 'creativity, learning new concepts'
            };
            return this.name + ': ' + descriptions[this.name];
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
      $scope.updateGraph($scope.params.birthDate);
    }

  })

  .controller('ElementsCtrl', function($scope, $stateParams, Elements) {
    var elementData = Elements.all();
    $scope.elements = [];
    var keys = ['Name', 'Yin Organ', 'Yang Organ', 'Animal', 'Season'];
    for (var i = 0; i < elementData.length; i++) {
      var element = {};
      for (var j = 0; j < keys.length; j++) {
        element[keys[j]] = Elements.getValueFromData(elementData[i], keys[j]);
      }
      element.color = angular.lowercase(Elements.getValueFromData(elementData[i], 'Color'));
      $scope.elements.push(element);
    }
  })
  .controller('ElementDetailCtrl', function($scope, $stateParams, Elements) {
    $scope.element = Elements.get($stateParams.elementName);
    $scope.element.Name = Elements.getValueFromData($scope.element, 'Name');
    $scope.element.color = angular.lowercase(Elements.getValueFromData($scope.element, 'Color'));
  });
