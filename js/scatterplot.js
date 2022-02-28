/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 

/* 

  Tooltip Set-up  

*/

// setting what we want the style to change to when the tooltip is used
const tooltip1 = d3.select("#csv-scatter") 
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


const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/scatter.csv").then((data) => {

  console.log(data);

  // finding the maximum y value
  let maxY3 = d3.max(data, function(d) { return d.score; });

  // TODO: setting the span of y values and where they will be plotted on the page
  let yScale3 = d3.scaleLinear()
              .domain([0,maxY3])
              .range([height- margin.bottom,margin.top]); 

  // TODO: setting the span of x values, where they will be plotted on the page and
  // leaving spacing around the edge of the plot
  let xScale3 = d3.scaleLinear()
              .domain([0, maxX])
              .range([margin.left, width - margin.right])
              .padding(0.1); 

  // adding the y values to the plot
  svg3.append("g")
      .attr("transform", `translate(${margin.left}, 0)`) 
      .call(d3.axisLeft(yScale3)) 
      .attr("font-size", '20px'); 

  // adding the x values to the plot
  svg3.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale3) 
              .tickFormat(i => data[i].name))  
      .attr("font-size", '20px'); 

  svg3.selectAll("circle") 
   .data(data) 
   .enter()  
   .append("rect") 
     .attr("class", "circle") 
     .attr("x", (d,i) => xScale3(i)) 
     .attr("y", (d) => yScale3(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale3.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);

});







