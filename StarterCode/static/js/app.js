
var subject = 0
d3.selectAll("#selDataset").on("change", updatePlotly);


function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var subject = dropdownMenu.property("value");

        buildBar(subject)
        buildBubble(subject)
        DemoInfo(subject)

}




function buildBar(subject){
  
       

        d3.json("../data/samples.json").then((data) => {
     
                // console.log(data.samples[0])
                  var top_values = data.samples[subject].sample_values.slice(0,10).reverse()
                  var top_ids = data.samples[subject].otu_ids.slice(0,10).reverse()
                  var top_labels = data.samples[subject].otu_labels.slice(0,10).reverse()
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
        title: "Top Ten OTU",
        xaxis: { title: "Values" },
        yaxis: { title: "OTU ID" },
        
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data, layout);
});
}

buildBar(subject)

function buildBubble(subject){
        d3.json("../data/samples.json").then((data) => {
     
                
                  var sample_values = data.samples[subject].sample_values
                  var otu_ids = data.samples[subject].otu_ids
                  var otu_labels = data.samples[subject].otu_labels
                  


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
        title: '',
        showlegend: false,
        height: 600,
        width: 1000,
        
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bubble", data, layout);
});

}

buildBubble(subject)


function DemoInfo(subject){
        d3.json("../data/samples.json").then((data) => {
                
                var age = data.metadata[subject].age
                var bbtype = data.metadata[subject].bbtype
                var ethnicity = data.metadata[subject].ethnicity
                var gender = data.metadata[subject].gender
                var id = data.metadata[subject].id
                var location = data.metadata[subject].location
                var wfreq = data.metadata[subject].wfreq
                
                var area = d3.select("#sample-metadata");
                area.selectAll('tr').remove()

                for (const [key, value] of Object.entries(data.metadata[subject])) {
                        // console.log(`${key}: ${value}`);
                        area.append("tr").append('td').text(`${key}: ${value}`);
                      }
        });
}
DemoInfo(subject)


function DropDown(){
        d3.json("../data/samples.json").then((data) => {
                // console.log(data.names)
                var selection_box = d3.select("#selDataset");
                
                for (const [key, value] of Object.entries(data.names)) {
                        // console.log(`${key}: ${value}`);
                        selection_box.append('option').text(`${value}`).property('value', key)
                      
                      }
                
        });
}

DropDown()