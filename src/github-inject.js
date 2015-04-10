(function($) {
    $(function() {
        $('.file-info').prepend('<a class=\"btn btn-sm tooltipped tooltipped-n btn-collapse\" href=\"#\" aria-label=\"Collapses this file\"><span class=\"octicon octicon-triangle-down\"></span></a>');

        $('.btn-collapse').click(function(event) {
            var codeDiv = $(this).parents('.file-header').next();

            var isHidden = codeDiv.is(':hidden');

            var icon = isHidden
                ? '<span class=\"octicon octicon-triangle-down\"></span>'
                : '<span class=\"octicon octicon-triangle-right\"></span>';

            $(this).html(icon);

            var label = isHidden ? 'Collapses this file' : 'Expands this file'

            $(this).attr('aria-label', label);

            codeDiv.toggle();

            return false;
        });

        $('.comment-form-head.tabnav .right').prepend('<a class=\"tabnav-extra tooltipped tooltipped-n btn-shrink\" href=\"#\" aria-label=\"Shrinks the form to its original size\"><span class=\"octicon octicon-move-left\"></span> Shrink</a>');

        $('.btn-shrink').click(function(event) {
            var isShrinked = $(this).parents('.timeline-comment')
                .toggleClass('shrinked-to-default')
                .hasClass('shrinked-to-default');

            var html = isShrinked
                ? '<span class=\"octicon octicon-move-right\"></span> Expand'
                : '<span class=\"octicon octicon-move-left\"></span> Shrink';

            $(this).html(html);

            var label = isShrinked
                ? 'Expands the form to fit the screen'
                : 'Shrinks the form to its original size'

            $(this).attr('aria-label', label);

            return false;
        });
    });
}(window.jQuery));
