(function($) {
    $(function() {
        $('.file-info').prepend('<a class=\"btn btn-sm btn-collapse\" href=\"#\"><span class=\"octicon octicon-triangle-down\"></span></a>');

        $('.btn-collapse').click(function(event) {
            var codeDiv = $(this).parents('.file-header').siblings('.data');

            var isHidden = codeDiv.is(':hidden');

            var icon = isHidden
                ? '<span class=\"octicon octicon-triangle-down\"></span>'
                : '<span class=\"octicon octicon-triangle-right\"></span>';

            $(this).html(icon);

            codeDiv.toggle();

            return false;
        });

        $('.comment-form-head.tabnav .right').prepend('<a class=\"tabnav-extra btn-shrink\" href=\"#\"><span class=\"octicon octicon-move-left\"></span> Shrink</a>');

        $('.btn-shrink').click(function(event) {
            var isShrinked = $(this).parents('.timeline-comment')
                .toggleClass('shrinked-to-default')
                .hasClass('shrinked-to-default');

            var html = isShrinked
                ? '<span class=\"octicon octicon-move-right\"></span> Expand'
                : '<span class=\"octicon octicon-move-left\"></span> Shrink';

            $(this).html(html);

            return false;
        });
    });
}(window.jQuery));
