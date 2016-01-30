var width = d3.select('.plot').node().clientWidth,
    height = d3.select('.plot').node().clientHeight;

/*
var values = d3.range(20).map(function(){return Math.random();});
var barChart = d3.custom.simpleBar();
d3.select('#plot-1').datum(values).call(barChart);*/

//generate data
var normal = d3.random.normal(50,15);

//Study the same normal distribution, with varying bin width
var hist1 = d3.custom.histogram().width(width).height(height).bins(10),
    hist2 = d3.custom.histogram().width(width).height(height).bins(20).range([40,100]),
    hist3 = d3.custom.histogram().width(width).height(height).bins(50);

//Generate new data
d3.select('.controls .btn').on('click',function(){
    var values = d3.range(1000).map(function(){ return normal();});

    d3.select('#plot-1').datum(values).call(hist1);
    d3.select('#plot-2').datum(values).call(hist2);
    d3.select('#plot-3').datum(values).call(hist3);
})