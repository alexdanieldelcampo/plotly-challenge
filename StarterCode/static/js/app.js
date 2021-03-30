// d3.selectAll("#selDataset").on("change", updatePlotly);

d3.json("../data/samples.json").then((data) => {
     
      console.log(data.samples[0])
        var top_values = data.samples[0].sample_values.slice(0,10)
        var top_ids = data.samples[0].otu_ids.slice(0,10)
        var top_labels = data.samples[0].otu_labels.slice(0,10)
        // console.log(top_values)
      

});




function buildBar(){
  
       

        d3.json("../data/samples.json").then((data) => {
     
                console.log(data.samples[0])
                  var top_values = data.samples[0].sample_values.slice(0,10).reverse()
                  var top_ids = data.samples[0].otu_ids.slice(0,10).reverse()
                  var top_labels = data.samples[0].otu_labels.slice(0,10).reverse()
                  var OTU_id = top_ids.map(d => "OTU " + d)


        // Create the Trace
        var trace1 = {
        x: top_values,
        y: OTU_id,
        text: top_labels,
        type: "bar",
        orientation: 'h'
        };

        // Create the data array for the plot
        var data = [trace1];

        // Define the plot layout
        var layout = {
        title: "Eye Color vs Flicker",
        xaxis: { title: "Values" },
        yaxis: { title: "OTU ID" },
        
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data, layout);
});
}

buildBar()

function buildBubble(){
        d3.json("../data/samples.json").then((data) => {
     
                
                  var sample_values = data.samples[0].sample_values
                  var otu_ids = data.samples[0].otu_ids
                  var otu_labels = data.samples[0].otu_labels
                  


        // Create the Trace
        var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
                color: otu_ids,
                size: sample_values
        },
        text: otu_labels,
        };

        // Create the data array for the plot
        var data = [trace1];

        // Define the plot layout
        var layout = {
        title: 'Marker Size and Color',
        showlegend: false,
        height: 600,
        width: 1000,
        
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bubble", data, layout);
});

}

buildBubble()


function DemoInfo(){
        d3.json("../data/samples.json").then((data) => {
                
                var age = data.metadata[0].age
                var bbtype = data.metadata[0].bbtype
                var ethnicity = data.metadata[0].ethnicity
                var gender = data.metadata[0].gender
                var id = data.metadata[0].id
                var location = data.metadata[0].location
                var wfreq = data.metadata[0].wfreq
                
                var area = d3.select("#sample-metadata");
             ;

                for (const [key, value] of Object.entries(data.metadata[0])) {
                        // console.log(`${key}: ${value}`);
                        area.append("tr").append('td').text(`${key}: ${value}`);
                      }
        });
}
DemoInfo()


function DropDown(){
        d3.json("../data/samples.json").then((data) => {
                console.log(data.names)
                var selection_box = d3.select("#selDataset");
                for (const [key, value] of Object.entries(data.names)) {
                        console.log(`${key}: ${value}`);
                        selection_box.append('option').text(`${value}`).property('value', key)
                      
                      }
                
        });
}

DropDown()