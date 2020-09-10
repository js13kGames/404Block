$("#block").draggable({
    containment: "parent"
});

$("#startGame").button().click(function () {
    $("#startGame").css('display', 'none');
    $("#block").css('display', 'block');
    $("#playground").css('display', 'block');
});

