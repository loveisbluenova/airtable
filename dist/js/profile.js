   
var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyIvQZcMYmjNbtUO' }).base('appw6jRyGYbFN687t');


var search_string = '';
var flag_for_request = 0;

$('#mysearchbutton').click(function(){


    flag_for_request = 1;
    search_string = $('#myInput').val();
    alert(search_string);
    $('#tblData').html('');
    base('projects').select({
        
         //filterByFormula: 'FIND("' + search_string + '", projectid) > 0',
         filterByFormula :"OR( RECORD_ID() = 'recXXXXXX', RECORD_ID() = 'recXXXXXX')",
        

    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('description'));

            var $row = $('<tr>');
            $row.append($('<td>').text(record.get('projectid')));
            $row.append($('<td>').text(record.get('managingagency')));
            $row.append($('<td>').text(record.get('description')));
            $row.append($('<td>').text(record.get('commitments')));
            $row.append($('<td>').text('$' + record.get('totalcost')));

            $('#tblData').append($row);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });

});

var loadArtists = function() {
    
    
    if (flag_for_request == 0)
    base('projects').select({


         sort: [
            {field: 'projectid', direction: 'asc'}
        ],
        
      
        
    }).eachPage(function page(records, fetchNextPage) {

         
        records.forEach(function(record) {
            if (flag_for_request == 1)
                return; 

            console.log('Retrieved ', record.get('projectid'));

            var $row = $('<tr>');

            $row.append($('<td>').text(record.get('projectid')));
            $row.append($('<td>').text(record.get('managingagency')));
            $row.append($('<td>').text(record.get('description')));
            $row.append($('<td>').text(record.get('commitments')));
            $row.append($('<td>').text('$' + record.get('totalcost')));

            $row.attr('data-record-id', record.getId());

            $('#tblData').append($row);
        });

        //alert(search_string);
        fetchNextPage();

         


    }, function done(error) {
        console.log(error);
    });
};

loadArtists();

