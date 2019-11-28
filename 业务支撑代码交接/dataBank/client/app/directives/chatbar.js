//Chat Toggle Link
angular.module('app')
    .directive('chatLink', function () {
        return {
            restrict: 'AC',
            template: '<i class="icon glyphicon glyphicon-comment"></i>',
            link: function (scope, el, attr) {
                el.on('click', function () {
                    $('.page-chatbar').toggleClass('open');
                    el.toggleClass('wave').toggleClass('in');
                    el.parent().toggleClass('open');
                });
            }
        };
    });
angular.module('app')
    .directive('pageChatbar', ['$cookies', function ($cookies) {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                var position = ($cookies.rtlSupport || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
                $('.chatbar-messages .messages-list').slimscroll({
                    position: position,
                    size: '4px',
                    color: scope.settings.color.themeprimary,
                    height: $(window).height() - 250,
                });
                $('.chatbar-contacts .contacts-list').slimscroll({
                    position: position,
                    size: '4px',
                    color: scope.settings.color.themeprimary,
                    height: $(window).height() - 86,
                });
                el.on('click', '.chatbar-contacts .contact', function () {
                    el.find('.chatbar-contacts').hide();
                    el.find('.chatbar-messages').show();
                });

                el.on('click', '.chatbar-messages .back', function () {
                    el.find('.chatbar-messages').hide();
                    el.find('.chatbar-contacts').show();
                });
            }
        };
    }]);