$('.meta').prepend('<div class="info css-truncate-button"><a href="#">▼</a></div>');

$('.info').click(function (event) { 
    var codeDiv = $(this).parent().next(),
        icon = codeDiv.is(':hidden') ? '▼' : '►';
    $(this).find('a').html(icon);
    codeDiv.toggle(); 

    return false;
});
