$(document).ready(function(){
	paginate();
    btnNext();
    btnPrev();
    limitOnChange();

    btnFind();
    btnAdd();
});


function btnFind(){
	$('#btnFind').on('click', function(){
		var link = $('#link');
		if(link.val().trim() == '' || link.val() == null){
			showWarning('Warning','Link is empty!',function(){
				// do some shit here..s
			})
			return;
		}

		var data = {
			link : link.val()
		};
		post(routes.find, data, function(response){
			console.log(response);
			if(response.success == false){
				showWarning('Warning', response.message ,function(){
					// do some shit here..
				})
				$('#result').hide();
				return;
			}
			link.val('');
			link.focus();
			resultDisplayer(response.data.link,response.data.created_at,response.data.count); 
		});
	});
} 

function btnAdd(){
	$('#btnAdd').on('click', function(){
		var link = $('#link');
		if(link.val().trim() == '' || link.val() == null){
			showWarning('Warning','Link is empty!',function(){
				// do some shit here..s
			})
			return;
		}

		var data = {
			link : link.val()
		};
		post(routes.store, data, function(response){ 
			if(response.success == false){
				showWarning('Warning', response.message ,function(){
					// do some shit here..
				})
				$('#result').hide();
				return;
			}
			link.val('');
			link.focus();
			resultDisplayer(response.data.link,response.data.created_at,response.data.count);
			paginate();
		});
	});
} 

function resultDisplayer(link,date,count){
	$('#r_link').text(link);
	$('#r_link').attr('href',link);
	$('#r_date_and_count').empty();
	$('#r_date_and_count').append(
		'Created  '+ date + "&nbsp;" + 
      	'<cite title="Source Title">'+
      		 '<span class="badge badge-warning p-2">'+count+'x tried the trial!</span> '+
      	'</cite>'
	);

	$('#result').show();
}

//earn pagination================================
var current_page = null;
var prev_page_url = null;
var next_page_url = null;
var current_data = null;

function paginate() {
    var limit = $('#limit').val();
    var search_val = $('#search_val').val();
    var data = {
        search_val: search_val,
        limit: limit
    };

    var url = null;

    if (current_page == null) {
        current_page = 1;

    }
    
    $('.lists').preloader();
    get(routes.lists + "?page=" + current_page, data, function (response) {
        current_page = response.data.current_page;
        console.log(response.data); 
        $('#current_page').html(current_page);
        if (response.data.next_page_url == null) {
            $('#next_page_url').parent().addClass('disabled');
        } else {
            $('#next_page_url').parent().removeClass('disabled');
        }

        if (response.data.prev_page_url == null) {
            $('#prev_page_url').parent().addClass('disabled');
        } else {
            $('#prev_page_url').parent().removeClass('disabled');
        }

        dataDisplayer(response.data.data, response.data.from);
        $('.lists').preloader('remove');
    });
}

function btnNext() {
    $('#next_page_url').on('click', function () {
        current_page++;
        paginate();
    });
}

function btnPrev() {
    $('#prev_page_url').on('click', function () {
        current_page--;
        paginate();
    });
}

function limitOnChange() {
    $('#limit').on('change', function () {
        paginate();
    });
}

function dataDisplayer(data, from) {
    $('#list').empty();

    if (from == null) {
        $('#current_page').html('Nothing to display...');
        return;
    }
    current_data = data;
    $.each(data, function (key, value) {
        var date = moment(value.created_at);
        $('#list').append(
            '<tr data-id="' + from + '">' +
            '<th scope="row">' + from + '</th>' +
            '<td>' + date.format('ll') + '</td>' +
            '<td>' + date.format('LT') + '</td>' +
            '<td><a href="' + value.link + '" target="_blank">' + value.link + '</a></td>' +
            '<th scope="row" class="text-right">' + value.count + '</th>' +
            '</tr>'
        );
        from++;
    });
}
//end of pagination================