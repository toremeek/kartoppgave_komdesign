var width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  ),
  height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

d3.json("/data/map.topojson").then((kart) => {
  draw(kart);
});

function draw(kart) {
  const svg = d3
    .select("body")
    .append("svg")
    .attr("height", height)
    .attr("width", width);

  const projection = d3
    .geoAlbers()
    .center([7.5, 64.9])
    .rotate([-10.4, 0])
    .parallels([50, 60])
    .scale(4000)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath(projection);
  var div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
<<<<<<< HEAD

  var fylker = topojson.feature(kart, kart.objects.collection).features;

  var populationById = {};

  var data = [
    {
      fylke: 1,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 2,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 3,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 4,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 5,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 6,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 7,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 8,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 9,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 10,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 11,
      kvinner: 1,
      menn: 2,
    },
    {
      fylke: 12,
      kvinner: 1,
      menn: 2,
    },
  ];

  data.forEach(function (d) {
    populationById[d.fylke] = {
      kvinner: +d.kvinner,
      menn: +d.menn,
    };
  });

  fylker.forEach(function (d) {
    d.detaljer = populationById[d.properties.fylkesnummer]
      ? populationById[d.properties.fylkesnummer]
      : {};
  });

  const g = svg.append("g");
  g.selectAll("path")
    .data(fylker)
    .enter()
    .append("path")
    .attr("class", "fylke")
    .attr("d", path)
    .attr("name", function (d) {
      return d.properties.fylkesnummer;
    })
    .attr("id", function (d) {
      return d.id;
    })

    .on("mouseover", function (d) {
      d3.select(this)
        .transition()
        .duration("50")
        .attr("opacity", ".5")
        .attr("class", "hoverfylker");
      div.transition().duration(50).style("opacity", 1);
      d3.select("country").text("Vil ha data her");
      const fylke = d.path[0].__data__.properties;
      console.log(fylke);
    })
    .on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration("50")
        .attr("opacity", "1")
        .attr("class", "fylke");
    });
}
=======
    
const svg = d3.select("body").append("svg").attr("height", height).attr("width", width);


const projection = d3.geoAlbers().center([4, 64.9]).rotate([-10.4, 0]).parallels([50, 60]).scale(4000).translate([width / 2, height / 2]);
const path = d3.geoPath(projection)

d3.json("/data/map.topojson").then(kart => {
    var fylker = topojson.feature(kart, kart.objects.collection);
    console.log(fylker)
    const g = svg.append("g");
    g.selectAll("path").data(fylker.features).enter().append("path").attr("class", "fylke").attr("d", path)
        .on("mouseover", function (d) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.5')
                .attr("class", "hoverfylker");
                div.transition()
                .duration(50)
                .style("opacity", 1);
            d3.select(".content")
            .text(properties.navn)
        }).on('mouseout', function () {
            d3.select(".content")
            .text("")
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1')
                .attr("class", "fylke");
                
        })
})
>>>>>>> 63adae76ab19d6593c93c068e4b1a7fac19eac9c
