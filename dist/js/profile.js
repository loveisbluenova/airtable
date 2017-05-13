   
var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyIvQZcMYmjNbtUO' }).base('appw6jRyGYbFN687t');


var search_string = '';
var flag_for_request = 0;

$('#mysearchbutton').click(function(){


    flag_for_request = 1;
    search_string = $('#myInput').val();
   // alert(search_string);
    
    base('commitments').select({
        
         filterByFormula: 'FIND("' + search_string + '", description) > 0',

    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('description'));

            var $row1 = $('#row');
            //var html ='<div class="col-md-4"><div class="box box-solid"><div class="box-header with-border  text-center"><h3 class="box-title">' + record.get('magencyname') + '</h3></div><div class="box-body" id="tblData"><dl class="dl-horizontal">';
            var html="<dt>Project Name</dt>"+"<dd>" + record.get('description') + "</dd>";
            html += "<dt>Agnecy name</dt>"+"<dd>" + "</dd>";
            html += "<dt>City Cost + Non-City Cost</dt>"+"<dd>" + "$"+ record.get('citycost') + "+" + "$"+record.get('noncitycost') + "</dd>";
            html += "<dt>Total Cost</dt>"+"<dd>" + "$" + record.get('citycost') + "</dd>";
            html += "<dt># of Commitments</dt>"+"<dd>" + record.get('commitments') + "</dd>"+"<br>";

            //html += "</dl></div></div></div></div>"

            $row1.append(html);

            var $row = $('<tr>');

            $row.append($('<td>').text(record.get('description') + ' / ' + record.get('commitmentdescription')));
            $row.append($('<td>').text(record.get('plancommdate')));
            $row.append($('<td>').text('$' + record.get('noncitycost')));
            $row.append($('<td>').text('$' + record.get('citycost')));
            $row.append($('<td>').text(record.get('budgetline')));
            $row.append($('<td>').text(record.get('fmsnumber')));
            $row.append($('<td>').text(record.get('commitmentcode')));
            $row.attr('data-record-id', record.getId());

            $('#tblData').append($row);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });

});





