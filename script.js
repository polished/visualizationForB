var width = d3.select('.plot').node().clientWidth,
    height = d3.select('.plot').node().clientHeight;
var margin = {t: 50, r: 100, b: 50, l: 50};

/*
var values = d3.range(20).map(function(){return Math.random();});
var barChart = d3.custom.simpleBar();
d3.select('#plot-1').datum(values).call(barChart);*/

//generate data
//var normal = d3.random.normal(50,15);

//Study the same normal distribution, with varying bin width
//var hist1 = d3.custom.histogram().width(width).height(height).bins(10),
//    hist2 = d3.custom.histogram().width(width).height(height).bins(20).range([40,100]),
//    hist3 = d3.custom.histogram().width(width).height(height).bins(50);
//
////Generate new data
//d3.select('.controls .btn').on('click',function(){
//    var values = d3.range(1000).map(function(){ return normal();});
//
//    d3.select('#plot-1').datum(values).call(hist1);
//    d3.select('#plot-2').datum(values).call(hist2);
//    d3.select('#plot-3').datum(values).call(hist3);
//})

// generate first linePlot for DomAnk_X_mPers2
var linePlot1 = d3.custom.linePlot().width(width).height(height);
//var linePlot1 = d3.custom.linePlot().width(width).height(height);

// get data
d3.csv("Data/SPADES_12_rawdata_allsensor_activities.csv" , parse, dataLoaded);


function parse(d){
    //if(+d.duration<0) return;

    return {
        //time: parseDate(d.HEADER_TIME_STAMP),
        time: new Date(d.HEADER_TIME_STAMP),
        DomAnk_X_mPers2: +d.DomAnk_X_mPers2,
        DomAnk_Y_mPers2	: +d.DomAnk_Y_mPers2,
        DomAnk_Z_mPers2	: +d.DomAnk_Z_mPers2,
        DomThi_X_mPers2	: +d.DomThi_X_mPers2,
        DomThi_Y_mPers2	: +d.DomThi_Y_mPers2,
        DomThi_Z_mPers2	: +d.DomThi_Z_mPers2,
        DomWai_X_mPers2	: +d.DomWai_X_mPers2,
        DomWai_Y_mPers2	: +d.DomWai_Y_mPers2,
        DomWai_Z_mPers2	: +d.DomWai_Z_mPers2,
        DomWri_X_mPers2	: +d.DomWri_X_mPers2,
        DomWri_Y_mPers2	: +d.DomWri_Y_mPers2,
        DomWri_Z_mPers2	: +d.DomWri_Z_mPers2,
        NDomAnk_X_mPers2 : +d.NDomAnk_X_mPers2,
        NDomAnk_Y_mPers2 : +d.NDomAnk_Y_mPers2,
        NDomAnk_Z_mPers2 : +d.NDomAnk_Z_mPers2,
        NDomWai_X_mPers2 : +d.NDomWai_X_mPers2,
        NDomWai_Y_mPers2 : +d.NDomWai_Y_mPers2,
        NDomWai_Z_mPers2 : +d.NDomWai_Z_mPers2,
        NDomWri_X_mPers2 : +d.NDomWri_X_mPers2,
        NDomWri_Y_mPers2 : +d.NDomWri_Y_mPers2,
        NDomWri_Z_mPers2 : +d.NDomWri_Z_mPers2,
        Activity: d.Activity
    }
}
function dataLoaded(err,rows){
    //console.log(rows);
    //d3.select('#plot-1').datum(rows).call(linePlot1);

draw(rows);
}

function draw(data) {
    //console.log(data);
    //console.log(data[1].time);
    //console.log(d3.extent(data, function (d) {
    //    return d.time;
    //}));
    //maxim = d3.max();
    var scaleX = d3.time.scale().domain(d3.extent(data, function (d) {
            return d.time;
        })).range([0, width]),
        scaleY = d3.scale.linear().domain(d3.extent(data, function (d) {
            return d.DomAnk_X_mPers2;
        })).range([height, 0]);

    var plot = d3.select('.container').select('#plot-1')
        .append('svg')
        .attr('width', width + margin.r + margin.l)
        .attr('height', height + margin.t + margin.b)
        .append('g')
        .attr('transform', 'translate(' + margin.l + ',' + margin.t + ')');

    //var plot_main = plot.append('g');
    var axisX = d3.svg.axis()
        .orient('bottom')
        .scale(scaleX);

    var axisY = d3.svg.axis()
        .orient('left')
        .scale(scaleY);

    plot.append('g').attr('class', 'axisX')
        .attr('transform', 'translate(0,' + height + ')')
        .call(axisX);

    plot.append('g').attr('class', 'axisY')
        //.attr('transform', 'translate(' + 50 + ',0)')
        .call(axisY);
    // Generator
    var lineGenerator = d3.svg.line()
        .x(function (d) {
            return scaleX(d.time);
        })
        .y(function (d) {
            return scaleY(d.DomAnk_X_mPers2);
        })
        .interpolate('basis');

    var lines = plot.selectAll('.lines')
        .datum(data);
        //.data(data, function(d) {
            //return d;});

    //var lines_enter = lines.enter().append('path').attr('class', 'line').attr('d', lineGenerator(data));
    //var lines_exit = lines.exit().remove();

    plot.append('path')
        .attr('class', 'line')
        .attr('d', lineGenerator(data))
        .attr('stroke', "black")
        .attr('stroke-width', '1');

    //
    //// axes ToDo axisY and append both
    //var axisX = d3.svg.axis()
    //    .orient('bottom')
    //    .scale(scaleX);


}


