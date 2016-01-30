//create a d3.custom namespace

d3.custom = {};

d3.custom.simpleBar = function(){
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
            if(!svg){
                svg = d3.select(this).append('svg').attr({width:w,height:h});
                svg.append('g').attr('class','chart').attr('transform','translate('+ m.l+','+ m.t+')');
            }

            var barW = ( chartW - (_data.length-1)*padding )/_data.length;
            var scaleY = d3.scale.linear().domain([0, d3.max(_data)]).range([chartH,0]);

            var bars = svg.select('.chart').selectAll('.bar')
                .data(_data);

            bars
                .enter()
                .append('rect')
                .attr('class','bar')

            bars.exit()
                .remove()

            bars.transition()
                .attr('x',function(d,i){
                    return i*(barW + padding);
                })
                .attr('width',barW)
                .attr('y',function(d){return scaleY(d)})
                .attr('height',function(d){return chartH - scaleY(d)});
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