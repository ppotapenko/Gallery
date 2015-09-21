var REKOD = {
    activeController: 'home',
    activeAction: 'index',
    activeParam: '',
    siteUrl: '',
    isFormModify: false,
    isPageBlocked: false,
    Validate: {
        integer: function(value) {
            var r = new RegExp('^\\d{1,9}$');
            return r.test(value);
        },
        decimal: function(value, precision, scale) {
            var r = new RegExp('^\\d{1,' + (precision - scale) + '}(\\.\\d{1,' + scale + '})?$');
            return r.test(value);
        },
        email: function(value) {
            var r = new RegExp('^[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$');
            return r.test(value);
        },
        image: function(filename) {
            var re = /\..+$/;
            var ext = filename.match(re);
            if (ext != null && ext.length > 0) {
                ext = ext[ext.length - 1];
                if (typeof ext !== 'undefined' && ext != null) {
                    ext = ext.toLowerCase();
                    if (ext == ".jpg") return true;
                    if (ext == ".jpeg") return true;
                    if (ext == ".png") return true;
                    if (ext == ".gif") return true;
                }
            }
            return false;
        },
        time: function(value) {
            var r = new RegExp('^([0-9]?[0-9]):([0-5][0-9]):([0-5][0-9])');
            return r.test(value);
        },
        diff_time: function(value) {
            var r = new RegExp('^([0-9]{1,2})(:[0-5]\\d)$');
            return r.test(value);
        },
        date: function(value) {
            var r = new RegExp('^(0[1-9]|(1|2)[0-9]|3[0-1]){1}.(0[1-9]{1}|1[0-2]{1}){1}.(19[0-9]{2}|2[0-9]{3})$');
            return r.test(value);
        },
        password: function(value) {
            var r = new RegExp("^(?=.{6,})", "g");
            return r.test(value);
        },
        url: function (url) {
            var urlRegExp = /^[a-z](?:[-a-z0-9\+\.])*:(?:\/\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\xA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:])*@)?(?:\[(?:(?:(?:[0-9a-f]{1,4}:){6}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|::(?:[0-9a-f]{1,4}:){5}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4}:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|v[0-9a-f]+[-a-z0-9\._~!\$&'\(\)\*\+,;=:]+)\]|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}|(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\xA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=@])*)(?::[0-9]*)?(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\xA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@]))*)*|\/(?:(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\xA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\xA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@]))*)*)?|(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\xA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\xA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@]))*)*|(?!(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\xA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@])))(?:\?(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\xA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@])|[\uE000-\uF8FF\uF0000-\uFFFFD|\u100000-\u10FFFD\/\?])*)?(?:\#(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\xA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@])|[\/\?])*)?$/i;
            return urlRegExp.test(url);
        }
    },
    Utils: {
        init: function(activeController, activeAction, activeParam, siteUrl) {
            REKOD.activeController = activeController;
            REKOD.activeAction = activeAction;
            REKOD.activeParam = activeParam;
            REKOD.siteUrl = siteUrl;
            $(function() {
                $('.icon-pencil').tooltip({
                    placement: 'top'
                });
                $('.icon-trash').tooltip({
                    placement: 'top'
                });
                $('.icon-ok').tooltip({
                    placement: 'top'
                });
                $('.icon-search').tooltip({
                    placement: 'top'
                });
                $('.icon-chevron-up').tooltip({
                    placement: 'left',
                    title: function() {
                        return ($(this).hasClass('icon-chevron-up') ? REKOD.Constants.collapse : REKOD.Constants.expand);
                    }
                });
                $('.icon-chevron-down').tooltip({
                    placement: 'left',
                    title: function() {
                        return ($(this).hasClass('icon-chevron-down') ? REKOD.Constants.expand : REKOD.Constants.collapse);
                    }
                });
                $('.fa').tooltip({ placement: 'top' });
            });
        },
        
        registerTypeahead: function(ctrlValueId, ctrlTextId, isContains, url) {
            $(function() {
                var labels = [];
                var mapped = {};
                $('#' + ctrlTextId).typeahead({
                    source: function(query, process) {
                        $.ajax({
                            url: (typeof url == 'function' ? url.call() : url),
                            dataType: 'json',
                            data: {
                                contains: (isContains ? 1 : 0),
                                query: query
                            },
                            success: function(data) {
                                labels = [];
                                mapped = {};

                                if (data.code == 0) {
                                    data = data.message;
                                    $.each(data, function(i, item) {
                                        mapped[item.name] = item.id;
                                        labels.push(item.name);
                                    });
                                } else {
                                    REKOD.Utils.processError(data.message);
                                }

                                process(labels);
                            }
                        });
                    },
                    updater: function(item) {
                        $('#' + ctrlValueId).val(mapped[item]);
                        return item;
                    }
                });

                $('#' + ctrlTextId).on('change', function() {
                    $('#' + ctrlValueId).val(mapped[$(this).val()]);
                    $('#' + ctrlValueId).trigger('change');
                });
            });
        },

        registerTypeaheadText: function(ctrlTextId, isContains, url) {
            $(function() {
                var labels = [];
                $('#' + ctrlTextId).typeahead({
                    source: function(query, process) {
                        $.ajax({
                            url: (typeof url == 'function' ? url.call() : url),
                            dataType: 'json',
                            data: {
                                contains: (isContains ? 1 : 0),
                                query: query
                            },
                            success: function(data) {
                                labels = [];

                                if (data.code == 0) {
                                    data = data.message;
                                    $.each(data, function(i, item) {
                                        labels.push(item.name);
                                    });
                                } else {
                                    REKOD.Utils.processError(data.message);
                                }
                                process(labels);
                            }
                        });
                    }
                });
            });
        },

        registerMultipleSelect: function(ctrlId, isContains, url) {
            $(function() {
                $('#' + ctrlId).chosen({
                    search_contains: isContains,
                    ajax_url: url
                });
            });
        },

        registerFilterExpandCollapse: function(ctrlId, isIgnorePath) {
            isIgnorePath = (typeof isIgnorePath !== 'undefined' ? isIgnorePath : false);
            $(function() {
                $('#' + ctrlId).on('click', function() {
                    var caption = $(this).find('i');
                    caption.toggleClass('icon-chevron-down icon-chevron-up');
                    $.cookie((isIgnorePath ? ctrlId : REKOD.activeController + REKOD.activeAction + '_filter_state'),
                             (caption.hasClass('icon-chevron-up') ? 1 : 0),
                             { expires: 365,
                               path: '/',
                               name: '_filter-cookie'
                             });
                });
            });
        },

        registerTextareaLimit: function() {
            $(function() {
                $('.limited').each(function() {
                    var ctrl = $(this);
                    if (ctrl.is('textarea')) {
                        var ctrlCountId = 'limit_' + $(this).attr('id');
                        ctrl.parent().append('<br />Осталось символов: <span id="' + ctrlCountId + '"></span>');
                        ctrl.on('keyup', function() {
                            $('#' + ctrlCountId).html(function() {
                                var limit = ctrl.attr('class').match(/limit_[\d]+/);
                                var total = limit[0].split('_')[1];
                                var left = total - ctrl.val().length;
                                if (left < 0) {
                                    ctrl.val(ctrl.val().substr(0, total));
                                    left = 0;
                                }
                                return left;
                            });
                        });
                        ctrl.trigger('keyup');
                    }
                });
            });
        },

        registerTextareaLimitEx: function ($where) {
            $(function () {
                $where.find(".limited").each(function () {
                    var ctrl = $(this);
                    if (ctrl.is('textarea')) {
                        var ctrlCountId = 'limit_' + $(this).attr('id');
                        ctrl.parent().append('<br />Осталось символов: <span id="' + ctrlCountId + '"></span>');
                        ctrl.on('keyup', function () {
                            $('#' + ctrlCountId).html(function () {
                                var limit = ctrl.attr('class').match(/limit_[\d]+/);
                                var total = limit[0].split('_')[1];
                                var left = total - ctrl.val().length;
                                if (left < 0) {
                                    ctrl.val(ctrl.val().substr(0, total));
                                    left = 0;
                                }
                                return left;
                            });
                        });
                        ctrl.trigger('keyup');
                    }
                });
            });
        },

        registerTimepicker: function(ctrlId, restoreTimeId) {
            $(function() {
                $('#' + ctrlId).timepicker({
                    defaultTime: 'value',
                    showSeconds: true,
                    showInputs: false,
                    showMeridian: false,
                    restoreTime: '#' + restoreTimeId
                });
            });
        },

        registerDatepicker: function(ctrlId, endDate, startDate) {
            $(function() {
                $('#' + ctrlId).datepicker({
                    autoclose: true,
                    format: 'dd.mm.yyyy',
                    endDate: endDate,
                    startDate: startDate,
                    weekStart: 1,
                    language: 'ru'
                });
                $('#' + ctrlId).next('span.add-on').on('click', function() {
                    $('#' + ctrlId).datepicker('show');
                });
            });
        },

        registerFormValidation: function (ctrlId, container) {
            $(function() {
                container = (typeof container !== 'undefined' ? container : 'form');

                $(container + ' .control-group.required').each(function () {
                    REKOD.Private.addRequiredValidation($(this));
                });

                $(container + ' .control-group.integer').each(function () {
                    REKOD.Private.addIntegerValidation($(this));
                });

                $(container + ' .control-group.decimal').each(function () {
                    REKOD.Private.addDecimalValidation($(this));
                });

                $(container + ' .control-group.email').each(function () {
                    REKOD.Private.addEmailValidation($(this));
                });

                $(container + ' .control-group.password').each(function () {
                    REKOD.Private.addPasswordValidation($(this));
                });

                $(container + ' .control-group.time').each(function () {
                    REKOD.Private.addTimeValidation($(this));
                });

                $(container + ' .control-group.diff_time').each(function () {
                    REKOD.Private.addDiffTimeValidation($(this));
                });

                $(container + ' .control-group.date').each(function () {
                    REKOD.Private.addDateValidation($(this));
                });

                $(container + ' .control-group.image').each(function () {
                    REKOD.Private.addImageValidation($(this));
                });

                $(container + ' .control-group.url').each(function () {
                    REKOD.Private.addUrlValidation($(this));
                });

                $(container + ' .control-group.complex').each(function () {
                    REKOD.Private.addComplexValidation($(this));
                });

                $('#' + ctrlId).off('click').on('click', function () {
                    $.each($(container).find('.nav-tabs a'), function(i, tabLink) {
                        $(tabLink).css('color', '#0088cc'); 
                    });

                    var errorGroup = null;
                    $(container + ' .control-group.required, ' +
                        container + ' .control-group.integer, ' +
                        container + ' .control-group.decimal, ' +
                        container + ' .control-group.email, ' +
                        container + ' .control-group.image, ' +
                        container + ' .control-group.password, ' +
                        container + ' .control-group.time,' +
                        container + ' .control-group.diff_time,' +
                        container + ' .control-group.date,' +
                        container + ' .control-group.url,' +
                        container + ' .control-group.complex').each(function() {
                            REKOD.Utils.validate($(this).data('control'));
                            if ($(this).hasClass('error') && errorGroup == null) {
                                errorGroup = $(this);
                            }
                        });
                    if (errorGroup) {
                        var tabId = errorGroup.parents('.tab-pane').attr('id');
                        if (tabId) {
                            var tab = $('ul.nav-tabs li a[href=#' + tabId + ']');
                            tab.tab('show');
                            tab.css('color', 'red');
                        }
                        $(window).scrollTop($('.control-group.error').first().offset().top - 100);
                    }
                    return ($(container + ' .control-group.error').length == 0);
                });
            });
        },

        clearError: function(ctrlId) {
            var group = $('.control-group[data-control=' + ctrlId + ']');
            REKOD.Private.clearError(group);
        },

        clearErrors: function(container) {
            container = (typeof container !== 'undefined' ? container : 'form');
            $(container + ' .control-group').each(function() {
                REKOD.Private.clearError($(this));
            });
        },

        hasErrors: function(container) {
            container = (typeof container !== 'undefined' ? container : 'form');
            return ($(container + ' .control-group.error').length != 0);
        },

        clearControls: function(container) {
            container = (typeof container !== 'undefined' ? container : 'form');
            $(container).find('input,select,textarea').each(function() {
                $(this).val('');
            });
        },

        clearRequired: function(ctrlId) {
            var group = $('.control-group[data-control=' + ctrlId + ']');
            group.removeClass('required');
            REKOD.Private.clearRequiredValidation(group);
            REKOD.Private.clearError(group);
        },

        addRequired: function(ctrlId) {
            var group = $('.control-group[data-control=' + ctrlId + ']');
            group.addClass('required');
            REKOD.Private.addRequiredValidation(group);
        },

        controlHide: function(ctrlId) {
            $('.control-group[data-control=' + ctrlId + ']').hide();
        },

        controlShow: function(ctrlId) {
            $('.control-group[data-control=' + ctrlId + ']').show();
        },

        validate: function(control) {
            if(control.charAt(0) != '.') {
                control = '#' + control;
            }
            
            $(control).trigger('change.validation');
        },

        isId: function(value) {
            return /^[0-9]+$/.test(value);
        },

        processError: function(message) {
            var oldFocus = jQuery().modal.Constructor.prototype.enforceFocus;
            jQuery().modal.Constructor.prototype.enforceFocus = function(){};

            $('#dlg-error .message-offset').html(message);
            $('#dlg-error').modal('show');

            jQuery().modal.Constructor.prototype.enforceFocus = oldFocus;
        },

        processConfirm: function(message, url, target) {
            $('#act_confirm_ok').off('click').on('click', function() {
                $('#dlg-confirm').modal('hide');
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
            $('#dlg-confirm').modal('show');
        },

        processConfirmEx: function (message, cancelCallback, url) {
            $('#act_confirm_ok').off('click').on('click', function () {
                $('#dlg-confirm').modal('hide');
                if (typeof url == 'function') {
                    url.call();
                } else {
                        location.href = url;
                }
                return false;
            });

            $('#act_confirm_cancel').off('click').on('click', function () {
                $('#dlg-confirm').modal('hide');
                cancelCallback.call();
                return false;
            });


            $('#dlg-confirm .message-offset').html(message);
            $('#dlg-confirm').modal('show');
        },

        processMessage: function(message, url, target) {
            $('#act_message_ok').off('click').on('click', function() {
                $('#dlg-message').modal('hide');
                if (typeof url == 'function') {
                    url.call();
                }
                else {
                    target = (typeof target !== 'undefined' ? target : '');
                    if (target != '') {
                        window.open(url, target);
                    } else {
                        if(url !== undefined) {
                            location.href = url;
                        }                        
                    }
                }
                return false;
            });

            $('#dlg-message .message-offset').html(message);
            $('#dlg-message').modal('show');
        },

        bindTable: function(containerId, templateId, data) {
            $('#' + containerId).html('');
            if (data.message.length > 0) {
                $('#' + templateId).tmpl(data).appendTo('#' + containerId);
                $('#' + containerId + ' .icon-pencil').tooltip({
                    placement: 'top'
                });
                $('#' + containerId + ' .icon-trash').tooltip({
                    placement: 'top'
                });
            }
        },

        bindDropDown: function(ctrlId, data) {
            $('#' + ctrlId).find('option').remove();
            if (data != null) {
                $.each(data.message, function(i, item) {
                    $('#' + ctrlId).append($('<option></option>').attr('value', item.id).text(item.name));
                });
            }
            $('#' + ctrlId).val('');
        },

        clearDropDown: function(ctrlId) {
            REKOD.Utils.bindDropDown(ctrlId, null);
        },

        bindMessage: function(template, options) {
            return $('<div />').append($.tmpl(template, options)).html();
        },

        areYouSure: function (url, confirmMessage) {
            confirmMessage = (typeof confirmMessage !== 'undefined' ? confirmMessage : REKOD.Constants.confirmMessage);
            REKOD.Utils.processConfirm(confirmMessage, url);
            return false;
        },
        
        areYouSureEx: function (url, cancelCallback, confirmMessage) {
            confirmMessage = (typeof confirmMessage !== 'undefined' ? confirmMessage : REKOD.Constants.confirmMessage);
            REKOD.Utils.processConfirmEx(confirmMessage, cancelCallback, url);
            return false;
        },

        showMessage: function(message) {
            REKOD.Utils.processMessage(message);
            return false;
        },

        addCommas: function(value) {
            value += '';
            var x = value.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ' ' + '$2');
            }
            return x1 + x2;
        },

        formatNumber: function(value, decimals) {
            decimals = (typeof decimals !== 'undefined' ? decimals : 2);
            return REKOD.Utils.addCommas((isNaN(value) ? 0 : value).toFixed(decimals));
        },

        toFixed: function(value, decimals) {
            decimals = (typeof decimals !== 'undefined' ? decimals : 2);
            return (isNaN(value) ? 0 : value).toFixed(decimals);
        },

        ifNull: function(value, nullValue) {
            return 1.00 * (isNaN(value) ? nullValue : value);
        },
        
        registerDataSourceChooser: function(id, script, editorId, fileTreeId, callback){
            
            $(function() {
                var $sourceChooseModal = $(id);
                var $fileTree = $(fileTreeId);
                $sourceChooseModal.on('show',
                    function() {
                        $fileTree.fileTree({
                            root: '',
                            script: script,
                            expandSpeed: 100,
                            collapseSpeed: 100,
                            loadMessage: 'Загрузка...',
                            multiFolder: false
                        },
                            function(file) {
                                if (file) {
                                    $(editorId).val(unescape(file));
                                    $sourceChooseModal.modal('hide');
                                    callback();
                                }
                            });
                    });
            });
        },
    },
    Private: {
        clearError: function(group) {
            group.removeClass('error');
            group.find('div .error').remove();
        },
        addError: function(group, message) {
            var errorIcon = REKOD.Private.renderTemplate(REKOD.Constants.errorIcon, {
                title: message,
                site_url: REKOD.siteUrl
            });

            var errorMessage = REKOD.Private.renderTemplate(REKOD.Constants.errorIconWithMessage, {
                message: message,
                site_url: REKOD.siteUrl
            });

            var iconContainer = group.data('icon-container');
            var isMessage = group.data('is-message');
            group.addClass('error');
            if (iconContainer !== undefined) {
                $('#' + iconContainer).empty();
                if (isMessage !== undefined) {
                    $('#' + iconContainer).append(errorMessage);
                } else {
                    $('#' + iconContainer).append(errorIcon);
                }
            } else {
                if (group.find('div.controls textarea').length > 0) {
                    group.find('div.controls textarea').after(errorIcon);
                } else if (group.find('div.controls .input-append').length > 0) {
                    group.find('div.controls .input-append').append(errorIcon);
                } else {
                    group.find('div.controls').append(errorIcon);
                }
            }
            group.find('div img.error').tooltip({
                placement: 'right',
                html: true
            });
        },
        renderTemplate: function(template, options) {
            return $('<div />').append($.tmpl(template, options)).html();
        },
        space: function(value) {
            return value.replace(/\s/gm, '&nbsp;');
        },
        clearRequiredValidation: function(group) {
            $('#' + group.data('control')).off('change.validation.required');
        },
        addRequiredValidation: function(group) {
            $('#' + group.data('control')).on('change.validation.required', function(e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                var condition = group.data('required-condition');
                if (($.trim($(this).val()) == '') && (condition ? eval(condition) : true)) {
                    var message = group.data('required-message');
                    if (!message) {
                        message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.requiredMessage), {
                            field_name: group.find('label').text()
                        });
                    }
                    REKOD.Private.addError(group, message);
                    e.result = true;
                }
            });
        },
        addIntegerValidation: function(group) {
            $('#' + group.data('control')).on('change.validation.integer', function(e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                if ($.trim($(this).val()) != '') {
                    if (!REKOD.Validate.integer($(this).val())) {
                        var message = group.data('integer-message');
                        if (!message) {
                            message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.formatMessage), {
                                field_name: group.find('label').text()
                            });
                        }
                        REKOD.Private.addError(group, message);
                        e.result = true;
                    } else {
                        if (group.data('not-equal') !== '' && $(this).val() == group.data('not-equal')) {
                            var message = group.data('not-equal-message');
                            if (!message) {
                                message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.notEqualMessage), {
                                    field_name: group.find('label').text(),
                                    value: group.data('not-equal')
                                });
                            }
                            REKOD.Private.addError(group, message);
                            e.result = true;
                        } else {
                            if ((group.data('min') !== '' && $(this).val() < group.data('min')) ||
                                (group.data('max') !== '' && $(this).val() > group.data('max'))) {
                                var message = group.data('range-message');
                                if (!message) {
                                    if (group.data('min') && group.data('max')) {
                                        message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.rangeBetweenMessage), {
                                            field_name: group.find('label').text(),
                                            value_min: group.data('min'),
                                            value_max: group.data('max')
                                        });
                                    } else if (group.data('min')) {
                                        message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.rangeFromMessage), {
                                            field_name: group.find('label').text(),
                                            value_min: group.data('min')
                                        });
                                    } else if (group.data('max')) {
                                        message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.rangeToMessage), {
                                            field_name: group.find('label').text(),
                                            value_max: group.data('max')
                                        });
                                    }
                                }
                                REKOD.Private.addError(group, message);
                                e.result = true;
                            }
                        }
                    }
                }
            });
        },
        addDecimalValidation: function(group) {
            $('#' + group.data('control')).on('change.validation.decimal', function(e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                if ($.trim($(this).val()) != '') {
                    if (!REKOD.Validate.decimal($(this).val(), group.data('precision'), group.data('scale'))) {
                        var message = group.data('decimal-message');
                        if (!message) {
                            message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.formatMessage), {
                                field_name: group.find('label').text()
                            });
                        }
                        REKOD.Private.addError(group, message);
                        e.result = true;
                    } else {
                        if (group.data('not-equal') !== '' && $(this).val() == group.data('not-equal')) {
                            var message = group.data('not-equal-message');
                            if (!message) {
                                message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.notEqualMessage), {
                                    field_name: group.find('label').text(),
                                    value: group.data('not-equal')
                                });
                            }
                            REKOD.Private.addError(group, message);
                            e.result = true;
                        } else {
                            if ((group.data('min') !== '' && $(this).val() < group.data('min')) ||
                                (group.data('max') !== '' && $(this).val() > group.data('max'))) {
                                var message = group.data('range-message');
                                if (!message) {
                                    if (group.data('min') && group.data('max')) {
                                        message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.rangeBetweenMessage), {
                                            field_name: group.find('label').text(),
                                            value_min: group.data('min'),
                                            value_max: group.data('max')
                                        });
                                    } else if (group.data('min')) {
                                        message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.rangeFromMessage), {
                                            field_name: group.find('label').text(),
                                            value_min: group.data('min')
                                        });
                                    } else if (group.data('max')) {
                                        message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.rangeToMessage), {
                                            field_name: group.find('label').text(),
                                            value_max: group.data('max')
                                        });
                                    }
                                }
                                REKOD.Private.addError(group, message);
                                e.result = true;
                            }
                        }
                    }
                }
            });
        },
        addEmailValidation: function(group) {
            $('#' + group.data('control')).on('change.validation.email', function(e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                if ($.trim($(this).val()) != '') {
                    if (!REKOD.Validate.email($(this).val())) {
                        var message = group.data('email-message');
                        if (!message) {
                            message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.formatMessage), {
                                field_name: group.find('label').text()
                            });
                        }
                        REKOD.Private.addError(group, message);
                        e.result = true;
                    }
                }
            });
        },
        addImageValidation: function (group) {
            $('#' + group.data('control')).on('change.validation.image', function (e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                if ($.trim($(this).val()) != '') {
                    if (!REKOD.Validate.image($(this).val())) {
                        var message = group.data('image-message');
                        if (!message) {
                            message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.imageMessage), {
                                field_name: group.find('label').text()
                            });
                        }
                        REKOD.Private.addError(group, message);
                        e.result = true;
                    }
                }
            });
        },
        addPasswordValidation: function(group) {
            $('#' + group.data('control')).on('change.validation.password', function(e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                if ($.trim($(this).val()) != '') {
                    if (!REKOD.Validate.password($(this).val())) {
                        var message = group.data('password-message');
                        if (!message) {
                            message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.passwordSecurityMessage), {
                                field_name: group.find('label').text()
                            });
                        }
                        REKOD.Private.addError(group, message);
                        e.result = true;
                    }
                }
            });
        },
        addTimeValidation: function(group) {
            $('#' + group.data('control')).on('change.validation.time', function(e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                if ($.trim($(this).val()) != '') {
                    if (!REKOD.Validate.time($(this).val())) {
                        var message = group.data('time-message');
                        if (!message) {
                            message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.formatMessage), {
                                field_name: group.find('label').text()
                            });
                        }
                        REKOD.Private.addError(group, message);
                        e.result = true;
                    }
                }
            });
        },
        addDiffTimeValidation: function(group) {
            $('#' + group.data('control')).on('change.validation.diff_time', function(e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                if ($.trim($(this).val()) != '') {
                    if (!REKOD.Validate.diff_time($(this).val())) {
                        var message = group.data('time-message');
                        if (!message) {
                            message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.formatMessage), {
                                field_name: group.find('label').text()
                            });
                        }
                        REKOD.Private.addError(group, message);
                        e.result = true;
                    }
                }
            });
        },
        addDateValidation: function(group) {
            $('#' + group.data('control')).on('change.validation.date', function(e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                if ($.trim($(this).val()) != '') {
                    if (!REKOD.Validate.date($(this).val())) {
                        var message = group.data('date-message');
                        if (!message) {
                            message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.formatMessage), {
                                field_name: group.find('label').text()
                            });
                        }
                        REKOD.Private.addError(group, message);
                        e.result = true;
                    }
                }
            });
        },
        addUrlValidation: function (group) {
            $('#' + group.data('control')).on('change.validation.url', function (e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                if ($.trim($(this).val()) != '') {
                    if (!REKOD.Validate.url($(this).val())) {
                        var message = group.data('url-message');
                        if (!message) {
                            message = REKOD.Private.renderTemplate(REKOD.Private.space(REKOD.Constants.formatMessage), {
                                field_name: group.find('label').text()
                            });
                        }
                        REKOD.Private.addError(group, message);
                        e.result = true;
                    }
                }
            });
        },
        addComplexValidation: function(group) {
            var control = group.data('control');
            if (control.charAt(0) != '.' && control.charAt(0) != '#') {
                control = '#' + control;
            }
            $(control).on('change.validation.complex', function(e) {
                if (e.result) return e.result;
                REKOD.Private.clearError(group);
                var condition = group.data('condition');
                if (typeof eval(condition) == 'function') {
                    var message = eval(condition).call();
                    switch (message) {
                    case true:
                        break;
                    case false:
                        message = group.data('complex-message');
                        REKOD.Private.addError(group, message);
                        e.result = true;
                        $(window).scrollTop(0);
                        break;
                    default:
                        REKOD.Private.addError(group, message);
                        e.result = true;
                        $(window).scrollTop(0);
                        break;
                    }
                }
            });
        },
    },
    Constants: {
        noData: '<div style="text-align:center;">Нет данных для отображения.</div>',
        noDataAlert: '<div class="alert alert-info"><button class="close" data-dismiss="alert">&times;</button>Нет данных для отображения.</div>',
        collapse: 'Свернуть',
        expand: 'Развернуть',
        errorIcon: '<img class="error" src="/Content/img/error-icon.png" style="padding-left:5px;" rel="tooltip" title="${title}" />',
        errorIconWithMessage: '<div class="error alert alert-error">${message}</div>',
        confirmMessage: 'Вы уверены, что хотите удалить этот элемент?',
        requiredMessage: 'Поле <strong>${field_name}</strong> обязательное для заполнения.',
        selectMessage: 'Сначала нужно отметить поле <strong>${field_name}</strong>.',
        atLeastMessage: 'Сначала нужно отметить хотя бы одно поле ${field_name}.',
        formatMessage: 'Значение поля <strong>${field_name}</strong> имеет некорректный формат.',
        imageMessage: "Неверный формат файла. Выберите файл с одним из следующих расширений: .png, .jpg, .jpeg, .gif",
        passwordSecurityMessage: '<b>Пароль</b> должен быть не менее 6 символов.',
        notEqualMessage: 'Значение поля <strong>${field_name}</strong> должно быть равно ${value}.',
        rangeFromMessage: 'Значение поля <strong>${field_name}</strong> должно быть больше или равно ${value_min}.',
        rangeToMessage: 'Значение поля <strong>${field_name}</strong> должно быть меньше или равно ${value_max}.',
        rangeBetweenMessage: 'Значение поля <strong>${field_name}</strong> должно быть между ${value_min} и ${value_max}.',
        emptyPaymentColumnsMessage: 'Хотя бы одно поле должно быть заполнено.'
    }
}