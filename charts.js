function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleData = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var chartArray = sampleData.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var firstArraySample = chartArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = firstArraySample.otu_ids;
    var otu_labels = firstArraySample.otu_labels;
    var sample_values = firstArraySample.sample_values;


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0,10).map(OTU => "OTU " + OTU).reverse();

    // 8. Create the trace for the bar chart. 
    var trace = {
      type: "bar",
      text: otu_labels.slice(0,10).reverse(),
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      orientation: 'h'
    };
    
    var barData = [trace];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "<b>Top 10 Bateria Cultures Found</b>",
      width: 500,
      height: 500,
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar',barData,barLayout);    


// Deliverable 2
// Bar and Bubble charts
// Create the buildCharts function.
// function buildCharts(sample) {
 // Use d3.json to load and retrieve the samples.json file 
  // d3.json("samples.json").then((data) => {

//     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    var trace2 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      hovertext: otu_labels,
      marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: "Portland"
      }
    };
    
    var bubbleData = [trace2];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "<b>Bacteria Cultures Per Sample</b>",
      margin: {t:0},
      xaxis:{title: "OTU ID"},
      hovermode: 'closest',
      margin: {t:30}
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);


// Deliverable 3
// Create the buildChart function.
// function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  // d3.json("samples.json").then((data) => {
    // console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;

    // Create a variable that holds the first sample in the array.
    metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaresults = metadataArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
    var washing_frequency = metaresults.wfreq;

    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot('bar',barData,barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
   
    
    // 4. Create the trace for the gauge chart.
    var trace3 = {
      domain: {
        x: [0, 1],
        y: [0, 1]
      },
      value: washing_frequency,
      type: "indicator",
      mode: "gauge+number",
      title: {text: "<b>Belly Button Washing Frequency</b> <br># of Scrubs per Week"},
      gauge: {
        axis: {
          range: [0, 10],
          tickwidth: 2,
          tickcolor: "black"
        },
        bar: {
          color: "black"
        },
        steps: [
          {range: [0, 2], color: "firebrick"},
          {range: [2, 4], color: "darkorange"},
          {range: [4, 6], color: "greenyellow"},
          {range: [6, 8], color: "lightgreen"},
          {range: [8, 10], color: "dodgerblue"},
        ],
        threshold: {
          value: washing_frequency,
        }
      }
    }
    
    var gaugeData = [trace3];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600,
      height: 500,
      margin: {
        t: 0,
        b: 0,
      },
      font: {
        color: "black"
      }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
