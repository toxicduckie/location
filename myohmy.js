$(function () {
  (function (H) {
    var each = Highcharts.each;
    var seriesTypes = Highcharts.seriesTypes;
    var wrap = Highcharts.wrap;
    wrap(seriesTypes.column.prototype, 'translate', function (proceed) {
        proceed.apply(this);
        var series = this;
        var threshold = series.options.threshold;
        each(series.points, function (point) {
          if (point.y == null) {
            var opts = {
              y: series.yAxis.max / 2 || 5,
              color: '#ddd',
              className: 'no-data',
              noData: 'No Data',
              dataLabels: {
                enabled: true,
                format: 'No Data'
              }
            };
            point.update(opts);
          }
          if (point.y == 0.101011101001110) {
            var opts = {
              y: series.yAxis.max / 1.1 || 5,
              color: '#b3b3b3',
              className: 'locked-data',
              noData: 'LOCKED',
              dataLabels: {
                enabled: true,
                format: 'LOCKED'
              }
            };
            point.update(opts);
          }
        });
    });
  }(Highcharts));
});

$(function() {
  // Set default options
  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily: 'museo-sans, sans-serif',
        color: '#666666',
        textTransform: 'none'
      }
    },
    lang: {
      thousandsSep: ','
    },
    credits: {
      enabled: true,
      text: 'NeighborhoodScout.com',
      href: undefined,
    },
    title: {
      text: null
    },
    tooltip: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      lineWidth: 1,
      gridLineWidth: 0,
      title: {
        text: null,
        style: {
          fontSize: '14px'
        }
      },
      labels: {
        useHTML: true,
        style: {
          fontSize: '14px'
        }
      },
    },
    yAxis: {
      lineWidth: 1,
      gridLineWidth: 0,
      title: {
        text: null,
        style: {
          fontSize: '14px'
        }
      },
      labels: {
        useHTML: true,
        style: {
          fontSize: '14px'
        }
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          style: {
            fontSize: '14px'
          },
        },
        states: {
          hover: {
            enabled: false
          }
        }
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          xAxis: {
            title: {
              style: {
                fontSize: '12px'
              }
            },
            labels: {
              style: {
                fontSize: '12px'
              }
            },
          },
          yAxis: {
            title: {
              style: {
                fontSize: '12px'
              }
            },
            labels: {
              style: {
                fontSize: '12px'
              }
            },
          },
        }
      }]
    }
  });
});

// Stock Chart
$(function () {
  var stockChartOptions = {
    rangeSelector: {
        enabled: false
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
  };

  var stSVHVT = {
    legend: {
      enabled: true,
      borderWidth: 1,
      backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
      shadow: true,
      itemStyle: {
        fontSize: '14px'
      }
    },
    tooltip: {
      enabled: true,
      formatter: function () {
        var d = new Date(this.x);
        var month = Math.floor((d.getUTCMonth() + 3) / 3);
        var s = "<b>Q" + month + " " + d.getUTCFullYear() + '</b><br/>';

        $.each(this.points, function () {
          s += '<span style="color:' + this.series.color + '">\u25CF</span> ' + this.series.name + ': <b>$' + Highcharts.numberFormat(this.point.y, 0) + '</b><br/>'
        });

        return s;
      }
    },
    yAxis: {
      opposite:false,
      title: {
        text: 'Median Home Value (existing homes)'
      },
      labels: {
        formatter: function() {
          return '$' + Highcharts.numberFormat(this.value, 0);
        }
      }
    },
    xAxis: {
      startOnTick: true,
      minorTickInterval: 'auto',
      minorGridLineWidth: 0,
      minorTickLength: 5,
      minorTickWidth: 1,
      labels: {
        formatter: function() {
          var d = new Date(this.value);
          var month = Math.floor((d.getUTCMonth() + 3) / 3);
          return "Q" + month + " " + d.getUTCFullYear();
        }
      },
      plotBands: [{
        from: Date.UTC(2016,6,1), // TODO: Make setting this dynamic
        to: Date.UTC(2019,12,31), // TODO: Make setting this dynamic
        color: '#fffbcc',
        label: {
          text: 'Forecast',
          y: 12,
          x: 0
        }
      }]
    },
  }

  var stockChartsIds = [
    {id: 'tf-neighborhood-home-value-trends', t: ['stSVHVT']},
  ];

  try {
    for (var i = stockChartsIds.length - 1; i >= 0; i--) {
      var chartContainer = $('#chart-'+stockChartsIds[i].id);
      var dataTable = 'data-' + stockChartsIds[i].id;
      var dataContainer = $('#' + dataTable);
      var options = stockChartOptions

      if (stockChartsIds[i].hasOwnProperty('t') && stockChartsIds[i].t.length > 0) {
        for (var k = 0; k < stockChartsIds[i].t.length; k++) {
          options = Highcharts.merge(options, eval(stockChartsIds[i].t[k]));
        }
      }

      chartContainer.highcharts('StockChart',Highcharts.merge(options, {
        data: {
          table: dataTable
        },
      }));
    };
  } catch(e) {
    console.log('highcharts errors stock', e)
  }

})

// Line Chart
$(function() {
  var lineChartOptions = {
    chart: {
      type: 'line'
    },
    plotOptions: {
      series: {
        lineWidth: '5px'
      },
      line: {
        marker: {
          radius: 8,
          enabled: true
        }
      }
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
      borderWidth: 1,
      backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
      shadow: true,
      itemStyle: {
        fontSize: '14px'
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
        }
      }]
    }
  }

  var ltRHM = {
    plotOptions: {
      series: {
        lineWidth: '2px'
      },
      line: {
        marker: {
          enabled: false
        }
      }
    },
    yAxis: {
      title: {
        enabled: true,
        text: 'Years'
      }
    },
    tooltip: {
      headerFormat: '<b>{point.key}</b><br/>',
      enabled: true,
      crosshairs: true,
      animation: false,
      shared: true
    },
  }

  var ltCrimeTrend = {
    yAxis: {
      min: 0,
      softMax: 200,
      gridLineWidth: 1,
      labels: {
        formatter: function() {
          if (this.value == 100) {
            return 'National Median'
          } else {
            return (this.value / 100) + "x"
          }
        }
      },
    },
    xAxis: {
      tickPositions: [2011,2016,2021],
    },
    plotOptions: {
      line: {
        marker: {
          symbol: 'circle',
          radius: 8,
          enabled: true
        }
      }
    }
  }

  var lineChartsIds = [
    {id: 'tf-regional-housing-market', t: ['ltRHM']},
    {id: 'tf-neighborhood-crime-trends', t: ['ltCrimeTrend']}
  ]
  try {
    for (var i = lineChartsIds.length - 1; i >= 0; i--) {
      var chartContainer = $('#chart-'+lineChartsIds[i].id);
      var dataTable = 'data-' + lineChartsIds[i].id;
      var dataContainer = $('#' + dataTable);
      var options = lineChartOptions

      if (lineChartsIds[i].hasOwnProperty('t') && lineChartsIds[i].t.length > 0) {
        for (var k = 0; k < lineChartsIds[i].t.length; k++) {
          options = Highcharts.merge(options, eval(lineChartsIds[i].t[k]));
        }
      }

      chartContainer.highcharts(Highcharts.merge(options, {
        data: {
          table: dataTable
        },
      }));
    };
  } catch(e) {
    console.log('highcharts errors linegraph')
  }
});

// Pie Charts
$(function() {
  var pieChartOptions = {
    chart: {
      type: 'pie'
    },
    colors: ['#D8C15A', '#A9A389', '#846896', '#73a480', '#d37c5d', '#5d78a5', '#9C667E', '#66999C'],
    plotOptions: {
      pie: {
        size: '240',
        center: ['50%', '50%'],
        dataLabels: {
          distance: 10,
          crop: false,
          enabled: true,
          format: '{point.name}: <br>{y:.1f}%',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          },
          useHTML: true
        },
        innerSize: '55%',
      },
    },
    responsive: {
      rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
          legend: {
            enabled: true,
            itemWidth: 250,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            labelFormat: '{name}: {y:.1f}%',
          },
          plotOptions: {
            pie: {
              showInLegend: true,
              dataLabels: {
                enabled: false
              }
            }
          }
        }
      }]
    }
  };

  var pieChartsIds = [
    {id: 'do-age-distribution'},
    {id: 'do-marital-status'},
    {id: 'do-means-of-transport'},
    {id: 'do-vehicles-per-household'}
  ]

  for (var i = pieChartsIds.length - 1; i >= 0; i--) {
    var chartContainer = $('#chart-'+pieChartsIds[i].id);
    var dataTable = 'data-' + pieChartsIds[i].id;
    var dataContainer = $('#' + dataTable);

    chartContainer.highcharts(Highcharts.merge(pieChartOptions, {
      data: {table: dataTable}
    }));
  };
});

// Crime Charts
$(function() {
  var crimeChartOptions = {
    chart: {
      type: 'column'
    },
    colors: ['#d8c15a', '#e4d491', '#ede2b8'],
    yAxis: {
      showLastLabel: false,
    },
    plotOptions: {
      series: {
        colorByPoint: true,
        pointWidth: '100',
        dataLabels: {
          enabled: true,
          format: '{point.label}'
        }
      }
    }
  }

  var crimeChartsIds = [
    {id: 'cr-violent', tickPositions: [0, 5, 10, 15, 20], median: 3.8},
    {id: 'cr-property', tickPositions: [0, 25, 50, 75, 100], median: 26.0},
    {id: 'cr-crimes-per-sq-mile', tickPositions: [0, 50, 100, 150, 200], median: 32.85}
  ]

  for (var i = crimeChartsIds.length - 1; i >= 0; i--) {
    var chartContainer = $('#chart-'+crimeChartsIds[i].id);
    var dataTable = 'data-' + crimeChartsIds[i].id;
    var dataContainer = $('#' + dataTable);

    var tickCutOff = crimeChartsIds[i].tickPositions[crimeChartsIds[i].tickPositions.length-1]
    var tickStep = crimeChartsIds[i].tickPositions.slice(-2).reduce(function(a,b) {return b-a}, 0)

    crimeChartsIds[i].tickPositions.push(crimeChartsIds[i].tickPositions.slice(-1)[0]+tickStep)
    chartContainer.highcharts(Highcharts.merge(crimeChartOptions, {
      data: {
        table: dataTable,
        seriesMapping: [{x: 0, y: 1, label: 2}],
        parsed: function(columns) {
          columns[2] = ['Label'].concat(columns[1].slice(1))
          columns[1] = columns[1].map(function(i) {
            if ($.isNumeric(i) && i > tickCutOff) {return tickCutOff + (tickStep/2)} else {return i}
          })
        },
      },
      yAxis: {
        tickPositions: crimeChartsIds[i].tickPositions,
        plotLines: [{value: crimeChartsIds[i].median, color: '#ddd', dashStyle: 'shortdash', width: 2, label: {align: 'right', x: -10, useHTML: true, text: 'National Median:<br/>' + crimeChartsIds[i].median}}],
      }
    }));
  };
});

// Bar Charts
$(function () {
  var barChartOptions = {
    chart: {
      type: 'bar'
    },
    xAxis: {
      alternateGridColor: '#f6f5f5',
    },
    plotOptions: {
      series: {
        pointWidth: 40,
        dataLabels: {
          enabled: true
        }
      }
    }
  };

  var btCapTo80 = {
    yAxis: {
      min: 0,
      max: 80000,
      labels: {
        enabled: false
      }
    }
  }

  var btFixedWidth = {
    data: {
      seriesMapping: [{x: 0, y: 2, label: 1}]
    }
  }

  var btFixedWidthColor = {
    data: {
      seriesMapping: [{x: 0, y: 2, label: 1, color: 3}]
    }
  }

  var btCurrency = {
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          formatter: function() {
            return Highcharts.format('${y:,.0f}', {y: this.point.label || this.point.y})
          },
        }
      }
    }
  }
  var btPercentage = {
    hasSTicks: true,
    yAxis: {
      min: 0,
      max: 100,
      labels: {
        format: '{value:.1f}%'
      },
      tickPositions: [0,100]
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          formatter: function() {
            return Highcharts.format('{y:.1f}%', {y: this.point.label || this.point.y})
          }
        }
      }
    },
  }
  var btTrendsScale = {
    yAxis: {
      min: -10,
      max: 10,
      showFirstLabel: false,
      showLastLabel: false,
      tickPositions: [-10, 0, 10],
      labels: {
        enabled: true,
      },
      plotLines: [{
          color: 'rgb(204,214,234)',
          width: 2,
          value: 0,
          zIndex: 5
      }]
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          formatter: function() {
            return Highcharts.format('{y:.1f}%', {y: this.point.label || this.point.y})
          }
        }
      }
    },
  }

  var btPercentOfResidents = {
    hasSTitle: true,
    yAxis: {
      title: {
        text: '% OF RESIDENTS'
      }
    }
  }

  var btPercentOfResidents16OrOlder = {
    hasSTitle: true,
    yAxis: {
      title: {
        text: '% OF EMPLOYED RESIDENTS 16 OR OLDER'
      }
    }
  }

  var btPercentOfHomes = {
    hasSTitle: true,
    yAxis: {
      title: {
        text: '% OF HOMES'
      }
    }
  }

  var themeA = {
    colors: ["#d37c5d"]
  }

  var themeB = {
    colors: ["#66999C"]
  }

  var barChartsIds = [
    {id: 'tf-homeownership-trend', t: ['btTrendsScale', 'btFixedWidthColor']},
    {id: 'tf-rent-price-trend', t: ['btTrendsScale', 'btFixedWidthColor']},
    {id: 'tf-vacancy-trend', t: ['btTrendsScale', 'btFixedWidthColor']},
    {id: 'tf-change-in-college-graduates', t: ['btTrendsScale', 'btFixedWidthColor']},
    {id: 'tf-change-in-school-performance', t: ['btTrendsScale', 'btFixedWidthColor']},
    {id: 'tf-change-in-percapita-income', t: ['btTrendsScale', 'btFixedWidthColor']},
    {id: 'tf-change-in-household-income', t: ['btTrendsScale', 'btFixedWidthColor']},
    {id: 'tf-change-in-unemployment-rate', t: ['btTrendsScale', 'btFixedWidthColor']},
    {id: 're-home-price', t: ['btPercentage', 'btPercentOfHomes', 'themeB']},
    {id: 're-age-of-homes', t: ['btPercentage', 'btPercentOfHomes', 'themeB']},
    {id: 're-home-size', t: ['btPercentage', 'btPercentOfHomes', 'themeB']},
    {id: 're-type-of-home', t: ['btPercentage', 'btPercentOfHomes', 'themeB']},
    {id: 're-homeownership', t: ['btPercentage', 'btPercentOfHomes', 'themeB']},
    {id: 're-special-purpose-housing', t: ['btPercentage', 'btPercentOfHomes', 'themeB']},
    {id: 'do-education-status-of-adults', t: ['btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-per-capita-income', t: ['btFixedWidthColor', 'btCurrency', 'btCapTo80', 'themeA']},
    {id: 'do-median-household-income', t: ['btFixedWidthColor', 'btCurrency', 'btCapTo80', 'themeA']},
    {id: 'do-industries', t: ['btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-race-and-diversity', t: ['btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-ancestry', t: ['btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-languages', t: ['btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-millitary-college-status', t: ['btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-one-person-household', t: ['btFixedWidth','btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-same-sex-partners', t: ['btFixedWidth','btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-married-couple-with-child', t: ['btFixedWidth','btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-single-parent-with-child', t: ['btFixedWidth','btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-average-commute-time', t: ['btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-migration-and-mobility', t: ['btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-occupations', t: ['btPercentage', 'btPercentOfResidents16OrOlder', 'themeA']},
    {id: 'do-unemployment-rate', t: ['btFixedWidthColor', 'btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-percent-with-college-degree', t: ['btFixedWidthColor', 'btPercentage', 'btPercentOfResidents', 'themeA']},
    {id: 'do-percent-with-advance-degree', t: ['btFixedWidthColor', 'btPercentage', 'btPercentOfResidents', 'themeA']},
  ];

  for (var i = barChartsIds.length - 1; i >= 0; i--) {
    var chartContainer = $('#chart-'+barChartsIds[i].id);
    var dataTable = 'data-' + barChartsIds[i].id;
    var dataContainer = $('#' + dataTable);
    var options = barChartOptions

    if (barChartsIds[i].hasOwnProperty('t') && barChartsIds[i].t.length > 0) {
      for (var k = 0; k < barChartsIds[i].t.length; k++) {
        options = Highcharts.merge(options, eval(barChartsIds[i].t[k]));
      }
    }

    try {
      chartContainer.highcharts(Highcharts.merge(options, {
        data: {table: dataTable}
      }), function(chart) {
        var dataLength = chart.series[0].data.length
        var pointWidth = chart.userOptions.plotOptions.series.pointWidth + 10
        var baseHeight =  dataLength * pointWidth
        var hasSTitle = chart.userOptions.hasSTitle
        var hasSTicks = chart.userOptions.hasSTicks

        if (hasSTicks == true) {
          baseHeight +=40
        } else {
          baseHeight += 15
        }

        if (hasSTitle == true) {
          baseHeight += 40
        } else {
          baseHeight += 15
        }

        chart.setSize(undefined, baseHeight);
      });
    } catch (e) {
      console.log("highcharts error 45a2");
    }
  };
});

// Column Charts
$(function () {
  var columnChartOptions = {
    chart: {
      type: 'column'
    },
    colors: ['#16c36b'],
    plotOptions: {
      series: {
        pointWidth: '100',
        dataLabels: {
          enabled: true,
          format: '{y:.1f}'
        }
      }
    }
  }

  var ctLegend = {
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    }
  }

  var btCurrency = {
    yAxis: {
      labels: {
        enabled: true,
        format: '${value:,.0f}'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '${y:,.0f}',
        }
      }
    }
  }

  var btTestScore = {
    plotOptions: {
      series: {
        dataLabels: {
          format: '{y:.1f}%'
        }
      }
    }
  }

  var themeA = {
    colors: ["#846896", '#73a480'],
  }

  var themeB = {
    colors: ["#66999c"],
  }

  var columnChartsIds = [
    {id: 'sh-public-test-scores', t: ['ctLegend', 'btTestScore','themeA']},
    {id: 're-median-rent-by-bedrooms', t: ['btCurrency', 'themeB']},
    {id: 'average-class-size'},
  ]

  // Add Schools
  for (var i = 0; i < $('.public-test-scores-chart').length; i++) {
    var school = {id: $('.public-test-scores-chart')[i].id.replace('chart-', ''), t: ['ctLegend', 'btTestScore', 'themeA']}
    columnChartsIds.push(school);
  }

  try {
    for (var i = columnChartsIds.length - 1; i >= 0; i--) {
      var chartContainer = $('#chart-'+columnChartsIds[i].id);
      var dataTable = 'data-' + columnChartsIds[i].id;
      var dataContainer = $('#' + dataTable);
      var options = columnChartOptions

      if (columnChartsIds[i].hasOwnProperty('t') && columnChartsIds[i].t.length > 0) {
        for (var k = 0; k < columnChartsIds[i].t.length; k++) {
          options = Highcharts.merge(options, eval(columnChartsIds[i].t[k]));
        }
      }

      chartContainer.highcharts(Highcharts.merge(options, {
        data: {
          table: dataTable
        },
      }));
    };
  } catch (e) {
    console.log("highcharts error a7a8");
  }
});

$(function() {
  var buildScatterPlot, fontColor, fontFamily, fontSize, homeValueComparison, i, len, options, rentalMarketComparison, results, scatterPlotOptions;
  fontFamily = '"museo-sans",sans-serif';
  fontSize = '12px';
  fontColor = '#666666';
  buildScatterPlot = function(options) {
    return $(options.id).highcharts({
      chart: {
        type: 'scatter',
        backgroundColor: 'transparent',
        margin: [10, 10, 20, 20],
        spacing: [5, 50, 0, 0],
        style: {
          fontColor: fontColor,
          fontFamily: fontFamily,
          fontSize: fontSize
        }
      },

      credits: {
        enabled: false
      },
      data: {
        table: document.getElementById(options.table)
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        scatter: {
          animation: false,
          marker: {
            radius: 10
          },
          states: {
            hover: {
              enabled: false
            }
          }
        }
      },
      series: [
        {
          color: options.seriesColor
        }
      ],
      title: {
        text: null
      },
      tooltip: {
        backgroundColor: '#F0F0F0',
        hideDelay: 0,
        enabled: true,
        formatter: function() {
          return "<span style='text-align: center;'>" + options.tooltipText + "</span>";
        },
        style: {
          fontColor: fontColor,
          fontFamily: fontFamily,
          fontSize: fontSize
        },
        useHTML: true
      },
      xAxis: {
        gridLineColor: options.axisColor,
        gridLineWidth: 1,
        labels: {
          enabled: false
        },
        lineColor: options.axisColor,
        lineWidth: 1,
        max: 100,
        min: 0,
        minorGridLineWidth: 1,
        minorGridLineColor: options.gridColor,
        minorTickInterval: 50,
        reversed: true,
        tickInterval: 100,
        tickWidth: 0,
        title: {
          enabled: true,
          margin: 3,
          style: {
            color: fontColor,
            fontFamily: fontFamily,
            fontSize: fontSize,
            textTransform: 'uppercase'
          },
          text: options.xTitle
        }
      },
      yAxis: {
        gridLineColor: options.axisColor,
        gridLineWidth: 1,
        labels: {
          enabled: false
        },
        lineColor: options.axisColor,
        lineWidth: 1,
        max: 100,
        min: 0,
        minorGridLineWidth: 1,
        minorGridLineColor: options.gridColor,
        minorTickInterval: 50,
        reversed: true,
        tickInterval: 100,
        title: {
          enabled: true,
          margin: 5,
          style: {
            color: fontColor,
            fontFamily: fontFamily,
            fontSize: fontSize,
            textTransform: 'uppercase'
          },
          text: options.yTitle
        }
      }
    });
  };
  scatterPlotOptions = [
    homeValueComparison = {
      id: '#home-value-comparison-chart',
      table: 'home-value-comparison',
      gridColor: '#66999c',
      axisColor: '#66999c',
      seriesColor: '#66999c',
      tooltipText: $('#home-value-tooltip').html(),
      xTitle: 'Value Relative to Nation',
      yTitle: 'Value Relative to State'
    }, incomeEducation = {
      id: '#incomeEducation-chart',
      table: 'incomeEducation-data',
      gridColor: '#d37c5d',
      axisColor: '#d37c5d',
      seriesColor: '#d37c5d',
      tooltipText: $('#incomeEducation-tooltip').html(),
      xTitle: 'Education level',
      yTitle: 'Household income'
    }, rentalMarketComparison = {
      id: '#rental-market-comparison-chart',
      table: 'rental-market-comparison',
      gridColor: '#66999c',
      axisColor: '#66999c',
      seriesColor: '#66999c',
      tooltipText: $('#rental-market-tooltip').html(),
      xTitle: 'Rent Relative to Nation',
      yTitle: 'Rent Relative to State'
    },
  ];
  results = [];
  for (i = 0, len = scatterPlotOptions.length; i < len; i++) {
    options = scatterPlotOptions[i];
    results.push(buildScatterPlot(options));
  }
  return results;
});
