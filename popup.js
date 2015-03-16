$(function () {

    chrome.storage.sync.get('refresh', function (items) {
        $("#refresh").prop( "checked", items.refresh );
    });
    
    $("#refresh").change(function() {
        console.log('boom');
        chrome.storage.sync.set({'refresh': $(this).is(":checked")});
    });    

});
