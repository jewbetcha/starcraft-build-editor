(function($) {
	$(document).ready(function(){
    $('.dropdown-button').dropdown();
    $('select').material_select();

    //Globally define some vars
    var total_supply = 0;
    var supply_cap = 10;
    var collect_rate = 0;
    // Add army units into JSON function as array of arrays
    var units_army = '{ "Marine": { "cost": 50, "costGas": 0, "time": 25, "supply": 1}, "Reaper": { "cost": 50, "costGas": 50, "time": 40, "supply": 1}, "Marauder": { "cost": 100, "costGas": 25, "time": 30, "supply": 2}, "Worker": { "cost": 50, "costGas": 0, "time": 17, "supply": 1} }';
    var army = JSON.parse(units_army);
    var selected = [];

    $('#add-army').click(function() {
       var unit = $('#army-select').val();
        selected.push(army[unit]);

        // Display units and values on add
        $('#unit').append(unit + '</br>');
        $('#mineralCost').append(army[unit].cost + '</br>');
		$('#gasCost').append(army[unit].costGas + '</br>');
        $('#time').append(army[unit].time + '</br>');
        $('#supply').append(army[unit].supply + '</br>');

        // Count up stats

        $.each(selected,function() {
            total_supply += this.supply;
        });
        var total_time = 0;
        $.each(selected,function() {
            total_time += this.time;
        });


        $('#total-supply').text(total_supply + "/" + supply_cap);

        // If game time is +60 seconds, make it in minutes
        if (total_time > 60) {
        	var minRaw = total_time / 60;
        	var minNice = minRaw.toPrecision(3);
        	        	$('#elapsed').text(minNice + " in game minutes");
        }
        else {
        	$('#elapsed').text(total_time + " in game seconds");
        }
        // If user adds a worker, add resource collection time

        if ( unit == "Worker") {

            collect_rate += 35;

            $('#rate').text(collect_rate + " minerals/game minute");
        }

    });

    // Now for structures
    var units_structures = '{ "Supply Depot": { "cost": 100, "costGas": 0, "time": 30, "supply": 0}, "Barracks": { "cost": 150, "costGas": 0, "time": 65, "supply": 0} }';
    var structures = JSON.parse(units_structures);
    var selected_structure = [];


    // Add to build order
    $('#add-structure').click(function() {
       var building = $('#structure-select').val();
        selected_structure.push(structures[building]);

        //display structures on add
        $('#unit').append(building + '</br>');
        $('#mineralCost').append(structures[building].cost + '</br>');
        $('#gasCost').append(structures[building].costGas + '</br>');
        $('#time').append(structures[building].time + '</br>');
        $('#supply').append(structures[building].supply + '</br>');


        // Keep track of supply cap, may or may not work...
        if ( building == "Supply Depot" ) {
            supply_cap += 10;

            console.log(supply_cap);
        }
    });



  });
}(jQuery));