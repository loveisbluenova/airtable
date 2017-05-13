   
var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyIvQZcMYmjNbtUO' }).base('appw6jRyGYbFN687t');

var deleteArtist = function(record) {
    record.destroy(function(err) {
        if (err) {
            console.log('Error destroying ', recordId, err);
        } else {
            console.log('Destroyed ', record.getId());
            $('div[data-record-id="'+record.getId()+'"]').remove();
        }
    });
};

var loadArtists = function() {
    $('#description').empty();

    base('projects').select({
        sort: [
            {field: 'projectid', direction: 'asc'}
        ]
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('projectid'));

            var $row = $('<tr>');

            $row.append($('<td>').text(record.get('projectid')));
            $row.append($('<td>').text(record.get('managingagency')));
            $row.append($('<td>').text(record.get('description')));
            $row.append($('<td>').text(record.get('commitments')));
            $row.append($('<td>').text(record.get('totalcost')));

            $row.attr('data-record-id', record.getId());

            $('#tblData').append($row);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
    base('agency').select({
         sort: [
            {field: 'magency', direction: 'asc'}
        ],
      
        
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
           

            console.log('Retrieved ', record.get('magency'));

            var $row;
          
            $row = $('<option>').text(record.get('magency'));

            $row.attr('data-record-id', record.getId());

            $('#first-disabled2').append($row);
        });          
               
        $('.selectpicker').each(function () {
          var $selectpicker = $(this);
          $.fn.selectpicker.call($selectpicker, $selectpicker.data());
        });

        fetchNextPage();
            

    }, function done(error) {
        console.log(error);
    });
};


loadArtists();

