(function($) {
	$(document).ready(function(){
    $('.dropdown-button').dropdown();
    $('select').material_select();

    // Add army units into JSON function as array of arrays
    var units_army = '{ "Marine": { "cost": 50, "costGas": 0, "time": 25, "supply": 1}, "Reaper": { "cost": 50, "costGas": 50, "time": 40, "supply": 1}, "Marauder": { "cost": 100, "costGas": 25, "time": 30, "supply": 2}, "Worker": { "cost": 50, "costGas": 0, "time": 17, "supply": 1} }';
    var army = JSON.parse(units_army);
    var selected = [];

    $('#add-army').click(function() {
       var unit = $('#army-select').val();
        selected.push(army[unit]);

        // Display units and values on add
        $('#unit').append('<div class="wow fadeIn">' + unit + '</br>');
        $('#mineralCost').append(army[unit].cost + '</br>');
		$('#gasCost').append(army[unit].costGas + '</br>');
        $('#time').append(army[unit].time + '</br>');
        $('#supply').append(army[unit].supply + '</div></br>');

        // Count up stats
        var total_supply = 0;
        $.each(selected,function() {
            total_supply += this.supply;
        });
        var total_time = 0;
        $.each(selected,function() {
            total_time += this.time;
        });

        // if (unit = "Supply Depo"){
        //     var supply_cap = 10;
        //     $.each(selected,function() {
        //         supply += this.supply;
        //     });
        // }

        $('#total-supply').text(total_supply + "/" );

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
        var collect_rate = 0;
        if (unit = "Worker") {

            collect_rate += 35;

            $('#rate').text(collect_rate + " minerals/game minute");
        }

    });



  });
}(jQuery));