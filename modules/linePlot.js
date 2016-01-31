/**
 * Created by Maciej on 1/30/2016.
 */
//create a d3.custom namespace

d3.custom = {};

d3.custom.linePlot = function(){
    //internal variables
    var w = 600,
        h = 300,
        m = {t:25,r:50,b:25,l:50},
        padding = 2,
        svg;


    //exports
    function exports(_selection){

        chartW = w - m.l - m.r;
        chartH = h - m.t - m.b;

        _selection.each(function(_data){
            //console.log("time");
            //maxim = d3.max(_data.time);

            //maxim = d3.max(function(d){
            //    console.log(d.time);
            //    return d.time});
            //console.log(maxim);
            //console.log(d3.extent(_data.time));

            if(!svg){
                svg = d3.select(this).append('svg').attr({width:w,height:h});
                svg.append('g').attr('class','chart').attr('transform','translate('+ m.l+','+ m.t+')');
            }

            //var barW = ( chartW - (_data.length-1)*padding )/_data.length;
            var scaleX = d3.time.scale().domain(d3.extent(_data, function(d){return d.time;})).range([0,w]),
                scaleY = d3.scale.linear().domain(d3.extent(_data, function(d){return d.DomAnk_X_mPers2;})).range([h,0]);

            var line = svg.select('.chart').selectAll('.line')
                .data(_data);

            // axes ToDo axisY and append both
            var axisX = d3.svg.axis()
                .orient('bottom')
                .scale(scaleX);

            // Generator
            var lineGenerator = d3.svg.line()
                .x(function(d){return scaleX(d.time)})
                .y(function(d){return scaleY(d.DomAnk_X_mPers2);})
                .interpolate('basis');

            line
                .enter()
                .append('path')
                .attr('d',lineGenerator);

            //line.exit()
            //    .remove();

            //bars.transition()
            //    .attr('x',function(d,i){
            //        return i*(barW + padding);
            //    })
            //    .attr('width',barW)
            //    .attr('y',function(d){return scaleY(d)})
            //    .attr('height',function(d){return chartH - scaleY(d)});
        });
    }

    //getter and setter
    exports.width = function(_x){
        if(!arguments.length) return w;
        w = _x;
        return this;
    }
    exports.height = function(_x){
        if(!arguments.length) return h;
        h = _x;
        return this;
    }
    exports.padding = function(_x){
        if(!arguments.length) return padding;
        padding = _x;
        return this;
    }


    //return
    return exports;
}