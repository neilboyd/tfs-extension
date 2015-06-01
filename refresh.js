$(function () {

    // tell the action page to show
    chrome.runtime.sendMessage({action:'show'});
    
    // add a class to all tasks with a title beginning with RT: (regression test)
    $(".tbTile:has(.witExtra)").each(function() {
        if ($(this).text().indexOf('RT:') === 0) {
            $(this).addClass("testTask");
        }
    });

    // add a class to all tasks with a title beginning with BUG: or DEFECT:
    $(".tbTile:has(.witExtra)").each(function() {
        if ($(this).text().toLowerCase().indexOf('bug:') === 0) {
            $(this).addClass("bugTask");
        }
        if ($(this).text().toLowerCase().indexOf('defect:') === 0) {
            $(this).addClass("bugTask");
        }
    });

    // add a class to all tasks with a title beginning with "Story points"
    $(".tbTile:has(.witExtra)").each(function() {
        if ($(this).text().toLowerCase().indexOf('story points') === 0) {
            $(this).addClass("storyTask");
        }
    });

    // auto refresh when board changes (eg dragging a task)
    var timeout;
    $("#taskboard").bind("DOMSubtreeModified", function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            if ($(".witSaving").length) {
                // console.log("saving...wait");
            } else {
                // refresh page if the option is set
                chrome.storage.sync.get('refresh', function (items) {
                    if( items.refresh ) {
                        location.reload(true);
                    }
                });
            }
        }, 1000);
    });
});