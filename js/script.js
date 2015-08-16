$("#create-book-button").click(function(evt){
	var book = {};

	book.name = $("#name").val();
	book.author = $("#author").val();
	book.year = $("#year").val()
	if(!(book.name && book.author && book.year))
		return alert("Please fill the details");

	bookList.push(book);
	addNewRecordToTable(book);

	$("#name").val("");
	$("#author").val("");
	$("#year").val("");
});

function addNewRecordToTable(book){
	var formBody = $("#books-table").find("tbody");
	var rowCount = formBody.find("tr").length;
	var newRecord = '<tr><th class="row" scope="row">'+(rowCount+1)+'</th>' +
		'<td class="book-name">'+book.name+'</td>' +
		'<td class="book-author">'+book.author+'</td>' +
		'<td class="actions">' +
			'<button class="btn btn-default edit-element"><span class="fa fa-edit"></span></button>' +
			'<button class="btn btn-danger remove-element"><span class="fa fa-trash"></span></button>' +
			'<button class="btn btn-info mark-element"><span class="fa fa-bookmark"></span></button>' +
			'<button class="btn btn-info view-element"><span class="fa fa-user-plus"></span></button>' +
			'<div class="book-year">'+book.year+'</div>'+
		'</td></tr>';
	formBody.append(newRecord);

	addRemoveEventListener();
	addMarkEventListener();
	addViewEventListener();
	addEditEventListener();
}

function recalculateRowIds(){
	var records = $("#books-table").find("tbody").find('tr');
	for(var i = 0 ; i< records.length; i++) {
		$(records[i]).find('.row').text(i+1);
	}
}

function editEventListener(evt){
	var record = $(this).closest('tr');
	$("#name").val(record.find('.book-name').text());
	$("#author").val(record.find('.book-author').text());
	$("#year").val(record.find('.book-year').text());
	record.remove();
	recalculateRowIds()
}

function addEditEventListener(){
	var editElements = $('button.edit-element');
	editElements.unbind('click', editEventListener);
	editElements.click(editEventListener);
}

function markEventListener(evt){
	var button = $(this);

	if(button.hasClass("btn-info")) {
		button.removeClass("btn-info")
		button.addClass("btn-danger");
		button.find('span').removeClass('fa-bookmark').addClass('fa-bookmark-o')
		button.closest("tr").addClass("info");
	} else {
		button.removeClass("btn-danger");
		button.addClass("btn-info");
		button.find('span').removeClass('fa-bookmark-o').addClass('fa-bookmark')
		button.closest("tr").removeClass("info")
	}
}

var addMarkEventListener = function(){
	var markElements = $('button.mark-element');
	markElements.unbind('click', markEventListener);
	markElements.click(markEventListener);
};

function addViewEventListener(){
	var viewElements = $('button.view-element');
	viewElements.unbind('click', viewEventListener);
	viewElements.click(viewEventListener)
}

function viewEventListener(evt){
	var button = $(this);
	var actionsElement = button.closest('.actions')
	if(actionsElement.hasClass("viewing")){
		actionsElement.removeClass("viewing")
	}else{
		actionsElement.addClass('viewing')
	}

}

function removeEventLister(evt){
	$(this).closest("tr").remove();
	recalculateRowIds();
}

function addRemoveEventListener(){
	var removeElements = $('button.remove-element');
	removeElements.unbind("click", removeEventLister);
	removeElements.click(removeEventLister);
}

bookList = [
	{
		name:"JQuery",
		author:"Author One",
		year: 2005
	},{
		name:"NodeJS",
		author:"Author Two",
		year: 2009
	}
];

for(var i = 0; i < bookList.length; i++){
	addNewRecordToTable(bookList[i]);
}


