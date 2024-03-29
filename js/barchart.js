/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// Creates the svg where the plot will live and applies margins
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// finding the maximum y value
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: setting the span of y values and where they will be plotted on the page
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: setting the span of x values, where they will be plotted on the page and
// leaving spacing around the edge of the plot
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// adding the y values to the plot
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// adding the x values to the plot
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// setting what we want the style to change to when the tooltip is used
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// creating an event for using the tooltip when the plot is mousedover
// object appears
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// creating an event that sets tooltip position when the mouse moves
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// making the object disappear when the mouse leaves
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// generating each bar of the plot from the given data and 
// adding style modifications
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


// CSV Bar


// Creates the svg where the plot will live and applies margins
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


d3.csv("data/barchart.csv").then((data) => {

  console.log(data);

  svg2.selectAll(".bar") 
   .data(data) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);

     // finding the maximum y value
    let maxY2 = d3.max(data, function(d) { return d.score; });

    // TODO: setting the span of y values and where they will be plotted on the page
    let yScale2 = d3.scaleLinear()
                .domain([0,maxY2])
                .range([height- margin.bottom,margin.top]); 

    // TODO: setting the span of x values, where they will be plotted on the page and
    // leaving spacing around the edge of the plot
    let xScale2 = d3.scaleBand()
                .domain(d3.range(data.length))
                .range([margin.left, width - margin.right])
                .padding(0.1); 

    // adding the y values to the plot
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(yScale2)) 
        .attr("font-size", '20px'); 

    // adding the x values to the plot
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(xScale2) 
                .tickFormat(i => data[i].name))  
        .attr("font-size", '20px'); 


});








