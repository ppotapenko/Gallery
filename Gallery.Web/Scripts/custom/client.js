var REKOD = {
    Utils: {
        isEmptyOrSpaces: function (s) {
            if (s == null) return true;
            return s.replace(/\s/g, '').length < 1;
        },

        processError: function(message) {
            $('#dlg-error .message-offset').html(message);
            $.UIkit.modal("#dlg-error").show();
        },

        processConfirm: function(message, url, target) {
            $('#act_confirm_ok').off('click').on('click', function() {
                $.UIkit.modal("#dlg-confirm").hide();
                if (typeof url == 'function') {
                    url.call();
                } else {
                    target = (typeof target !== 'undefined' ? target : '');
                    if (target != '') {
                        window.open(url, target);
                    } else {
                        location.href = url;
                    }
                }
                return false;
            });

            $('#dlg-confirm .message-offset').html(message);
            $.UIkit.modal("#dlg-confirm").show();
        },

        processMessage: function(message, url, target) {
            $('#act_message_ok').off('click').on('click', function() {
                $.UIkit.modal("#dlg-message").hide();
                if (typeof url == 'function') {
                    url.call();
                } else {
                    target = (typeof target !== 'undefined' ? target : '');
                    if (target != '') {
                        window.open(url, target);
                    } else {
                        if (url !== undefined) {
                            location.href = url;
                        }
                    }
                }
                return false;
            });

            $('#dlg-message .message-offset').html(message);
            $.UIkit.modal("#dlg-message").show();
        },

        registerDatepicker: function(controlId) {
            $(function() {
                $.UIkit.datepicker('#' + controlId, { format: 'DD.MM.YYYY' });
            });
        },

        registerAutocomplete: function(controlId, url, minTypingLength, delayTime) {
            $(function() {
                $.UIkit.autocomplete('#' + controlId, { method: 'get', source: url, minLength: minTypingLength, delay: delayTime });
            });
        }
    },
    Client: {
        Order: {
            Direction: 'Descending',
            Column: 'Name'
        },
        PageNamespace: '',
        init: function (contentType) {
            switch (contentType) {
                case 'IMAGES':
                this.PageNamespace = REKOD.Client.Servers;
                break;
            default:
                REKOD.Utils.processError('Ошибка инициализации страницы');
            }
        },
        Servers: {
            FilterState: {
                Description: '',
            },
            applyFilter: function () {
                debugger;
                this.FilterState.Description = $('#State_Description').val();

                REKOD.Client.LazyLoadingContent.getRecords(true);
            },
            clearFilter: function () {
                debugger ;
                $('#filter .uk-form-controls').each(function() {
                    $(this).children().val('');
                });
                for (var index in this.FilterState) {
                    this.FilterState[index] = '';
                }
                $('.tag-continer').hide();
                REKOD.Client.LazyLoadingContent.getRecords(true);
            },
        },
        registerSortingBehavior: function() {
            $(function() {
                $('.sort a').live('click', function() {
                    $('.sort li').removeClass('selected');
                    $(this).parent().addClass('selected');
                    $('#sort_type').html($(this).parent().prevAll('.uk-nav-header:first').text())
                        .append($('<sup />').text('(' + $.trim($(this).text()) + ')'));
                    REKOD.Client.Order.Direction = $(this).data('direction');
                    REKOD.Client.Order.Column = $(this).data('column');
                    REKOD.Client.LazyLoadingContent.getRecords(true);
                });
            });
        },
        registerFilterUIBehavior: function() {
            $(function() {
                $('#filter-button').live('click', function() {
                    $(this).toggleClass('filter_active uk-button-success');
                    $('#filter').toggle();
                    REKOD.Client.renderFiltersCount();
                });
            });
        },
        renderFiltersCount: function() {
            if (!$('#filter').is(':visible')) {
                var count = 0;
                var filterState = REKOD.Client.PageNamespace.FilterState;
                for (var index in filterState) {
                    if (filterState[index] != '') {
                        count++;
                    }
                }
                if (count > 0) {
                    var filtersCount = $('<span />').addClass('filter-label uk-badge-danger').text(count);
                    $('#filter-button').html(filtersCount);
                } else {
                    $('#filter-button').empty();
                }
            } else {
                $('#filter-button').empty();
            }
        },
        LazyLoadingContent: {
            pageNumb: 1,
            hasNext: true,
            url: '',
            container: '',
            init: function (url, container) {
                this.url = url;
                this.container = container;
                $(function() {
                    $(window).scroll(function() {
                        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                            REKOD.Client.LazyLoadingContent.getRecords();
                        }
                    });
                });
            },
            getRecords: function(reset) {
                if (reset) {
                    this.hasNext = true;
                    this.pageNumb = 1;
                } else {
                    this.pageNumb++;
                }
                if (this.hasNext) {
                    $("#throbber").show();
                    this.hasNext = false;
                    $.ajax({
                        type: 'post',
                        url: this.url,
                        dataType: "json",
                        traditional: true,
                        async: false,
                        cache: false,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            State: REKOD.Client.PageNamespace.FilterState,
                            Page: this.pageNumb,
                            Direction: REKOD.Client.Order.Direction,
                            Column: REKOD.Client.Order.Column
                        }),
                        success: function(response) {
                            if (response.code == 0) {
                                var lazyLoading = REKOD.Client.LazyLoadingContent;
                                var data = response.message;
                                debugger;
                                reset ? $(lazyLoading.container).html(data.html) : $(lazyLoading.container).append(data.html);
                                lazyLoading.hasNext = data.hasNext;
                            } else {
                                alert(response.message);
                                REKOD.Utils.processError(response.message);
                            }
                        },
                        error: function(response) {
                            REKOD.Utils.processError(response.d);
                        },
                        complete: function() {
                            $("#throbber").hide();
                        }
                    });
                }
            }
        }
    }
};


$(function () {
    $('.wms-description-brief a.internal-link').live('click', function (event) {
        event.preventDefault();
        $(this).parent().addClass('wms-description-expanded').removeClass('wms-description-brief uk-text-justify');
    });
    $('.wms-description-expanded a.internal-link').live('click', function (event) {
        event.preventDefault();
        $(this).parent().addClass('wms-description-brief uk-text-justify').removeClass('wms-description-expanded');
    });
});
