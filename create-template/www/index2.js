var width = document.body.clientWidth;
height = document.body.clientHeight;

const svg = d3
  .select("body")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

const projection = d3
  .geoAlbers()
  .center([4, 64.9])
  .rotate([-10.4, 0])
  .parallels([50, 60])
  .scale(4000)
  .translate([width / 2, height / 2]);

const path = d3.geoPath(projection);
var data = {
  46: {
    navn: "Vestland",
    kvinner: 2000,
    menn: 4000,
  },
  54: {
    navn: "Tromso og Finnmark",
    kvinner: 3450,
    menn: 25152,
  },
  18: {
    navn: "Nordland",
    kvinner: 3424,
    menn: 201543242,
  },
  50: {
    navn: "Trøndelag",
    kvinner: 1450,
    menn: 20152,
  },
  15: {
    navn: "Møre og Romsdal",
    kvinner: 1443,
    menn: 23152,
  },
  11: {
    navn: "Rogaland",
    kvinner: 7450,
    menn: 266152,
  },
  42: {
    navn: "Agder",
    kvinner: 1450,
    menn: 20152,
  },
  38: {
    navn: "Vestfold og Telemark",
    kvinner: 1450,
    menn: 20152,
  },
  30: {
    navn: "Viken",
    kvinner: 13350,
    menn: 25152,
  },
  3: {
    navn: "Oslo",
    kvinner: 1450,
    menn: 20152,
  },
  34: {
    navn: "Innlandet",
    kvinner: 1450,
    menn: 20152,
  },
};
function fylkeInfoBlob(fylke) {
  var kvinner = data[fylke.fylkesnummer].kvinner;
  var menn = data[fylke.fylkesnummer].menn;
  var navn = data[fylke.fylkesnummer].navn;

  return `
    <div class="tooltip">
    <h2>${navn}</h2>
      <p>Kvinner: ${kvinner}</p>
      <p>Menn: ${menn}</p>
      <p>
    </div>
  `;
}

function mouseOver(d) {
  console.log(d);
  const fylke = d.path[0].__data__.properties;
  d3.select(this)
    .transition()
    .duration("50")
    .attr("opacity", ".5")
    .attr("class", "hoverfylker");
  d3.select(".content").html(fylkeInfoBlob(fylke));
}

function mouseOut() {
  d3.select(".content").text("");
  d3.select(this)
    .transition()
    .duration("50")
    .attr("opacity", "1")
    .attr("class", "fylke");
}

const visKart = async () => {
  const kart = await d3.json("/data/map.topojson");
  const andel = await d3.json("/data/andel.json");
  var fylker = topojson.feature(kart, kart.objects.collection);

  const g = svg.append("g");
  g.selectAll("path")
    .data(fylker.features)
    .enter()
    .append("path")
    .attr("class", "fylke")
    .attr("d", path)
    .on("mouseover", mouseOver)
    .on("mouseout", mouseOut);
};

visKart();
