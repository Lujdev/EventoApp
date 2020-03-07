/**
 * bootstrap-switch - Turn checkboxes and radio buttons into toggle switches.
 *
 * @version v3.3.4
 * @homepage https://bttstrp.github.io/bootstrap-switch
 * @author Mattia Larentis <mattia@larentis.eu> (http://larentis.eu)
 * @license Apache-2.0
 */

(function(global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jquery);
    global.bootstrapSwitch = mod.exports;
  }
})(this, function(_jquery) {
  'use strict';

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var $ = _jquery2.default || window.jQuery || window.$;

  var BootstrapSwitch = function() {
    function BootstrapSwitch(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, BootstrapSwitch);

      this.$element = $(element);
      this.options = $.extend({}, $.fn.bootstrapSwitch.defaults, this._getElementOptions(), options);
      this.prevOptions = {};
      this.$wrapper = $('<div>', {
        class: function _class() {
          var classes = [];
          classes.push(_this.options.state ? 'on' : 'off');
          if (_this.options.size) {
            classes.push(_this.options.size);
          }
          if (_this.options.disabled) {
            classes.push('disabled');
          }
          if (_this.options.readonly) {
            classes.push('readonly');
          }
          if (_this.options.indeterminate) {
            classes.push('indeterminate');
          }
          if (_this.options.inverse) {
            classes.push('inverse');
          }
          if (_this.$element.attr('id')) {
            classes.push('id-' + _this.$element.attr('id'));
          }
          return classes.map(_this._getClass.bind(_this)).concat([_this.options.baseClass], _this._getClasses(_this.options.wrapperClass)).join(' ');
        }
      });
      this.$container = $('<div>', {
        class: this._getClass('container')
      });
      this.$on = $('<span>', {
        html: this.options.onText,
        class: this._getClass('handle-on') + ' ' + this._getClass(this.options.onColor)
      });
      this.$off = $('<span>', {
        html: this.options.offText,
        class: this._getClass('handle-off') + ' ' + this._getClass(this.options.offColor)
      });
      this.$label = $('<span>', {
        html: this.options.labelText,
        class: this._getClass('label')
      });

      this.$element.on('init.bootstrapSwitch', this.options.onInit.bind(this, element));
      this.$element.on('switchChange.bootstrapSwitch', function() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (_this.options.onSwitchChange.apply(element, args) === false) {
          if (_this.$element.is(':radio')) {
            $('[name="' + _this.$element.attr('name') + '"]').trigger('previousState.bootstrapSwitch', true);
          } else {
            _this.$element.trigger('previousState.bootstrapSwitch', true);
          }
        }
      });

      this.$container = this.$element.wrap(this.$container).parent();
      this.$wrapper = this.$container.wrap(this.$wrapper).parent();
      this.$element.before(this.options.inverse ? this.$off : this.$on).before(this.$label).before(this.options.inverse ? this.$on : this.$off);

      if (this.options.indeterminate) {
        this.$element.prop('indeterminate', true);
      }

      this._init();
      this._elementHandlers();
      this._handleHandlers();
      this._labelHandlers();
      this._formHandler();
      this._externalLabelHandler();
      this.$element.trigger('init.bootstrapSwitch', this.options.state);
    }

    _createClass(BootstrapSwitch, [{
      key: 'setPrevOptions',
      value: function setPrevOptions() {
        this.prevOptions = _extends({}, this.options);
      }
    }, {
      key: 'state',
      value: function state(value, skip) {
        if (typeof value === 'undefined') {
          return this.options.state;
        }
        if (this.options.disabled || this.options.readonly || this.options.state && !this.options.radioAllOff && this.$element.is(':radio')) {
          return this.$element;
        }
        if (this.$element.is(':radio')) {
          $('[name="' + this.$element.attr('name') + '"]').trigger('setPreviousOptions.bootstrapSwitch');
        } else {
          this.$element.trigger('setPreviousOptions.bootstrapSwitch');
        }
        if (this.options.indeterminate) {
          this.indeterminate(false);
        }
        this.$element.prop('checked', Boolean(value)).trigger('change.bootstrapSwitch', skip);
        return this.$element;
      }
    }, {
      key: 'toggleState',
      value: function toggleState(skip) {
        if (this.options.disabled || this.options.readonly) {
          return this.$element;
        }
        if (this.options.indeterminate) {
          this.indeterminate(false);
          return this.state(true);
        } else {
          return this.$element.prop('checked', !this.options.state).trigger('change.bootstrapSwitch', skip);
        }
      }
    }, {
      key: 'size',
      value: function size(value) {
        if (typeof value === 'undefined') {
          return this.options.size;
        }
        if (this.options.size != null) {
          this.$wrapper.removeClass(this._getClass(this.options.size));
        }
        if (value) {
          this.$wrapper.addClass(this._getClass(value));
        }
        this._width();
        this._containerPosition();
        this.options.size = value;
        return this.$element;
      }
    }, {
      key: 'animate',
      value: function animate(value) {
        if (typeof value === 'undefined') {
          return this.options.animate;
        }
        if (this.options.animate === Boolean(value)) {
          return this.$element;
        }
        return this.toggleAnimate();
      }
    }, {
      key: 'toggleAnimate',
      value: function toggleAnimate() {
        this.options.animate = !this.options.animate;
        this.$wrapper.toggleClass(this._getClass('animate'));
        return this.$element;
      }
    }, {
      key: 'disabled',
      value: function disabled(value) {
        if (typeof value === 'undefined') {
          return this.options.disabled;
        }
        if (this.options.disabled === Boolean(value)) {
          return this.$element;
        }
        return this.toggleDisabled();
      }
    }, {
      key: 'toggleDisabled',
      value: function toggleDisabled() {
        this.options.disabled = !this.options.disabled;
        this.$element.prop('disabled', this.options.disabled);
        this.$wrapper.toggleClass(this._getClass('disabled'));
        return this.$element;
      }
    }, {
      key: 'readonly',
      value: function readonly(value) {
        if (typeof value === 'undefined') {
          return this.options.readonly;
        }
        if (this.options.readonly === Boolean(value)) {
          return this.$element;
        }
        return this.toggleReadonly();
      }
    }, {
      key: 'toggleReadonly',
      value: function toggleReadonly() {
        this.options.readonly = !this.options.readonly;
        this.$element.prop('readonly', this.options.readonly);
        this.$wrapper.toggleClass(this._getClass('readonly'));
        return this.$element;
      }
    }, {
      key: 'indeterminate',
      value: function indeterminate(value) {
        if (typeof value === 'undefined') {
          return this.options.indeterminate;
        }
        if (this.options.indeterminate === Boolean(value)) {
          return this.$element;
        }
        return this.toggleIndeterminate();
      }
    }, {
      key: 'toggleIndeterminate',
      value: function toggleIndeterminate() {
        this.options.indeterminate = !this.options.indeterminate;
        this.$element.prop('indeterminate', this.options.indeterminate);
        this.$wrapper.toggleClass(this._getClass('indeterminate'));
        this._containerPosition();
        return this.$element;
      }
    }, {
      key: 'inverse',
      value: function inverse(value) {
        if (typeof value === 'undefined') {
          return this.options.inverse;
        }
        if (this.options.inverse === Boolean(value)) {
          return this.$element;
        }
        return this.toggleInverse();
      }
    }, {
      key: 'toggleInverse',
      value: function toggleInverse() {
        this.$wrapper.toggleClass(this._getClass('inverse'));
        var $on = this.$on.clone(true);
        var $off = this.$off.clone(true);
        this.$on.replaceWith($off);
        this.$off.replaceWith($on);
        this.$on = $off;
        this.$off = $on;
        this.options.inverse = !this.options.inverse;
        return this.$element;
      }
    }, {
      key: 'onColor',
      value: function onColor(value) {
        if (typeof value === 'undefined') {
          return this.options.onColor;
        }
        if (this.options.onColor) {
          this.$on.removeClass(this._getClass(this.options.onColor));
        }
        this.$on.addClass(this._getClass(value));
        this.options.onColor = value;
        return this.$element;
      }
    }, {
      key: 'offColor',
      value: function offColor(value) {
        if (typeof value === 'undefined') {
          return this.options.offColor;
        }
        if (this.options.offColor) {
          this.$off.removeClass(this._getClass(this.options.offColor));
        }
        this.$off.addClass(this._getClass(value));
        this.options.offColor = value;
        return this.$element;
      }
    }, {
      key: 'onText',
      value: function onText(value) {
        if (typeof value === 'undefined') {
          return this.options.onText;
        }
        this.$on.html(value);
        this._width();
        this._containerPosition();
        this.options.onText = value;
        return this.$element;
      }
    }, {
      key: 'offText',
      value: function offText(value) {
        if (typeof value === 'undefined') {
          return this.options.offText;
        }
        this.$off.html(value);
        this._width();
        this._containerPosition();
        this.options.offText = value;
        return this.$element;
      }
    }, {
      key: 'labelText',
      value: function labelText(value) {
        if (typeof value === 'undefined') {
          return this.options.labelText;
        }
        this.$label.html(value);
        this._width();
        this.options.labelText = value;
        return this.$element;
      }
    }, {
      key: 'handleWidth',
      value: function handleWidth(value) {
        if (typeof value === 'undefined') {
          return this.options.handleWidth;
        }
        this.options.handleWidth = value;
        this._width();
        this._containerPosition();
        return this.$element;
      }
    }, {
      key: 'labelWidth',
      value: function labelWidth(value) {
        if (typeof value === 'undefined') {
          return this.options.labelWidth;
        }
        this.options.labelWidth = value;
        this._width();
        this._containerPosition();
        return this.$element;
      }
    }, {
      key: 'baseClass',
      value: function baseClass(value) {
        return this.options.baseClass;
      }
    }, {
      key: 'wrapperClass',
      value: function wrapperClass(value) {
        if (typeof value === 'undefined') {
          return this.options.wrapperClass;
        }
        if (!value) {
          value = $.fn.bootstrapSwitch.defaults.wrapperClass;
        }
        this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(' '));
        this.$wrapper.addClass(this._getClasses(value).join(' '));
        this.options.wrapperClass = value;
        return this.$element;
      }
    }, {
      key: 'radioAllOff',
      value: function radioAllOff(value) {
        if (typeof value === 'undefined') {
          return this.options.radioAllOff;
        }
        var val = Boolean(value);
        if (this.options.radioAllOff === val) {
          return this.$element;
        }
        this.options.radioAllOff = val;
        return this.$element;
      }
    }, {
      key: 'onInit',
      value: function onInit(value) {
        if (typeof value === 'undefined') {
          return this.options.onInit;
        }
        if (!value) {
          value = $.fn.bootstrapSwitch.defaults.onInit;
        }
        this.options.onInit = value;
        return this.$element;
      }
    }, {
      key: 'onSwitchChange',
      value: function onSwitchChange(value) {
        if (typeof value === 'undefined') {
          return this.options.onSwitchChange;
        }
        if (!value) {
          value = $.fn.bootstrapSwitch.defaults.onSwitchChange;
        }
        this.options.onSwitchChange = value;
        return this.$element;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var $form = this.$element.closest('form');
        if ($form.length) {
          $form.off('reset.bootstrapSwitch').removeData('bootstrap-switch');
        }
        this.$container.children().not(this.$element).remove();
        this.$element.unwrap().unwrap().off('.bootstrapSwitch').removeData('bootstrap-switch');
        return this.$element;
      }
    }, {
      key: '_getElementOptions',
      value: function _getElementOptions() {
        return {
          state: this.$element.is(':checked'),
          size: this.$element.data('size'),
          animate: this.$element.data('animate'),
          disabled: this.$element.is(':disabled'),
          readonly: this.$element.is('[readonly]'),
          indeterminate: this.$element.data('indeterminate'),
          inverse: this.$element.data('inverse'),
          radioAllOff: this.$element.data('radio-all-off'),
          onColor: this.$element.data('on-color'),
          offColor: this.$element.data('off-color'),
          onText: this.$element.data('on-text'),
          offText: this.$element.data('off-text'),
          labelText: this.$element.data('label-text'),
          handleWidth: this.$element.data('handle-width'),
          labelWidth: this.$element.data('label-width'),
          baseClass: this.$element.data('base-class'),
          wrapperClass: this.$element.data('wrapper-class')
        };
      }
    }, {
      key: '_width',
      value: function _width() {
        var _this2 = this;

        var $handles = this.$on.add(this.$off).add(this.$label).css('width', '');
        var handleWidth = this.options.handleWidth === 'auto' ? Math.round(Math.max(this.$on.width(), this.$off.width())) : this.options.handleWidth;
        $handles.width(handleWidth);
        this.$label.width(function(index, width) {
          if (_this2.options.labelWidth !== 'auto') {
            return _this2.options.labelWidth;
          }
          if (width < handleWidth) {
            return handleWidth;
          }
          return width;
        });
        this._handleWidth = this.$on.outerWidth();
        this._labelWidth = this.$label.outerWidth();
        this.$container.width(this._handleWidth * 2 + this._labelWidth);
        return this.$wrapper.width(this._handleWidth + this._labelWidth);
      }
    }, {
      key: '_containerPosition',
      value: function _containerPosition() {
        var _this3 = this;

        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.state;
        var callback = arguments[1];

        this.$container.css('margin-left', function() {
          var values = [0, '-' + _this3._handleWidth + 'px'];
          if (_this3.options.indeterminate) {
            return '-' + _this3._handleWidth / 2 + 'px';
          }
          if (state) {
            if (_this3.options.inverse) {
              return values[1];
            } else {
              return values[0];
            }
          } else {
            if (_this3.options.inverse) {
              return values[0];
            } else {
              return values[1];
            }
          }
        });
      }
    }, {
      key: '_init',
      value: function _init() {
        var _this4 = this;

        var init = function init() {
          _this4.setPrevOptions();
          _this4._width();
          _this4._containerPosition();
          setTimeout(function() {
            if (_this4.options.animate) {
              return _this4.$wrapper.addClass(_this4._getClass('animate'));
            }
          }, 50);
        };
        if (this.$wrapper.is(':visible')) {
          init();
          return;
        }
        var initInterval = window.setInterval(function() {
          if (_this4.$wrapper.is(':visible')) {
            init();
            return window.clearInterval(initInterval);
          }
        }, 50);
      }
    }, {
      key: '_elementHandlers',
      value: function _elementHandlers() {
        var _this5 = this;

        return this.$element.on({
          'setPreviousOptions.bootstrapSwitch': this.setPrevOptions.bind(this),

          'previousState.bootstrapSwitch': function previousStateBootstrapSwitch() {
            _this5.options = _this5.prevOptions;
            if (_this5.options.indeterminate) {
              _this5.$wrapper.addClass(_this5._getClass('indeterminate'));
            }
            _this5.$element.prop('checked', _this5.options.state).trigger('change.bootstrapSwitch', true);
          },

          'change.bootstrapSwitch': function changeBootstrapSwitch(event, skip) {
            event.preventDefault();
            event.stopImmediatePropagation();
            var state = _this5.$element.is(':checked');
            _this5._containerPosition(state);
            if (state === _this5.options.state) {
              return;
            }
            _this5.options.state = state;
            _this5.$wrapper.toggleClass(_this5._getClass('off')).toggleClass(_this5._getClass('on'));
            if (!skip) {
              if (_this5.$element.is(':radio')) {
                $('[name="' + _this5.$element.attr('name') + '"]').not(_this5.$element).prop('checked', false).trigger('change.bootstrapSwitch', true);
              }
              _this5.$element.trigger('switchChange.bootstrapSwitch', [state]);
            }
          },

          'focus.bootstrapSwitch': function focusBootstrapSwitch(event) {
            event.preventDefault();
            _this5.$wrapper.addClass(_this5._getClass('focused'));
          },

          'blur.bootstrapSwitch': function blurBootstrapSwitch(event) {
            event.preventDefault();
            _this5.$wrapper.removeClass(_this5._getClass('focused'));
          },

          'keydown.bootstrapSwitch': function keydownBootstrapSwitch(event) {
            if (!event.which || _this5.options.disabled || _this5.options.readonly) {
              return;
            }
            if (event.which === 37 || event.which === 39) {
              event.preventDefault();
              event.stopImmediatePropagation();
              _this5.state(event.which === 39);
            }
          }
        });
      }
    }, {
      key: '_handleHandlers',
      value: function _handleHandlers() {
        var _this6 = this;

        this.$on.on('click.bootstrapSwitch', function(event) {
          event.preventDefault();
          event.stopPropagation();
          _this6.state(false);
          return _this6.$element.trigger('focus.bootstrapSwitch');
        });
        return this.$off.on('click.bootstrapSwitch', function(event) {
          event.preventDefault();
          event.stopPropagation();
          _this6.state(true);
          return _this6.$element.trigger('focus.bootstrapSwitch');
        });
      }
    }, {
      key: '_labelHandlers',
      value: function _labelHandlers() {
        var _this7 = this;

        var handlers = {
          click: function click(event) {
            event.stopPropagation();
          },


          'mousedown.bootstrapSwitch touchstart.bootstrapSwitch': function mousedownBootstrapSwitchTouchstartBootstrapSwitch(event) {
            if (_this7._dragStart || _this7.options.disabled || _this7.options.readonly) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            _this7._dragStart = (event.pageX || event.originalEvent.touches[0].pageX) - parseInt(_this7.$container.css('margin-left'), 10);
            if (_this7.options.animate) {
              _this7.$wrapper.removeClass(_this7._getClass('animate'));
            }
            _this7.$element.trigger('focus.bootstrapSwitch');
          },

          'mousemove.bootstrapSwitch touchmove.bootstrapSwitch': function mousemoveBootstrapSwitchTouchmoveBootstrapSwitch(event) {
            if (_this7._dragStart == null) {
              return;
            }
            var difference = (event.pageX || event.originalEvent.touches[0].pageX) - _this7._dragStart;
            event.preventDefault();
            if (difference < -_this7._handleWidth || difference > 0) {
              return;
            }
            _this7._dragEnd = difference;
            _this7.$container.css('margin-left', _this7._dragEnd + 'px');
          },

          'mouseup.bootstrapSwitch touchend.bootstrapSwitch': function mouseupBootstrapSwitchTouchendBootstrapSwitch(event) {
            if (!_this7._dragStart) {
              return;
            }
            event.preventDefault();
            if (_this7.options.animate) {
              _this7.$wrapper.addClass(_this7._getClass('animate'));
            }
            if (_this7._dragEnd) {
              var state = _this7._dragEnd > -(_this7._handleWidth / 2);
              _this7._dragEnd = false;
              _this7.state(_this7.options.inverse ? !state : state);
            } else {
              _this7.state(!_this7.options.state);
            }
            _this7._dragStart = false;
          },

          'mouseleave.bootstrapSwitch': function mouseleaveBootstrapSwitch() {
            _this7.$label.trigger('mouseup.bootstrapSwitch');
          }
        };
        this.$label.on(handlers);
      }
    }, {
      key: '_externalLabelHandler',
      value: function _externalLabelHandler() {
        var _this8 = this;

        var $externalLabel = this.$element.closest('label');
        $externalLabel.on('click', function(event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (event.target === $externalLabel[0]) {
            _this8.toggleState();
          }
        });
      }
    }, {
      key: '_formHandler',
      value: function _formHandler() {
        var $form = this.$element.closest('form');
        if ($form.data('bootstrap-switch')) {
          return;
        }
        $form.on('reset.bootstrapSwitch', function() {
          window.setTimeout(function() {
            $form.find('input').filter(function() {
              return $(this).data('bootstrap-switch');
            }).each(function() {
              return $(this).bootstrapSwitch('state', this.checked);
            });
          }, 1);
        }).data('bootstrap-switch', true);
      }
    }, {
      key: '_getClass',
      value: function _getClass(name) {
        return this.options.baseClass + '-' + name;
      }
    }, {
      key: '_getClasses',
      value: function _getClasses(classes) {
        if (!$.isArray(classes)) {
          return [this._getClass(classes)];
        }
        return classes.map(this._getClass.bind(this));
      }
    }]);

    return BootstrapSwitch;
  }();

  $.fn.bootstrapSwitch = function(option) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    function reducer(ret, next) {
      var $this = $(next);
      var existingData = $this.data('bootstrap-switch');
      var data = existingData || new BootstrapSwitch(next, option);
      if (!existingData) {
        $this.data('bootstrap-switch', data);
      }
      if (typeof option === 'string') {
        return data[option].apply(data, args);
      }
      return ret;
    }
    return Array.prototype.reduce.call(this, reducer, this);
  };
  $.fn.bootstrapSwitch.Constructor = BootstrapSwitch;
  $.fn.bootstrapSwitch.defaults = {
    state: true,
    size: null,
    animate: true,
    disabled: false,
    readonly: false,
    indeterminate: false,
    inverse: false,
    radioAllOff: false,
    onColor: 'primary',
    offColor: 'default',
    onText: 'ON',
    offText: 'OFF',
    labelText: '&nbsp',
    handleWidth: 'auto',
    labelWidth: 'auto',
    baseClass: 'bootstrap-switch',
    wrapperClass: 'wrapper',
    onInit: function onInit() {},
    onSwitchChange: function onSwitchChange() {}
  };
});
/*! nouislider - 13.1.4 - 3/20/2019 */
!function(t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():window.noUiSlider=t()}(function(){"use strict";var ut="13.1.4";function ct(t){t.parentElement.removeChild(t)}function s(t){return null!=t}function pt(t){t.preventDefault()}function i(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)}function ft(t,e,r){0<r&&(mt(t,e),setTimeout(function(){gt(t,e)},r))}function dt(t){return Math.max(Math.min(t,100),0)}function ht(t){return Array.isArray(t)?t:[t]}function e(t){var e=(t=String(t)).split(".");return 1<e.length?e[1].length:0}function mt(t,e){t.classList?t.classList.add(e):t.className+=" "+e}function gt(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}function vt(t){var e=void 0!==window.pageXOffset,r="CSS1Compat"===(t.compatMode||"");return{x:e?window.pageXOffset:r?t.documentElement.scrollLeft:t.body.scrollLeft,y:e?window.pageYOffset:r?t.documentElement.scrollTop:t.body.scrollTop}}function c(t,e){return 100/(e-t)}function p(t,e){return 100*e/(t[1]-t[0])}function f(t,e){for(var r=1;t>=e[r];)r+=1;return r}function r(t,e,r){if(r>=t.slice(-1)[0])return 100;var n,i,o=f(r,t),a=t[o-1],s=t[o],l=e[o-1],u=e[o];return l+(i=r,p(n=[a,s],n[0]<0?i+Math.abs(n[0]):i-n[0])/c(l,u))}function n(t,e,r,n){if(100===n)return n;var i,o,a=f(n,t),s=t[a-1],l=t[a];return r?(l-s)/2<n-s?l:s:e[a-1]?t[a-1]+(i=n-t[a-1],o=e[a-1],Math.round(i/o)*o):n}function o(t,e,r){var n;if("number"==typeof e&&(e=[e]),!Array.isArray(e))throw new Error("noUiSlider ("+ut+"): 'range' contains invalid value.");if(!i(n="min"===t?0:"max"===t?100:parseFloat(t))||!i(e[0]))throw new Error("noUiSlider ("+ut+"): 'range' value isn't numeric.");r.xPct.push(n),r.xVal.push(e[0]),n?r.xSteps.push(!isNaN(e[1])&&e[1]):isNaN(e[1])||(r.xSteps[0]=e[1]),r.xHighestCompleteStep.push(0)}function a(t,e,r){if(e)if(r.xVal[t]!==r.xVal[t+1]){r.xSteps[t]=p([r.xVal[t],r.xVal[t+1]],e)/c(r.xPct[t],r.xPct[t+1]);var n=(r.xVal[t+1]-r.xVal[t])/r.xNumSteps[t],i=Math.ceil(Number(n.toFixed(3))-1),o=r.xVal[t]+r.xNumSteps[t]*i;r.xHighestCompleteStep[t]=o}else r.xSteps[t]=r.xHighestCompleteStep[t]=r.xVal[t]}function l(t,e,r){var n;this.xPct=[],this.xVal=[],this.xSteps=[r||!1],this.xNumSteps=[!1],this.xHighestCompleteStep=[],this.snap=e;var i=[];for(n in t)t.hasOwnProperty(n)&&i.push([t[n],n]);for(i.length&&"object"==typeof i[0][0]?i.sort(function(t,e){return t[0][0]-e[0][0]}):i.sort(function(t,e){return t[0]-e[0]}),n=0;n<i.length;n++)o(i[n][1],i[n][0],this);for(this.xNumSteps=this.xSteps.slice(0),n=0;n<this.xNumSteps.length;n++)a(n,this.xNumSteps[n],this)}l.prototype.getMargin=function(t){var e=this.xNumSteps[0];if(e&&t/e%1!=0)throw new Error("noUiSlider ("+ut+"): 'limit', 'margin' and 'padding' must be divisible by step.");return 2===this.xPct.length&&p(this.xVal,t)},l.prototype.toStepping=function(t){return t=r(this.xVal,this.xPct,t)},l.prototype.fromStepping=function(t){return function(t,e,r){if(100<=r)return t.slice(-1)[0];var n,i=f(r,e),o=t[i-1],a=t[i],s=e[i-1],l=e[i];return n=[o,a],(r-s)*c(s,l)*(n[1]-n[0])/100+n[0]}(this.xVal,this.xPct,t)},l.prototype.getStep=function(t){return t=n(this.xPct,this.xSteps,this.snap,t)},l.prototype.getDefaultStep=function(t,e,r){var n=f(t,this.xPct);return(100===t||e&&t===this.xPct[n-1])&&(n=Math.max(n-1,1)),(this.xVal[n]-this.xVal[n-1])/r},l.prototype.getNearbySteps=function(t){var e=f(t,this.xPct);return{stepBefore:{startValue:this.xVal[e-2],step:this.xNumSteps[e-2],highestStep:this.xHighestCompleteStep[e-2]},thisStep:{startValue:this.xVal[e-1],step:this.xNumSteps[e-1],highestStep:this.xHighestCompleteStep[e-1]},stepAfter:{startValue:this.xVal[e],step:this.xNumSteps[e],highestStep:this.xHighestCompleteStep[e]}}},l.prototype.countStepDecimals=function(){var t=this.xNumSteps.map(e);return Math.max.apply(null,t)},l.prototype.convert=function(t){return this.getStep(this.toStepping(t))};var u={to:function(t){return void 0!==t&&t.toFixed(2)},from:Number};function d(t){if("object"==typeof(e=t)&&"function"==typeof e.to&&"function"==typeof e.from)return!0;var e;throw new Error("noUiSlider ("+ut+"): 'format' requires 'to' and 'from' methods.")}function h(t,e){if(!i(e))throw new Error("noUiSlider ("+ut+"): 'step' is not numeric.");t.singleStep=e}function m(t,e){if("object"!=typeof e||Array.isArray(e))throw new Error("noUiSlider ("+ut+"): 'range' is not an object.");if(void 0===e.min||void 0===e.max)throw new Error("noUiSlider ("+ut+"): Missing 'min' or 'max' in 'range'.");if(e.min===e.max)throw new Error("noUiSlider ("+ut+"): 'range' 'min' and 'max' cannot be equal.");t.spectrum=new l(e,t.snap,t.singleStep)}function g(t,e){if(e=ht(e),!Array.isArray(e)||!e.length)throw new Error("noUiSlider ("+ut+"): 'start' option is incorrect.");t.handles=e.length,t.start=e}function v(t,e){if("boolean"!=typeof(t.snap=e))throw new Error("noUiSlider ("+ut+"): 'snap' option must be a boolean.")}function b(t,e){if("boolean"!=typeof(t.animate=e))throw new Error("noUiSlider ("+ut+"): 'animate' option must be a boolean.")}function S(t,e){if("number"!=typeof(t.animationDuration=e))throw new Error("noUiSlider ("+ut+"): 'animationDuration' option must be a number.")}function x(t,e){var r,n=[!1];if("lower"===e?e=[!0,!1]:"upper"===e&&(e=[!1,!0]),!0===e||!1===e){for(r=1;r<t.handles;r++)n.push(e);n.push(!1)}else{if(!Array.isArray(e)||!e.length||e.length!==t.handles+1)throw new Error("noUiSlider ("+ut+"): 'connect' option doesn't match handle count.");n=e}t.connect=n}function w(t,e){switch(e){case"horizontal":t.ort=0;break;case"vertical":t.ort=1;break;default:throw new Error("noUiSlider ("+ut+"): 'orientation' option is invalid.")}}function y(t,e){if(!i(e))throw new Error("noUiSlider ("+ut+"): 'margin' option must be numeric.");if(0!==e&&(t.margin=t.spectrum.getMargin(e),!t.margin))throw new Error("noUiSlider ("+ut+"): 'margin' option is only supported on linear sliders.")}function E(t,e){if(!i(e))throw new Error("noUiSlider ("+ut+"): 'limit' option must be numeric.");if(t.limit=t.spectrum.getMargin(e),!t.limit||t.handles<2)throw new Error("noUiSlider ("+ut+"): 'limit' option is only supported on linear sliders with 2 or more handles.")}function C(t,e){if(!i(e)&&!Array.isArray(e))throw new Error("noUiSlider ("+ut+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(Array.isArray(e)&&2!==e.length&&!i(e[0])&&!i(e[1]))throw new Error("noUiSlider ("+ut+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(0!==e){if(Array.isArray(e)||(e=[e,e]),!(t.padding=[t.spectrum.getMargin(e[0]),t.spectrum.getMargin(e[1])])===t.padding[0]||!1===t.padding[1])throw new Error("noUiSlider ("+ut+"): 'padding' option is only supported on linear sliders.");if(t.padding[0]<0||t.padding[1]<0)throw new Error("noUiSlider ("+ut+"): 'padding' option must be a positive number(s).");if(100<=t.padding[0]+t.padding[1])throw new Error("noUiSlider ("+ut+"): 'padding' option must not exceed 100% of the range.")}}function N(t,e){switch(e){case"ltr":t.dir=0;break;case"rtl":t.dir=1;break;default:throw new Error("noUiSlider ("+ut+"): 'direction' option was not recognized.")}}function U(t,e){if("string"!=typeof e)throw new Error("noUiSlider ("+ut+"): 'behaviour' must be a string containing options.");var r=0<=e.indexOf("tap"),n=0<=e.indexOf("drag"),i=0<=e.indexOf("fixed"),o=0<=e.indexOf("snap"),a=0<=e.indexOf("hover"),s=0<=e.indexOf("unconstrained");if(i){if(2!==t.handles)throw new Error("noUiSlider ("+ut+"): 'fixed' behaviour must be used with 2 handles");y(t,t.start[1]-t.start[0])}if(s&&(t.margin||t.limit))throw new Error("noUiSlider ("+ut+"): 'unconstrained' behaviour cannot be used with margin or limit");t.events={tap:r||o,drag:n,fixed:i,snap:o,hover:a,unconstrained:s}}function k(t,e){if(!1!==e)if(!0===e){t.tooltips=[];for(var r=0;r<t.handles;r++)t.tooltips.push(!0)}else{if(t.tooltips=ht(e),t.tooltips.length!==t.handles)throw new Error("noUiSlider ("+ut+"): must pass a formatter for all handles.");t.tooltips.forEach(function(t){if("boolean"!=typeof t&&("object"!=typeof t||"function"!=typeof t.to))throw new Error("noUiSlider ("+ut+"): 'tooltips' must be passed a formatter or 'false'.")})}}function P(t,e){d(t.ariaFormat=e)}function A(t,e){d(t.format=e)}function V(t,e){if("boolean"!=typeof(t.keyboardSupport=e))throw new Error("noUiSlider ("+ut+"): 'keyboardSupport' option must be a boolean.")}function M(t,e){t.documentElement=e}function O(t,e){if("string"!=typeof e&&!1!==e)throw new Error("noUiSlider ("+ut+"): 'cssPrefix' must be a string or `false`.");t.cssPrefix=e}function L(t,e){if("object"!=typeof e)throw new Error("noUiSlider ("+ut+"): 'cssClasses' must be an object.");if("string"==typeof t.cssPrefix)for(var r in t.cssClasses={},e)e.hasOwnProperty(r)&&(t.cssClasses[r]=t.cssPrefix+e[r]);else t.cssClasses=e}function bt(e){var r={margin:0,limit:0,padding:0,animate:!0,animationDuration:300,ariaFormat:u,format:u},n={step:{r:!1,t:h},start:{r:!0,t:g},connect:{r:!0,t:x},direction:{r:!0,t:N},snap:{r:!1,t:v},animate:{r:!1,t:b},animationDuration:{r:!1,t:S},range:{r:!0,t:m},orientation:{r:!1,t:w},margin:{r:!1,t:y},limit:{r:!1,t:E},padding:{r:!1,t:C},behaviour:{r:!0,t:U},ariaFormat:{r:!1,t:P},format:{r:!1,t:A},tooltips:{r:!1,t:k},keyboardSupport:{r:!0,t:V},documentElement:{r:!1,t:M},cssPrefix:{r:!0,t:O},cssClasses:{r:!0,t:L}},i={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",keyboardSupport:!0,cssPrefix:"noUi-",cssClasses:{target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",touchArea:"touch-area",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",connects:"connects",ltr:"ltr",rtl:"rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"}};e.format&&!e.ariaFormat&&(e.ariaFormat=e.format),Object.keys(n).forEach(function(t){if(!s(e[t])&&void 0===i[t]){if(n[t].r)throw new Error("noUiSlider ("+ut+"): '"+t+"' is required.");return!0}n[t].t(r,s(e[t])?e[t]:i[t])}),r.pips=e.pips;var t=document.createElement("div"),o=void 0!==t.style.msTransform,a=void 0!==t.style.transform;r.transformRule=a?"transform":o?"msTransform":"webkitTransform";return r.style=[["left","top"],["right","bottom"]][r.dir][r.ort],r}function z(t,f,o){var l,u,a,c,i,s,e,p,d=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},h=window.CSS&&CSS.supports&&CSS.supports("touch-action","none")&&function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}(),y=t,E=f.spectrum,m=[],g=[],v=[],b=0,S={},x=t.ownerDocument,w=f.documentElement||x.documentElement,C=x.body,N=-1,U=0,k=1,P=2,A="rtl"===x.dir||1===f.ort?0:100;function V(t,e){var r=x.createElement("div");return e&&mt(r,e),t.appendChild(r),r}function M(t,e){var r=V(t,f.cssClasses.origin),n=V(r,f.cssClasses.handle);return V(n,f.cssClasses.touchArea),n.setAttribute("data-handle",e),f.keyboardSupport&&(n.setAttribute("tabindex","0"),n.addEventListener("keydown",function(t){return function(t,e){if(L()||z(e))return!1;var r=["Left","Right"],n=["Down","Up"];f.dir&&!f.ort?r.reverse():f.ort&&!f.dir&&n.reverse();var i=t.key.replace("Arrow",""),o=i===n[0]||i===r[0],a=i===n[1]||i===r[1];if(!o&&!a)return!0;t.preventDefault();var s=o?0:1,l=lt(e)[s];if(null===l)return!1;!1===l&&(l=E.getDefaultStep(g[e],o,10));return l=Math.max(l,1e-7),l*=o?-1:1,at(e,m[e]+l,!0),!1}(t,e)})),n.setAttribute("role","slider"),n.setAttribute("aria-orientation",f.ort?"vertical":"horizontal"),0===e?mt(n,f.cssClasses.handleLower):e===f.handles-1&&mt(n,f.cssClasses.handleUpper),r}function O(t,e){return!!e&&V(t,f.cssClasses.connect)}function r(t,e){return!!f.tooltips[e]&&V(t.firstChild,f.cssClasses.tooltip)}function L(){return y.hasAttribute("disabled")}function z(t){return u[t].hasAttribute("disabled")}function j(){i&&(G("update.tooltips"),i.forEach(function(t){t&&ct(t)}),i=null)}function H(){j(),i=u.map(r),$("update.tooltips",function(t,e,r){if(i[e]){var n=t[e];!0!==f.tooltips[e]&&(n=f.tooltips[e].to(r[e])),i[e].innerHTML=n}})}function F(e,i,o){var a=x.createElement("div"),s=[];s[U]=f.cssClasses.valueNormal,s[k]=f.cssClasses.valueLarge,s[P]=f.cssClasses.valueSub;var l=[];l[U]=f.cssClasses.markerNormal,l[k]=f.cssClasses.markerLarge,l[P]=f.cssClasses.markerSub;var u=[f.cssClasses.valueHorizontal,f.cssClasses.valueVertical],c=[f.cssClasses.markerHorizontal,f.cssClasses.markerVertical];function p(t,e){var r=e===f.cssClasses.value,n=r?s:l;return e+" "+(r?u:c)[f.ort]+" "+n[t]}return mt(a,f.cssClasses.pips),mt(a,0===f.ort?f.cssClasses.pipsHorizontal:f.cssClasses.pipsVertical),Object.keys(e).forEach(function(t){!function(t,e,r){if((r=i?i(e,r):r)!==N){var n=V(a,!1);n.className=p(r,f.cssClasses.marker),n.style[f.style]=t+"%",U<r&&((n=V(a,!1)).className=p(r,f.cssClasses.value),n.setAttribute("data-value",e),n.style[f.style]=t+"%",n.innerHTML=o.to(e))}}(t,e[t][0],e[t][1])}),a}function D(){c&&(ct(c),c=null)}function T(t){D();var m,g,v,b,e,r,S,x,w,n=t.mode,i=t.density||1,o=t.filter||!1,a=function(t,e,r){if("range"===t||"steps"===t)return E.xVal;if("count"===t){if(e<2)throw new Error("noUiSlider ("+ut+"): 'values' (>= 2) required for mode 'count'.");var n=e-1,i=100/n;for(e=[];n--;)e[n]=n*i;e.push(100),t="positions"}return"positions"===t?e.map(function(t){return E.fromStepping(r?E.getStep(t):t)}):"values"===t?r?e.map(function(t){return E.fromStepping(E.getStep(E.toStepping(t)))}):e:void 0}(n,t.values||!1,t.stepped||!1),s=(m=i,g=n,v=a,b={},e=E.xVal[0],r=E.xVal[E.xVal.length-1],x=S=!1,w=0,(v=v.slice().sort(function(t,e){return t-e}).filter(function(t){return!this[t]&&(this[t]=!0)},{}))[0]!==e&&(v.unshift(e),S=!0),v[v.length-1]!==r&&(v.push(r),x=!0),v.forEach(function(t,e){var r,n,i,o,a,s,l,u,c,p,f=t,d=v[e+1],h="steps"===g;if(h&&(r=E.xNumSteps[e]),r||(r=d-f),!1!==f&&void 0!==d)for(r=Math.max(r,1e-7),n=f;n<=d;n=(n+r).toFixed(7)/1){for(u=(a=(o=E.toStepping(n))-w)/m,p=a/(c=Math.round(u)),i=1;i<=c;i+=1)b[(s=w+i*p).toFixed(5)]=[E.fromStepping(s),0];l=-1<v.indexOf(n)?k:h?P:U,!e&&S&&(l=0),n===d&&x||(b[o.toFixed(5)]=[n,l]),w=o}}),b),l=t.format||{to:Math.round};return c=y.appendChild(F(s,o,l))}function R(){var t=l.getBoundingClientRect(),e="offset"+["Width","Height"][f.ort];return 0===f.ort?t.width||l[e]:t.height||l[e]}function B(n,i,o,a){var e=function(t){return!!(t=function(t,e,r){var n,i,o=0===t.type.indexOf("touch"),a=0===t.type.indexOf("mouse"),s=0===t.type.indexOf("pointer");0===t.type.indexOf("MSPointer")&&(s=!0);if(o){var l=function(t){return t.target===r||r.contains(t.target)};if("touchstart"===t.type){var u=Array.prototype.filter.call(t.touches,l);if(1<u.length)return!1;n=u[0].pageX,i=u[0].pageY}else{var c=Array.prototype.find.call(t.changedTouches,l);if(!c)return!1;n=c.pageX,i=c.pageY}}e=e||vt(x),(a||s)&&(n=t.clientX+e.x,i=t.clientY+e.y);return t.pageOffset=e,t.points=[n,i],t.cursor=a||s,t}(t,a.pageOffset,a.target||i))&&(!(L()&&!a.doNotReject)&&(e=y,r=f.cssClasses.tap,!((e.classList?e.classList.contains(r):new RegExp("\\b"+r+"\\b").test(e.className))&&!a.doNotReject)&&(!(n===d.start&&void 0!==t.buttons&&1<t.buttons)&&((!a.hover||!t.buttons)&&(h||t.preventDefault(),t.calcPoint=t.points[f.ort],void o(t,a))))));var e,r},r=[];return n.split(" ").forEach(function(t){i.addEventListener(t,e,!!h&&{passive:!0}),r.push([t,e])}),r}function q(t){var e,r,n,i,o,a,s=100*(t-(e=l,r=f.ort,n=e.getBoundingClientRect(),i=e.ownerDocument,o=i.documentElement,a=vt(i),/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(a.x=0),r?n.top+a.y-o.clientTop:n.left+a.x-o.clientLeft))/R();return s=dt(s),f.dir?100-s:s}function X(t,e){"mouseout"===t.type&&"HTML"===t.target.nodeName&&null===t.relatedTarget&&_(t,e)}function Y(t,e){if(-1===navigator.appVersion.indexOf("MSIE 9")&&0===t.buttons&&0!==e.buttonsProperty)return _(t,e);var r=(f.dir?-1:1)*(t.calcPoint-e.startCalcPoint);Z(0<r,100*r/e.baseSize,e.locations,e.handleNumbers)}function _(t,e){e.handle&&(gt(e.handle,f.cssClasses.active),b-=1),e.listeners.forEach(function(t){w.removeEventListener(t[0],t[1])}),0===b&&(gt(y,f.cssClasses.drag),et(),t.cursor&&(C.style.cursor="",C.removeEventListener("selectstart",pt))),e.handleNumbers.forEach(function(t){J("change",t),J("set",t),J("end",t)})}function I(t,e){if(e.handleNumbers.some(z))return!1;var r;1===e.handleNumbers.length&&(r=u[e.handleNumbers[0]].children[0],b+=1,mt(r,f.cssClasses.active));t.stopPropagation();var n=[],i=B(d.move,w,Y,{target:t.target,handle:r,listeners:n,startCalcPoint:t.calcPoint,baseSize:R(),pageOffset:t.pageOffset,handleNumbers:e.handleNumbers,buttonsProperty:t.buttons,locations:g.slice()}),o=B(d.end,w,_,{target:t.target,handle:r,listeners:n,doNotReject:!0,handleNumbers:e.handleNumbers}),a=B("mouseout",w,X,{target:t.target,handle:r,listeners:n,doNotReject:!0,handleNumbers:e.handleNumbers});n.push.apply(n,i.concat(o,a)),t.cursor&&(C.style.cursor=getComputedStyle(t.target).cursor,1<u.length&&mt(y,f.cssClasses.drag),C.addEventListener("selectstart",pt,!1)),e.handleNumbers.forEach(function(t){J("start",t)})}function n(t){t.stopPropagation();var n,i,o,e=q(t.calcPoint),r=(n=e,o=!(i=100),u.forEach(function(t,e){if(!z(e)){var r=Math.abs(g[e]-n);(r<i||100===r&&100===i)&&(o=e,i=r)}}),o);if(!1===r)return!1;f.events.snap||ft(y,f.cssClasses.tap,f.animationDuration),rt(r,e,!0,!0),et(),J("slide",r,!0),J("update",r,!0),J("change",r,!0),J("set",r,!0),f.events.snap&&I(t,{handleNumbers:[r]})}function W(t){var e=q(t.calcPoint),r=E.getStep(e),n=E.fromStepping(r);Object.keys(S).forEach(function(t){"hover"===t.split(".")[0]&&S[t].forEach(function(t){t.call(s,n)})})}function $(t,e){S[t]=S[t]||[],S[t].push(e),"update"===t.split(".")[0]&&u.forEach(function(t,e){J("update",e)})}function G(t){var n=t&&t.split(".")[0],i=n&&t.substring(n.length);Object.keys(S).forEach(function(t){var e=t.split(".")[0],r=t.substring(e.length);n&&n!==e||i&&i!==r||delete S[t]})}function J(r,n,i){Object.keys(S).forEach(function(t){var e=t.split(".")[0];r===e&&S[t].forEach(function(t){t.call(s,m.map(f.format.to),n,m.slice(),i||!1,g.slice())})})}function K(t,e,r,n,i,o){return 1<u.length&&!f.events.unconstrained&&(n&&0<e&&(r=Math.max(r,t[e-1]+f.margin)),i&&e<u.length-1&&(r=Math.min(r,t[e+1]-f.margin))),1<u.length&&f.limit&&(n&&0<e&&(r=Math.min(r,t[e-1]+f.limit)),i&&e<u.length-1&&(r=Math.max(r,t[e+1]-f.limit))),f.padding&&(0===e&&(r=Math.max(r,f.padding[0])),e===u.length-1&&(r=Math.min(r,100-f.padding[1]))),!((r=dt(r=E.getStep(r)))===t[e]&&!o)&&r}function Q(t,e){var r=f.ort;return(r?e:t)+", "+(r?t:e)}function Z(t,n,r,e){var i=r.slice(),o=[!t,t],a=[t,!t];e=e.slice(),t&&e.reverse(),1<e.length?e.forEach(function(t,e){var r=K(i,t,i[t]+n,o[e],a[e],!1);!1===r?n=0:(n=r-i[t],i[t]=r)}):o=a=[!0];var s=!1;e.forEach(function(t,e){s=rt(t,r[t]+n,o[e],a[e])||s}),s&&e.forEach(function(t){J("update",t),J("slide",t)})}function tt(t,e){return f.dir?100-t-e:t}function et(){v.forEach(function(t){var e=50<g[t]?-1:1,r=3+(u.length+e*t);u[t].style.zIndex=r})}function rt(t,e,r,n){return!1!==(e=K(g,t,e,r,n,!1))&&(function(t,e){g[t]=e,m[t]=E.fromStepping(e);var r="translate("+Q(tt(e,0)-A+"%","0")+")";u[t].style[f.transformRule]=r,nt(t),nt(t+1)}(t,e),!0)}function nt(t){if(a[t]){var e=0,r=100;0!==t&&(e=g[t-1]),t!==a.length-1&&(r=g[t]);var n=r-e,i="translate("+Q(tt(e,n)+"%","0")+")",o="scale("+Q(n/100,"1")+")";a[t].style[f.transformRule]=i+" "+o}}function it(t,e){return null===t||!1===t||void 0===t?g[e]:("number"==typeof t&&(t=String(t)),t=f.format.from(t),!1===(t=E.toStepping(t))||isNaN(t)?g[e]:t)}function ot(t,e){var r=ht(t),n=void 0===g[0];e=void 0===e||!!e,f.animate&&!n&&ft(y,f.cssClasses.tap,f.animationDuration),v.forEach(function(t){rt(t,it(r[t],t),!0,!1)}),v.forEach(function(t){rt(t,g[t],!0,!0)}),et(),v.forEach(function(t){J("update",t),null!==r[t]&&e&&J("set",t)})}function at(t,e,r){if(!(0<=(t=Number(t))&&t<v.length))throw new Error("noUiSlider ("+ut+"): invalid handle number, got: "+t);rt(t,it(e,t),!0,!0),J("update",t),r&&J("set",t)}function st(){var t=m.map(f.format.to);return 1===t.length?t[0]:t}function lt(t){var e=g[t],r=E.getNearbySteps(e),n=m[t],i=r.thisStep.step,o=null;if(f.snap)return[n-r.stepBefore.startValue||null,r.stepAfter.startValue-n||null];!1!==i&&n+i>r.stepAfter.startValue&&(i=r.stepAfter.startValue-n),o=n>r.thisStep.startValue?r.thisStep.step:!1!==r.stepBefore.step&&n-r.stepBefore.highestStep,100===e?i=null:0===e&&(o=null);var a=E.countStepDecimals();return null!==i&&!1!==i&&(i=Number(i.toFixed(a))),null!==o&&!1!==o&&(o=Number(o.toFixed(a))),[o,i]}return mt(e=y,f.cssClasses.target),0===f.dir?mt(e,f.cssClasses.ltr):mt(e,f.cssClasses.rtl),0===f.ort?mt(e,f.cssClasses.horizontal):mt(e,f.cssClasses.vertical),l=V(e,f.cssClasses.base),function(t,e){var r=V(e,f.cssClasses.connects);u=[],(a=[]).push(O(r,t[0]));for(var n=0;n<f.handles;n++)u.push(M(e,n)),v[n]=n,a.push(O(r,t[n+1]))}(f.connect,l),(p=f.events).fixed||u.forEach(function(t,e){B(d.start,t.children[0],I,{handleNumbers:[e]})}),p.tap&&B(d.start,l,n,{}),p.hover&&B(d.move,l,W,{hover:!0}),p.drag&&a.forEach(function(t,e){if(!1!==t&&0!==e&&e!==a.length-1){var r=u[e-1],n=u[e],i=[t];mt(t,f.cssClasses.draggable),p.fixed&&(i.push(r.children[0]),i.push(n.children[0])),i.forEach(function(t){B(d.start,t,I,{handles:[r,n],handleNumbers:[e-1,e]})})}}),ot(f.start),f.pips&&T(f.pips),f.tooltips&&H(),$("update",function(t,e,a,r,s){v.forEach(function(t){var e=u[t],r=K(g,t,0,!0,!0,!0),n=K(g,t,100,!0,!0,!0),i=s[t],o=f.ariaFormat.to(a[t]);r=E.fromStepping(r).toFixed(1),n=E.fromStepping(n).toFixed(1),i=E.fromStepping(i).toFixed(1),e.children[0].setAttribute("aria-valuemin",r),e.children[0].setAttribute("aria-valuemax",n),e.children[0].setAttribute("aria-valuenow",i),e.children[0].setAttribute("aria-valuetext",o)})}),s={destroy:function(){for(var t in f.cssClasses)f.cssClasses.hasOwnProperty(t)&&gt(y,f.cssClasses[t]);for(;y.firstChild;)y.removeChild(y.firstChild);delete y.noUiSlider},steps:function(){return v.map(lt)},on:$,off:G,get:st,set:ot,setHandle:at,reset:function(t){ot(f.start,t)},__moveHandles:function(t,e,r){Z(t,e,g,r)},options:o,updateOptions:function(e,t){var r=st(),n=["margin","limit","padding","range","animate","snap","step","format","pips","tooltips"];n.forEach(function(t){void 0!==e[t]&&(o[t]=e[t])});var i=bt(o);n.forEach(function(t){void 0!==e[t]&&(f[t]=i[t])}),E=i.spectrum,f.margin=i.margin,f.limit=i.limit,f.padding=i.padding,f.pips?T(f.pips):D(),f.tooltips?H():j(),g=[],ot(e.start||r,t)},target:y,removePips:D,removeTooltips:j,pips:T}}return{__spectrum:l,version:ut,create:function(t,e){if(!t||!t.nodeName)throw new Error("noUiSlider ("+ut+"): create requires a single element, got: "+t);if(t.noUiSlider)throw new Error("noUiSlider ("+ut+"): Slider was already initialized.");var r=z(t,bt(e),e);return t.noUiSlider=r}}});

/*!
 * Datepicker for Bootstrap v1.7.0-dev (https://github.com/uxsolutions/bootstrap-datepicker)
 *
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */

(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function($, undefined) {
  function UTCDate() {
    return new Date(Date.UTC.apply(Date, arguments));
  }

  function UTCToday() {
    var today = new Date();
    return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
  }

  function isUTCEquals(date1, date2) {
    return (
      date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getUTCMonth() === date2.getUTCMonth() &&
      date1.getUTCDate() === date2.getUTCDate()
    );
  }

  function alias(method, deprecationMsg) {
    return function() {
      if (deprecationMsg !== undefined) {
        $.fn.datepicker.deprecated(deprecationMsg);
      }

      return this[method].apply(this, arguments);
    };
  }

  function isValidDate(d) {
    return d && !isNaN(d.getTime());
  }

  var DateArray = (function() {
    var extras = {
      get: function(i) {
        return this.slice(i)[0];
      },
      contains: function(d) {
        // Array.indexOf is not cross-browser;
        // $.inArray doesn't work with Dates
        var val = d && d.valueOf();
        for (var i = 0, l = this.length; i < l; i++)
          // Use date arithmetic to allow dates with different times to match
          if (0 <= this[i].valueOf() - val && this[i].valueOf() - val < 1000 * 60 * 60 * 24)
            return i;
        return -1;
      },
      remove: function(i) {
        this.splice(i, 1);
      },
      replace: function(new_array) {
        if (!new_array)
          return;
        if (!$.isArray(new_array))
          new_array = [new_array];
        this.clear();
        this.push.apply(this, new_array);
      },
      clear: function() {
        this.length = 0;
      },
      copy: function() {
        var a = new DateArray();
        a.replace(this);
        return a;
      }
    };

    return function() {
      var a = [];
      a.push.apply(a, arguments);
      $.extend(a, extras);
      return a;
    };
  })();


  // Picker object

  var Datepicker = function(element, options) {
    $.data(element, 'datepicker', this);
    this._process_options(options);

    this.dates = new DateArray();
    this.viewDate = this.o.defaultViewDate;
    this.focusDate = null;

    this.element = $(element);
    this.isInput = this.element.is('input');
    this.inputField = this.isInput ? this.element : this.element.find('input');
    this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
    if (this.component && this.component.length === 0)
      this.component = false;
    this.isInline = !this.component && this.element.is('div');

    this.picker = $(DPGlobal.template);

    // Checking templates and inserting
    if (this._check_template(this.o.templates.leftArrow)) {
      this.picker.find('.prev').html(this.o.templates.leftArrow);
    }

    if (this._check_template(this.o.templates.rightArrow)) {
      this.picker.find('.next').html(this.o.templates.rightArrow);
    }

    this._buildEvents();
    this._attachEvents();

    if (this.isInline) {
      this.picker.addClass('datepicker-inline').appendTo(this.element);
    } else {
      this.picker.addClass('datepicker-dropdown dropdown-menu');
    }

    if (this.o.rtl) {
      this.picker.addClass('datepicker-rtl');
    }

    if (this.o.calendarWeeks) {
      this.picker.find('.datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear')
        .attr('colspan', function(i, val) {
          return Number(val) + 1;
        });
    }

    this._process_options({
      startDate: this._o.startDate,
      endDate: this._o.endDate,
      daysOfWeekDisabled: this.o.daysOfWeekDisabled,
      daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
      datesDisabled: this.o.datesDisabled
    });

    this._allow_update = false;
    this.setViewMode(this.o.startView);
    this._allow_update = true;

    this.fillDow();
    this.fillMonths();

    this.update();

    if (this.isInline) {
      this.show();
    }
  };

  Datepicker.prototype = {
    constructor: Datepicker,

    _resolveViewName: function(view) {
      $.each(DPGlobal.viewModes, function(i, viewMode) {
        if (view === i || $.inArray(view, viewMode.names) !== -1) {
          view = i;
          return false;
        }
      });

      return view;
    },

    _resolveDaysOfWeek: function(daysOfWeek) {
      if (!$.isArray(daysOfWeek))
        daysOfWeek = daysOfWeek.split(/[,\s]*/);
      return $.map(daysOfWeek, Number);
    },

    _check_template: function(tmp) {
      try {
        // If empty
        if (tmp === undefined || tmp === "") {
          return false;
        }
        // If no html, everything ok
        if ((tmp.match(/[<>]/g) || []).length <= 0) {
          return true;
        }
        // Checking if html is fine
        var jDom = $(tmp);
        return jDom.length > 0;
      } catch (ex) {
        return false;
      }
    },

    _process_options: function(opts) {
      // Store raw options for reference
      this._o = $.extend({}, this._o, opts);
      // Processed options
      var o = this.o = $.extend({}, this._o);

      // Check if "de-DE" style date is available, if not language should
      // fallback to 2 letter code eg "de"
      var lang = o.language;
      if (!dates[lang]) {
        lang = lang.split('-')[0];
        if (!dates[lang])
          lang = defaults.language;
      }
      o.language = lang;

      // Retrieve view index from any aliases
      o.startView = this._resolveViewName(o.startView);
      o.minViewMode = this._resolveViewName(o.minViewMode);
      o.maxViewMode = this._resolveViewName(o.maxViewMode);

      // Check view is between min and max
      o.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, o.startView));

      // true, false, or Number > 0
      if (o.multidate !== true) {
        o.multidate = Number(o.multidate) || false;
        if (o.multidate !== false)
          o.multidate = Math.max(0, o.multidate);
      }
      o.multidateSeparator = String(o.multidateSeparator);

      o.weekStart %= 7;
      o.weekEnd = (o.weekStart + 6) % 7;

      var format = DPGlobal.parseFormat(o.format);
      if (o.startDate !== -Infinity) {
        if (!!o.startDate) {
          if (o.startDate instanceof Date)
            o.startDate = this._local_to_utc(this._zero_time(o.startDate));
          else
            o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
        } else {
          o.startDate = -Infinity;
        }
      }
      if (o.endDate !== Infinity) {
        if (!!o.endDate) {
          if (o.endDate instanceof Date)
            o.endDate = this._local_to_utc(this._zero_time(o.endDate));
          else
            o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
        } else {
          o.endDate = Infinity;
        }
      }

      o.daysOfWeekDisabled = this._resolveDaysOfWeek(o.daysOfWeekDisabled || []);
      o.daysOfWeekHighlighted = this._resolveDaysOfWeek(o.daysOfWeekHighlighted || []);

      o.datesDisabled = o.datesDisabled || [];
      if (!$.isArray(o.datesDisabled)) {
        o.datesDisabled = o.datesDisabled.split(',');
      }
      o.datesDisabled = $.map(o.datesDisabled, function(d) {
        return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
      });

      var plc = String(o.orientation).toLowerCase().split(/\s+/g),
        _plc = o.orientation.toLowerCase();
      plc = $.grep(plc, function(word) {
        return /^auto|left|right|top|bottom$/.test(word);
      });
      o.orientation = {
        x: 'auto',
        y: 'auto'
      };
      if (!_plc || _plc === 'auto')
      ; // no action
      else if (plc.length === 1) {
        switch (plc[0]) {
          case 'top':
          case 'bottom':
            o.orientation.y = plc[0];
            break;
          case 'left':
          case 'right':
            o.orientation.x = plc[0];
            break;
        }
      } else {
        _plc = $.grep(plc, function(word) {
          return /^left|right$/.test(word);
        });
        o.orientation.x = _plc[0] || 'auto';

        _plc = $.grep(plc, function(word) {
          return /^top|bottom$/.test(word);
        });
        o.orientation.y = _plc[0] || 'auto';
      }
      if (o.defaultViewDate instanceof Date || typeof o.defaultViewDate === 'string') {
        o.defaultViewDate = DPGlobal.parseDate(o.defaultViewDate, format, o.language, o.assumeNearbyYear);
      } else if (o.defaultViewDate) {
        var year = o.defaultViewDate.year || new Date().getFullYear();
        var month = o.defaultViewDate.month || 0;
        var day = o.defaultViewDate.day || 1;
        o.defaultViewDate = UTCDate(year, month, day);
      } else {
        o.defaultViewDate = UTCToday();
      }
    },
    _events: [],
    _secondaryEvents: [],
    _applyEvents: function(evs) {
      for (var i = 0, el, ch, ev; i < evs.length; i++) {
        el = evs[i][0];
        if (evs[i].length === 2) {
          ch = undefined;
          ev = evs[i][1];
        } else if (evs[i].length === 3) {
          ch = evs[i][1];
          ev = evs[i][2];
        }
        el.on(ev, ch);
      }
    },
    _unapplyEvents: function(evs) {
      for (var i = 0, el, ev, ch; i < evs.length; i++) {
        el = evs[i][0];
        if (evs[i].length === 2) {
          ch = undefined;
          ev = evs[i][1];
        } else if (evs[i].length === 3) {
          ch = evs[i][1];
          ev = evs[i][2];
        }
        el.off(ev, ch);
      }
    },
    _buildEvents: function() {
      var events = {
        keyup: $.proxy(function(e) {
          if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
            this.update();
        }, this),
        keydown: $.proxy(this.keydown, this),
        paste: $.proxy(this.paste, this)
      };

      if (this.o.showOnFocus === true) {
        events.focus = $.proxy(this.show, this);
      }

      if (this.isInput) { // single input
        this._events = [
          [this.element, events]
        ];
      }
      // component: input + button
      else if (this.component && this.inputField.length) {
        this._events = [
          // For components that are not readonly, allow keyboard nav
          [this.inputField, events],
          [this.component, {
            click: $.proxy(this.show, this)
          }]
        ];
      } else {
        this._events = [
          [this.element, {
            click: $.proxy(this.show, this),
            keydown: $.proxy(this.keydown, this)
          }]
        ];
      }
      this._events.push(
        // Component: listen for blur on element descendants
        [this.element, '*', {
          blur: $.proxy(function(e) {
            this._focused_from = e.target;
          }, this)
        }],
        // Input: listen for blur on element
        [this.element, {
          blur: $.proxy(function(e) {
            this._focused_from = e.target;
          }, this)
        }]
      );

      if (this.o.immediateUpdates) {
        // Trigger input updates immediately on changed year/month
        this._events.push([this.element, {
          'changeYear changeMonth': $.proxy(function(e) {
            this.update(e.date);
          }, this)
        }]);
      }

      this._secondaryEvents = [
        [this.picker, {
          click: $.proxy(this.click, this)
        }],
        [this.picker, '.prev, .next', {
          click: $.proxy(this.navArrowsClick, this)
        }],
        [$(window), {
          resize: $.proxy(this.place, this)
        }],
        [$(document), {
          'mousedown touchstart': $.proxy(function(e) {
            // Clicked outside the datepicker, hide it
            if (!(
                this.element.is(e.target) ||
                this.element.find(e.target).length ||
                this.picker.is(e.target) ||
                this.picker.find(e.target).length ||
                this.isInline
              )) {
              this.hide();
            }
          }, this)
        }]
      ];
    },
    _attachEvents: function() {
      this._detachEvents();
      this._applyEvents(this._events);
    },
    _detachEvents: function() {
      this._unapplyEvents(this._events);
    },
    _attachSecondaryEvents: function() {
      this._detachSecondaryEvents();
      this._applyEvents(this._secondaryEvents);
    },
    _detachSecondaryEvents: function() {
      this._unapplyEvents(this._secondaryEvents);
    },
    _trigger: function(event, altdate) {
      var date = altdate || this.dates.get(-1),
        local_date = this._utc_to_local(date);

      this.element.trigger({
        type: event,
        date: local_date,
        viewMode: this.viewMode,
        dates: $.map(this.dates, this._utc_to_local),
        format: $.proxy(function(ix, format) {
          if (arguments.length === 0) {
            ix = this.dates.length - 1;
            format = this.o.format;
          } else if (typeof ix === 'string') {
            format = ix;
            ix = this.dates.length - 1;
          }
          format = format || this.o.format;
          var date = this.dates.get(ix);
          return DPGlobal.formatDate(date, format, this.o.language);
        }, this)
      });
    },

    show: function() {
      if (this.inputField.prop('disabled') || (this.inputField.prop('readonly') && this.o.enableOnReadonly === false))
        return;
      if (!this.isInline)
        this.picker.appendTo(this.o.container);
      this.place();
      this.picker.show();
      this._attachSecondaryEvents();
      this._trigger('show');
      if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
        $(this.element).blur();
      }
      return this;
    },

    hide: function() {
      if (this.isInline || !this.picker.is(':visible'))
        return this;
      this.focusDate = null;
      this.picker.hide().detach();
      this._detachSecondaryEvents();
      this.setViewMode(this.o.startView);

      if (this.o.forceParse && this.inputField.val())
        this.setValue();
      this._trigger('hide');
      return this;
    },

    destroy: function() {
      this.hide();
      this._detachEvents();
      this._detachSecondaryEvents();
      this.picker.remove();
      delete this.element.data().datepicker;
      if (!this.isInput) {
        delete this.element.data().date;
      }
      return this;
    },

    paste: function(e) {
      var dateString;
      if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types &&
        $.inArray('text/plain', e.originalEvent.clipboardData.types) !== -1) {
        dateString = e.originalEvent.clipboardData.getData('text/plain');
      } else if (window.clipboardData) {
        dateString = window.clipboardData.getData('Text');
      } else {
        return;
      }
      this.setDate(dateString);
      this.update();
      e.preventDefault();
    },

    _utc_to_local: function(utc) {
      if (!utc) {
        return utc;
      }

      var local = new Date(utc.getTime() + (utc.getTimezoneOffset() * 60000));

      if (local.getTimezoneOffset() !== utc.getTimezoneOffset()) {
        local = new Date(utc.getTime() + (local.getTimezoneOffset() * 60000));
      }

      return local;
    },
    _local_to_utc: function(local) {
      return local && new Date(local.getTime() - (local.getTimezoneOffset() * 60000));
    },
    _zero_time: function(local) {
      return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
    },
    _zero_utc_time: function(utc) {
      return utc && UTCDate(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
    },

    getDates: function() {
      return $.map(this.dates, this._utc_to_local);
    },

    getUTCDates: function() {
      return $.map(this.dates, function(d) {
        return new Date(d);
      });
    },

    getDate: function() {
      return this._utc_to_local(this.getUTCDate());
    },

    getUTCDate: function() {
      var selected_date = this.dates.get(-1);
      if (selected_date !== undefined) {
        return new Date(selected_date);
      } else {
        return null;
      }
    },

    clearDates: function() {
      this.inputField.val('');
      this.update();
      this._trigger('changeDate');

      if (this.o.autoclose) {
        this.hide();
      }
    },

    setDates: function() {
      var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
      this.update.apply(this, args);
      this._trigger('changeDate');
      this.setValue();
      return this;
    },

    setUTCDates: function() {
      var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
      this.setDates.apply(this, $.map(args, this._utc_to_local));
      return this;
    },

    setDate: alias('setDates'),
    setUTCDate: alias('setUTCDates'),
    remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead'),

    setValue: function() {
      var formatted = this.getFormattedDate();
      this.inputField.val(formatted);
      return this;
    },

    getFormattedDate: function(format) {
      if (format === undefined)
        format = this.o.format;

      var lang = this.o.language;
      return $.map(this.dates, function(d) {
        return DPGlobal.formatDate(d, format, lang);
      }).join(this.o.multidateSeparator);
    },

    getStartDate: function() {
      return this.o.startDate;
    },

    setStartDate: function(startDate) {
      this._process_options({
        startDate: startDate
      });
      this.update();
      this.updateNavArrows();
      return this;
    },

    getEndDate: function() {
      return this.o.endDate;
    },

    setEndDate: function(endDate) {
      this._process_options({
        endDate: endDate
      });
      this.update();
      this.updateNavArrows();
      return this;
    },

    setDaysOfWeekDisabled: function(daysOfWeekDisabled) {
      this._process_options({
        daysOfWeekDisabled: daysOfWeekDisabled
      });
      this.update();
      return this;
    },

    setDaysOfWeekHighlighted: function(daysOfWeekHighlighted) {
      this._process_options({
        daysOfWeekHighlighted: daysOfWeekHighlighted
      });
      this.update();
      return this;
    },

    setDatesDisabled: function(datesDisabled) {
      this._process_options({
        datesDisabled: datesDisabled
      });
      this.update();
      return this;
    },

    place: function() {
      if (this.isInline)
        return this;
      var calendarWidth = this.picker.outerWidth(),
        calendarHeight = this.picker.outerHeight(),
        visualPadding = 10,
        container = $(this.o.container),
        windowWidth = container.width(),
        scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
        appendOffset = container.offset();

      var parentsZindex = [0];
      this.element.parents().each(function() {
        var itemZIndex = $(this).css('z-index');
        if (itemZIndex !== 'auto' && Number(itemZIndex) !== 0) parentsZindex.push(Number(itemZIndex));
      });
      var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
      var offset = this.component ? this.component.parent().offset() : this.element.offset();
      var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
      var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
      var left = offset.left - appendOffset.left;
      var top = offset.top - appendOffset.top;

      if (this.o.container !== 'body') {
        top += scrollTop;
      }

      this.picker.removeClass(
        'datepicker-orient-top datepicker-orient-bottom ' +
        'datepicker-orient-right datepicker-orient-left'
      );

      if (this.o.orientation.x !== 'auto') {
        this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
        if (this.o.orientation.x === 'right')
          left -= calendarWidth - width;
      }
      // auto x orientation is best-placement: if it crosses a window
      // edge, fudge it sideways
      else {
        if (offset.left < 0) {
          // component is outside the window on the left side. Move it into visible range
          this.picker.addClass('datepicker-orient-left');
          left -= offset.left - visualPadding;
        } else if (left + calendarWidth > windowWidth) {
          // the calendar passes the widow right edge. Align it to component right side
          this.picker.addClass('datepicker-orient-right');
          left += width - calendarWidth;
        } else {
          if (this.o.rtl) {
            // Default to right
            this.picker.addClass('datepicker-orient-right');
          } else {
            // Default to left
            this.picker.addClass('datepicker-orient-left');
          }
        }
      }

      // auto y orientation is best-situation: top or bottom, no fudging,
      // decision based on which shows more of the calendar
      var yorient = this.o.orientation.y,
        top_overflow;
      if (yorient === 'auto') {
        top_overflow = -scrollTop + top - calendarHeight;
        yorient = top_overflow < 0 ? 'bottom' : 'top';
      }

      this.picker.addClass('datepicker-orient-' + yorient);
      if (yorient === 'top')
        top -= calendarHeight + parseInt(this.picker.css('padding-top'));
      else
        top += height;

      if (this.o.rtl) {
        var right = windowWidth - (left + width);
        this.picker.css({
          top: top,
          right: right,
          zIndex: zIndex
        });
      } else {
        this.picker.css({
          top: top,
          left: left,
          zIndex: zIndex
        });
      }
      return this;
    },

    _allow_update: true,
    update: function() {
      if (!this._allow_update)
        return this;

      var oldDates = this.dates.copy(),
        dates = [],
        fromArgs = false;
      if (arguments.length) {
        $.each(arguments, $.proxy(function(i, date) {
          if (date instanceof Date)
            date = this._local_to_utc(date);
          dates.push(date);
        }, this));
        fromArgs = true;
      } else {
        dates = this.isInput ?
          this.element.val() :
          this.element.data('date') || this.inputField.val();
        if (dates && this.o.multidate)
          dates = dates.split(this.o.multidateSeparator);
        else
          dates = [dates];
        delete this.element.data().date;
      }

      dates = $.map(dates, $.proxy(function(date) {
        return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
      }, this));
      dates = $.grep(dates, $.proxy(function(date) {
        return (!this.dateWithinRange(date) ||
          !date
        );
      }, this), true);
      this.dates.replace(dates);

      if (this.o.updateViewDate) {
        if (this.dates.length)
          this.viewDate = new Date(this.dates.get(-1));
        else if (this.viewDate < this.o.startDate)
          this.viewDate = new Date(this.o.startDate);
        else if (this.viewDate > this.o.endDate)
          this.viewDate = new Date(this.o.endDate);
        else
          this.viewDate = this.o.defaultViewDate;
      }

      if (fromArgs) {
        // setting date by clicking
        this.setValue();
        this.element.change();
      } else if (this.dates.length) {
        // setting date by typing
        if (typeof this.o.format === 'string') {
          if ((String(this.element[0].value).length === String(this.o.format).length) && (String(oldDates) !== String(this.dates)))
            this._trigger('changeDate');
          this.element.change();
        } else if (String(oldDates) !== String(this.dates)) {
          this._trigger('changeDate');
          this.element.change();
        }
      }
      if (!this.dates.length && oldDates.length) {
        this._trigger('clearDate');
        this.element.change();
      }

      this.fill();
      return this;
    },

    fillDow: function() {
      var dowCnt = this.o.weekStart,
        html = '<tr>';
      if (this.o.calendarWeeks) {
        html += '<th class="cw">&#160;</th>';
      }
      while (dowCnt < this.o.weekStart + 7) {
        html += '<th class="dow';
        if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) !== -1)
          html += ' disabled';
        html += '">' + dates[this.o.language].daysMin[(dowCnt++) % 7] + '</th>';
      }
      html += '</tr>';
      this.picker.find('.datepicker-days thead').append(html);
    },

    fillMonths: function() {
      var localDate = this._utc_to_local(this.viewDate);
      var html = '';
      var focused;
      for (var i = 0; i < 12; i++) {
        focused = localDate && localDate.getMonth() === i ? ' focused' : '';
        html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i] + '</span>';
      }
      this.picker.find('.datepicker-months td').html(html);
    },

    setRange: function(range) {
      if (!range || !range.length)
        delete this.range;
      else
        this.range = $.map(range, function(d) {
          return d.valueOf();
        });
      this.fill();
    },

    getClassNames: function(date) {
      var cls = [],
        year = this.viewDate.getUTCFullYear(),
        month = this.viewDate.getUTCMonth(),
        today = UTCToday();
      if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)) {
        cls.push('old');
      } else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)) {
        cls.push('new');
      }
      if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
        cls.push('focused');
      // Compare internal UTC date with UTC today, not local today
      if (this.o.todayHighlight && isUTCEquals(date, today)) {
        cls.push('today');
      }
      if (this.dates.contains(date) !== -1)
        cls.push('active');
      if (!this.dateWithinRange(date)) {
        cls.push('disabled');
      }
      if (this.dateIsDisabled(date)) {
        cls.push('disabled', 'disabled-date');
      }
      if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1) {
        cls.push('highlighted');
      }

      if (this.range) {
        if (date > this.range[0] && date < this.range[this.range.length - 1]) {
          cls.push('range');
        }
        if ($.inArray(date.valueOf(), this.range) !== -1) {
          cls.push('selected');
        }
        if (date.valueOf() === this.range[0]) {
          cls.push('range-start');
        }
        if (date.valueOf() === this.range[this.range.length - 1]) {
          cls.push('range-end');
        }
      }
      return cls;
    },

    _fill_yearsView: function(selector, cssClass, factor, year, startYear, endYear, beforeFn) {
      var html = '';
      var step = factor / 10;
      var view = this.picker.find(selector);
      var startVal = Math.floor(year / factor) * factor;
      var endVal = startVal + step * 9;
      var focusedVal = Math.floor(this.viewDate.getFullYear() / step) * step;
      var selected = $.map(this.dates, function(d) {
        return Math.floor(d.getUTCFullYear() / step) * step;
      });

      var classes, tooltip, before;
      for (var currVal = startVal - step; currVal <= endVal + step; currVal += step) {
        classes = [cssClass];
        tooltip = null;

        if (currVal === startVal - step) {
          classes.push('old');
        } else if (currVal === endVal + step) {
          classes.push('new');
        }
        if ($.inArray(currVal, selected) !== -1) {
          classes.push('active');
        }
        if (currVal < startYear || currVal > endYear) {
          classes.push('disabled');
        }
        if (currVal === focusedVal) {
          classes.push('focused');
        }

        if (beforeFn !== $.noop) {
          before = beforeFn(new Date(currVal, 0, 1));
          if (before === undefined) {
            before = {};
          } else if (typeof before === 'boolean') {
            before = {
              enabled: before
            };
          } else if (typeof before === 'string') {
            before = {
              classes: before
            };
          }
          if (before.enabled === false) {
            classes.push('disabled');
          }
          if (before.classes) {
            classes = classes.concat(before.classes.split(/\s+/));
          }
          if (before.tooltip) {
            tooltip = before.tooltip;
          }
        }

        html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + currVal + '</span>';
      }

      view.find('.datepicker-switch').text(startVal + '-' + endVal);
      view.find('td').html(html);
    },

    fill: function() {
      var d = new Date(this.viewDate),
        year = d.getUTCFullYear(),
        month = d.getUTCMonth(),
        startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
        startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
        endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
        endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
        todaytxt = dates[this.o.language].today || dates['en'].today || '',
        cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
        titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
        tooltip,
        before;
      if (isNaN(year) || isNaN(month))
        return;
      this.picker.find('.datepicker-days .datepicker-switch')
        .text(DPGlobal.formatDate(d, titleFormat, this.o.language));
      this.picker.find('tfoot .today')
        .text(todaytxt)
        .toggle(this.o.todayBtn !== false);
      this.picker.find('tfoot .clear')
        .text(cleartxt)
        .toggle(this.o.clearBtn !== false);
      this.picker.find('thead .datepicker-title')
        .text(this.o.title)
        .toggle(this.o.title !== '');
      this.updateNavArrows();
      this.fillMonths();
      var prevMonth = UTCDate(year, month, 0),
        day = prevMonth.getUTCDate();
      prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
      var nextMonth = new Date(prevMonth);
      if (prevMonth.getUTCFullYear() < 100) {
        nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
      }
      nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
      nextMonth = nextMonth.valueOf();
      var html = [];
      var weekDay, clsName;
      while (prevMonth.valueOf() < nextMonth) {
        weekDay = prevMonth.getUTCDay();
        if (weekDay === this.o.weekStart) {
          html.push('<tr>');
          if (this.o.calendarWeeks) {
            // ISO 8601: First week contains first thursday.
            // ISO also states week starts on Monday, but we can be more abstract here.
            var
              // Start of current week: based on weekstart/current date
              ws = new Date(+prevMonth + (this.o.weekStart - weekDay - 7) % 7 * 864e5),
              // Thursday of this week
              th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
              // First Thursday of year, year from thursday
              yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5),
              // Calendar week: ms between thursdays, div ms per day, div 7 days
              calWeek = (th - yth) / 864e5 / 7 + 1;
            html.push('<td class="cw">' + calWeek + '</td>');
          }
        }
        clsName = this.getClassNames(prevMonth);
        clsName.push('day');

        if (this.o.beforeShowDay !== $.noop) {
          before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
          if (before === undefined)
            before = {};
          else if (typeof before === 'boolean')
            before = {
              enabled: before
            };
          else if (typeof before === 'string')
            before = {
              classes: before
            };
          if (before.enabled === false)
            clsName.push('disabled');
          if (before.classes)
            clsName = clsName.concat(before.classes.split(/\s+/));
          if (before.tooltip)
            tooltip = before.tooltip;
        }

        //Check if uniqueSort exists (supported by jquery >=1.12 and >=2.2)
        //Fallback to unique function for older jquery versions
        if ($.isFunction($.uniqueSort)) {
          clsName = $.uniqueSort(clsName);
        } else {
          clsName = $.unique(clsName);
        }

        // Creative Tim - we added a div inside each td for design purposes
        html.push('<td class="' + clsName.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + (this.o.dateCells ? ' data-date="' + prevMonth.getTime().toString() + '"' : '') + '><div>' + prevMonth.getUTCDate() + '</div></td>');
        tooltip = null;
        if (weekDay === this.o.weekEnd) {
          html.push('</tr>');
        }
        prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
      }
      this.picker.find('.datepicker-days tbody').html(html.join(''));

      var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
      var months = this.picker.find('.datepicker-months')
        .find('.datepicker-switch')
        .text(this.o.maxViewMode < 2 ? monthsTitle : year)
        .end()
        .find('tbody span').removeClass('active');

      $.each(this.dates, function(i, d) {
        if (d.getUTCFullYear() === year)
          months.eq(d.getUTCMonth()).addClass('active');
      });

      if (year < startYear || year > endYear) {
        months.addClass('disabled');
      }
      if (year === startYear) {
        months.slice(0, startMonth).addClass('disabled');
      }
      if (year === endYear) {
        months.slice(endMonth + 1).addClass('disabled');
      }

      if (this.o.beforeShowMonth !== $.noop) {
        var that = this;
        $.each(months, function(i, month) {
          var moDate = new Date(year, i, 1);
          var before = that.o.beforeShowMonth(moDate);
          if (before === undefined)
            before = {};
          else if (typeof before === 'boolean')
            before = {
              enabled: before
            };
          else if (typeof before === 'string')
            before = {
              classes: before
            };
          if (before.enabled === false && !$(month).hasClass('disabled'))
            $(month).addClass('disabled');
          if (before.classes)
            $(month).addClass(before.classes);
          if (before.tooltip)
            $(month).prop('title', before.tooltip);
        });
      }

      // Generating decade/years picker
      this._fill_yearsView(
        '.datepicker-years',
        'year',
        10,
        year,
        startYear,
        endYear,
        this.o.beforeShowYear
      );

      // Generating century/decades picker
      this._fill_yearsView(
        '.datepicker-decades',
        'decade',
        100,
        year,
        startYear,
        endYear,
        this.o.beforeShowDecade
      );

      // Generating millennium/centuries picker
      this._fill_yearsView(
        '.datepicker-centuries',
        'century',
        1000,
        year,
        startYear,
        endYear,
        this.o.beforeShowCentury
      );
    },

    updateNavArrows: function() {
      if (!this._allow_update)
        return;

      var d = new Date(this.viewDate),
        year = d.getUTCFullYear(),
        month = d.getUTCMonth(),
        startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
        startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
        endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
        endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
        prevIsDisabled,
        nextIsDisabled,
        factor = 1;
      switch (this.viewMode) {
        case 0:
          prevIsDisabled = year <= startYear && month <= startMonth;
          nextIsDisabled = year >= endYear && month >= endMonth;
          break;
        case 4:
          factor *= 10;
          /* falls through */
        case 3:
          factor *= 10;
          /* falls through */
        case 2:
          factor *= 10;
          /* falls through */
        case 1:
          prevIsDisabled = Math.floor(year / factor) * factor <= startYear;
          nextIsDisabled = Math.floor(year / factor) * factor + factor >= endYear;
          break;
      }

      this.picker.find('.prev').toggleClass('disabled', prevIsDisabled);
      this.picker.find('.next').toggleClass('disabled', nextIsDisabled);
    },

    click: function(e) {
      e.preventDefault();
      e.stopPropagation();

      var target, dir, day, year, month;
      target = $(e.target);

      // Clicked on the switch
      if (target.hasClass('datepicker-switch') && this.viewMode !== this.o.maxViewMode) {
        this.setViewMode(this.viewMode + 1);
      }

      // Clicked on today button
      if (target.hasClass('today') && !target.hasClass('day')) {
        this.setViewMode(0);
        this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
      }

      // Clicked on clear button
      if (target.hasClass('clear')) {
        this.clearDates();
      }

      if (!target.hasClass('disabled')) {
        // Clicked on a day
        if (target.hasClass('day')) {
          day = Number(target.text());
          year = this.viewDate.getUTCFullYear();
          month = this.viewDate.getUTCMonth();

          if (target.hasClass('old') || target.hasClass('new')) {
            dir = target.hasClass('old') ? -1 : 1;
            month = (month + dir + 12) % 12;
            if ((dir === -1 && month === 11) || (dir === 1 && month === 0)) {
              year += dir;
              if (this.o.updateViewDate) {
                this._trigger('changeYear', this.viewDate);
              }
            }
            if (this.o.updateViewDate) {
              this._trigger('changeMonth', this.viewDate);
            }
          }
          this._setDate(UTCDate(year, month, day));
        }

        // Clicked on a month, year, decade, century
        if (target.hasClass('month') ||
          target.hasClass('year') ||
          target.hasClass('decade') ||
          target.hasClass('century')) {
          this.viewDate.setUTCDate(1);

          day = 1;
          if (this.viewMode === 1) {
            month = target.parent().find('span').index(target);
            year = this.viewDate.getUTCFullYear();
            this.viewDate.setUTCMonth(month);
          } else {
            month = 0;
            year = Number(target.text());
            this.viewDate.setUTCFullYear(year);
          }

          this._trigger(DPGlobal.viewModes[this.viewMode - 1].e, this.viewDate);

          if (this.viewMode === this.o.minViewMode) {
            this._setDate(UTCDate(year, month, day));
          } else {
            this.setViewMode(this.viewMode - 1);
            this.fill();
          }
        }
      }

      if (this.picker.is(':visible') && this._focused_from) {
        this._focused_from.focus();
      }
      delete this._focused_from;
    },

    // Clicked on prev or next
    navArrowsClick: function(e) {
      var target = $(e.target);
      var dir = target.hasClass('prev') ? -1 : 1;
      if (this.viewMode !== 0) {
        dir *= DPGlobal.viewModes[this.viewMode].navStep * 12;
      }
      this.viewDate = this.moveMonth(this.viewDate, dir);
      this._trigger(DPGlobal.viewModes[this.viewMode].e, this.viewDate);
      this.fill();
    },

    _toggle_multidate: function(date) {
      var ix = this.dates.contains(date);
      if (!date) {
        this.dates.clear();
      }

      if (ix !== -1) {
        if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive) {
          this.dates.remove(ix);
        }
      } else if (this.o.multidate === false) {
        this.dates.clear();
        this.dates.push(date);
      } else {
        this.dates.push(date);
      }

      if (typeof this.o.multidate === 'number')
        while (this.dates.length > this.o.multidate)
          this.dates.remove(0);
    },

    _setDate: function(date, which) {
      if (!which || which === 'date')
        this._toggle_multidate(date && new Date(date));
      if ((!which && this.o.updateViewDate) || which === 'view')
        this.viewDate = date && new Date(date);

      this.fill();
      this.setValue();
      if (!which || which !== 'view') {
        this._trigger('changeDate');
      }
      this.inputField.trigger('change');
      if (this.o.autoclose && (!which || which === 'date')) {
        this.hide();
      }
    },

    moveDay: function(date, dir) {
      var newDate = new Date(date);
      newDate.setUTCDate(date.getUTCDate() + dir);

      return newDate;
    },

    moveWeek: function(date, dir) {
      return this.moveDay(date, dir * 7);
    },

    moveMonth: function(date, dir) {
      if (!isValidDate(date))
        return this.o.defaultViewDate;
      if (!dir)
        return date;
      var new_date = new Date(date.valueOf()),
        day = new_date.getUTCDate(),
        month = new_date.getUTCMonth(),
        mag = Math.abs(dir),
        new_month, test;
      dir = dir > 0 ? 1 : -1;
      if (mag === 1) {
        test = dir === -1
          // If going back one month, make sure month is not current month
          // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
          ?
          function() {
            return new_date.getUTCMonth() === month;
          }
          // If going forward one month, make sure month is as expected
          // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
          :
          function() {
            return new_date.getUTCMonth() !== new_month;
          };
        new_month = month + dir;
        new_date.setUTCMonth(new_month);
        // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
        new_month = (new_month + 12) % 12;
      } else {
        // For magnitudes >1, move one month at a time...
        for (var i = 0; i < mag; i++)
          // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
          new_date = this.moveMonth(new_date, dir);
        // ...then reset the day, keeping it in the new month
        new_month = new_date.getUTCMonth();
        new_date.setUTCDate(day);
        test = function() {
          return new_month !== new_date.getUTCMonth();
        };
      }
      // Common date-resetting loop -- if date is beyond end of month, make it
      // end of month
      while (test()) {
        new_date.setUTCDate(--day);
        new_date.setUTCMonth(new_month);
      }
      return new_date;
    },

    moveYear: function(date, dir) {
      return this.moveMonth(date, dir * 12);
    },

    moveAvailableDate: function(date, dir, fn) {
      do {
        date = this[fn](date, dir);

        if (!this.dateWithinRange(date))
          return false;

        fn = 'moveDay';
      }
      while (this.dateIsDisabled(date));

      return date;
    },

    weekOfDateIsDisabled: function(date) {
      return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
    },

    dateIsDisabled: function(date) {
      return (
        this.weekOfDateIsDisabled(date) ||
        $.grep(this.o.datesDisabled, function(d) {
          return isUTCEquals(date, d);
        }).length > 0
      );
    },

    dateWithinRange: function(date) {
      return date >= this.o.startDate && date <= this.o.endDate;
    },

    keydown: function(e) {
      if (!this.picker.is(':visible')) {
        if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker
          this.show();
          e.stopPropagation();
        }
        return;
      }
      var dateChanged = false,
        dir, newViewDate,
        focusDate = this.focusDate || this.viewDate;
      switch (e.keyCode) {
        case 27: // escape
          if (this.focusDate) {
            this.focusDate = null;
            this.viewDate = this.dates.get(-1) || this.viewDate;
            this.fill();
          } else
            this.hide();
          e.preventDefault();
          e.stopPropagation();
          break;
        case 37: // left
        case 38: // up
        case 39: // right
        case 40: // down
          if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
            break;
          dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
          if (this.viewMode === 0) {
            if (e.ctrlKey) {
              newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');

              if (newViewDate)
                this._trigger('changeYear', this.viewDate);
            } else if (e.shiftKey) {
              newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');

              if (newViewDate)
                this._trigger('changeMonth', this.viewDate);
            } else if (e.keyCode === 37 || e.keyCode === 39) {
              newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
            } else if (!this.weekOfDateIsDisabled(focusDate)) {
              newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
            }
          } else if (this.viewMode === 1) {
            if (e.keyCode === 38 || e.keyCode === 40) {
              dir = dir * 4;
            }
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
          } else if (this.viewMode === 2) {
            if (e.keyCode === 38 || e.keyCode === 40) {
              dir = dir * 4;
            }
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
          }
          if (newViewDate) {
            this.focusDate = this.viewDate = newViewDate;
            this.setValue();
            this.fill();
            e.preventDefault();
          }
          break;
        case 13: // enter
          if (!this.o.forceParse)
            break;
          focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
          if (this.o.keyboardNavigation) {
            this._toggle_multidate(focusDate);
            dateChanged = true;
          }
          this.focusDate = null;
          this.viewDate = this.dates.get(-1) || this.viewDate;
          this.setValue();
          this.fill();
          if (this.picker.is(':visible')) {
            e.preventDefault();
            e.stopPropagation();
            if (this.o.autoclose)
              this.hide();
          }
          break;
        case 9: // tab
          this.focusDate = null;
          this.viewDate = this.dates.get(-1) || this.viewDate;
          this.fill();
          this.hide();
          break;
      }
      if (dateChanged) {
        if (this.dates.length)
          this._trigger('changeDate');
        else
          this._trigger('clearDate');
        this.inputField.trigger('change');
      }
    },

    setViewMode: function(viewMode) {
      this.viewMode = viewMode;
      this.picker
        .children('div')
        .hide()
        .filter('.datepicker-' + DPGlobal.viewModes[this.viewMode].clsName)
        .show();
      this.updateNavArrows();
      this._trigger('changeViewMode', new Date(this.viewDate));
    }
  };

  var DateRangePicker = function(element, options) {
    $.data(element, 'datepicker', this);
    this.element = $(element);
    this.inputs = $.map(options.inputs, function(i) {
      return i.jquery ? i[0] : i;
    });
    delete options.inputs;

    this.keepEmptyValues = options.keepEmptyValues;
    delete options.keepEmptyValues;

    datepickerPlugin.call($(this.inputs), options)
      .on('changeDate', $.proxy(this.dateUpdated, this));

    this.pickers = $.map(this.inputs, function(i) {
      return $.data(i, 'datepicker');
    });
    this.updateDates();
  };
  DateRangePicker.prototype = {
    updateDates: function() {
      this.dates = $.map(this.pickers, function(i) {
        return i.getUTCDate();
      });
      this.updateRanges();
    },
    updateRanges: function() {
      var range = $.map(this.dates, function(d) {
        return d.valueOf();
      });
      $.each(this.pickers, function(i, p) {
        p.setRange(range);
      });
    },
    dateUpdated: function(e) {
      // `this.updating` is a workaround for preventing infinite recursion
      // between `changeDate` triggering and `setUTCDate` calling.  Until
      // there is a better mechanism.
      if (this.updating)
        return;
      this.updating = true;

      var dp = $.data(e.target, 'datepicker');

      if (dp === undefined) {
        return;
      }

      var new_date = dp.getUTCDate(),
        keep_empty_values = this.keepEmptyValues,
        i = $.inArray(e.target, this.inputs),
        j = i - 1,
        k = i + 1,
        l = this.inputs.length;
      if (i === -1)
        return;

      $.each(this.pickers, function(i, p) {
        if (!p.getUTCDate() && (p === dp || !keep_empty_values))
          p.setUTCDate(new_date);
      });

      if (new_date < this.dates[j]) {
        // Date being moved earlier/left
        while (j >= 0 && new_date < this.dates[j]) {
          this.pickers[j--].setUTCDate(new_date);
        }
      } else if (new_date > this.dates[k]) {
        // Date being moved later/right
        while (k < l && new_date > this.dates[k]) {
          this.pickers[k++].setUTCDate(new_date);
        }
      }
      this.updateDates();

      delete this.updating;
    },
    destroy: function() {
      $.map(this.pickers, function(p) {
        p.destroy();
      });
      $(this.inputs).off('changeDate', this.dateUpdated);
      delete this.element.data().datepicker;
    },
    remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead')
  };

  function opts_from_el(el, prefix) {
    // Derive options from element data-attrs
    var data = $(el).data(),
      out = {},
      inkey,
      replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
    prefix = new RegExp('^' + prefix.toLowerCase());

    function re_lower(_, a) {
      return a.toLowerCase();
    }
    for (var key in data)
      if (prefix.test(key)) {
        inkey = key.replace(replace, re_lower);
        out[inkey] = data[key];
      }
    return out;
  }

  function opts_from_locale(lang) {
    // Derive options from locale plugins
    var out = {};
    // Check if "de-DE" style date is available, if not language should
    // fallback to 2 letter code eg "de"
    if (!dates[lang]) {
      lang = lang.split('-')[0];
      if (!dates[lang])
        return;
    }
    var d = dates[lang];
    $.each(locale_opts, function(i, k) {
      if (k in d)
        out[k] = d[k];
    });
    return out;
  }

  var old = $.fn.datepicker;
  var datepickerPlugin = function(option) {
    var args = Array.apply(null, arguments);
    args.shift();
    var internal_return;
    this.each(function() {
      var $this = $(this),
        data = $this.data('datepicker'),
        options = typeof option === 'object' && option;
      if (!data) {
        var elopts = opts_from_el(this, 'date'),
          // Preliminary otions
          xopts = $.extend({}, defaults, elopts, options),
          locopts = opts_from_locale(xopts.language),
          // Options priority: js args, data-attrs, locales, defaults
          opts = $.extend({}, defaults, locopts, elopts, options);
        if ($this.hasClass('input-daterange') || opts.inputs) {
          $.extend(opts, {
            inputs: opts.inputs || $this.find('input').toArray()
          });
          data = new DateRangePicker(this, opts);
        } else {
          data = new Datepicker(this, opts);
        }
        $this.data('datepicker', data);
      }
      if (typeof option === 'string' && typeof data[option] === 'function') {
        internal_return = data[option].apply(data, args);
      }
    });

    if (
      internal_return === undefined ||
      internal_return instanceof Datepicker ||
      internal_return instanceof DateRangePicker
    )
      return this;

    if (this.length > 1)
      throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
    else
      return internal_return;
  };
  $.fn.datepicker = datepickerPlugin;

  var defaults = $.fn.datepicker.defaults = {
    assumeNearbyYear: false,
    autoclose: false,
    beforeShowDay: $.noop,
    beforeShowMonth: $.noop,
    beforeShowYear: $.noop,
    beforeShowDecade: $.noop,
    beforeShowCentury: $.noop,
    calendarWeeks: false,
    clearBtn: false,
    toggleActive: false,
    daysOfWeekDisabled: [],
    daysOfWeekHighlighted: [],
    datesDisabled: [],
    endDate: Infinity,
    forceParse: true,
    format: 'mm/dd/yyyy',
    keepEmptyValues: false,
    keyboardNavigation: true,
    language: 'en',
    minViewMode: 0,
    maxViewMode: 4,
    multidate: false,
    multidateSeparator: ',',
    orientation: "auto",
    rtl: false,
    startDate: -Infinity,
    startView: 0,
    todayBtn: false,
    todayHighlight: false,
    updateViewDate: true,
    weekStart: 0,
    disableTouchKeyboard: false,
    enableOnReadonly: true,
    showOnFocus: true,
    zIndexOffset: 10,
    container: 'body',
    immediateUpdates: false,
    dateCells: false,
    title: '',
    templates: {
      leftArrow: '&#x00AB;',
      rightArrow: '&#x00BB;'
    }
  };
  var locale_opts = $.fn.datepicker.locale_opts = [
    'format',
    'rtl',
    'weekStart'
  ];
  $.fn.datepicker.Constructor = Datepicker;
  var dates = $.fn.datepicker.dates = {
    en: {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: "Today",
      clear: "Clear",
      titleFormat: "MM yyyy"
    }
  };

  var DPGlobal = {
    viewModes: [{
        names: ['days', 'month'],
        clsName: 'days',
        e: 'changeMonth'
      },
      {
        names: ['months', 'year'],
        clsName: 'months',
        e: 'changeYear',
        navStep: 1
      },
      {
        names: ['years', 'decade'],
        clsName: 'years',
        e: 'changeDecade',
        navStep: 10
      },
      {
        names: ['decades', 'century'],
        clsName: 'decades',
        e: 'changeCentury',
        navStep: 100
      },
      {
        names: ['centuries', 'millennium'],
        clsName: 'centuries',
        e: 'changeMillennium',
        navStep: 1000
      }
    ],
    validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
    nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
    parseFormat: function(format) {
      if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
        return format;
      // IE treats \0 as a string end in inputs (truncating the value),
      // so it's a bad format delimiter, anyway
      var separators = format.replace(this.validParts, '\0').split('\0'),
        parts = format.match(this.validParts);
      if (!separators || !separators.length || !parts || parts.length === 0) {
        throw new Error("Invalid date format.");
      }
      return {
        separators: separators,
        parts: parts
      };
    },
    parseDate: function(date, format, language, assumeNearby) {
      if (!date)
        return undefined;
      if (date instanceof Date)
        return date;
      if (typeof format === 'string')
        format = DPGlobal.parseFormat(format);
      if (format.toValue)
        return format.toValue(date, format, language);
      var fn_map = {
          d: 'moveDay',
          m: 'moveMonth',
          w: 'moveWeek',
          y: 'moveYear'
        },
        dateAliases = {
          yesterday: '-1d',
          today: '+0d',
          tomorrow: '+1d'
        },
        parts, part, dir, i, fn;
      if (date in dateAliases) {
        date = dateAliases[date];
      }
      if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(date)) {
        parts = date.match(/([\-+]\d+)([dmwy])/gi);
        date = new Date();
        for (i = 0; i < parts.length; i++) {
          part = parts[i].match(/([\-+]\d+)([dmwy])/i);
          dir = Number(part[1]);
          fn = fn_map[part[2].toLowerCase()];
          date = Datepicker.prototype[fn](date, dir);
        }
        return Datepicker.prototype._zero_utc_time(date);
      }

      parts = date && date.match(this.nonpunctuation) || [];

      function applyNearbyYear(year, threshold) {
        if (threshold === true)
          threshold = 10;

        // if year is 2 digits or less, than the user most likely is trying to get a recent century
        if (year < 100) {
          year += 2000;
          // if the new year is more than threshold years in advance, use last century
          if (year > ((new Date()).getFullYear() + threshold)) {
            year -= 100;
          }
        }

        return year;
      }

      var parsed = {},
        setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
        setters_map = {
          yyyy: function(d, v) {
            return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
          },
          m: function(d, v) {
            if (isNaN(d))
              return d;
            v -= 1;
            while (v < 0) v += 12;
            v %= 12;
            d.setUTCMonth(v);
            while (d.getUTCMonth() !== v)
              d.setUTCDate(d.getUTCDate() - 1);
            return d;
          },
          d: function(d, v) {
            return d.setUTCDate(v);
          }
        },
        val, filtered;
      setters_map['yy'] = setters_map['yyyy'];
      setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
      setters_map['dd'] = setters_map['d'];
      date = UTCToday();
      var fparts = format.parts.slice();
      // Remove noop parts
      if (parts.length !== fparts.length) {
        fparts = $(fparts).filter(function(i, p) {
          return $.inArray(p, setters_order) !== -1;
        }).toArray();
      }
      // Process remainder
      function match_part() {
        var m = this.slice(0, parts[i].length),
          p = parts[i].slice(0, m.length);
        return m.toLowerCase() === p.toLowerCase();
      }
      if (parts.length === fparts.length) {
        var cnt;
        for (i = 0, cnt = fparts.length; i < cnt; i++) {
          val = parseInt(parts[i], 10);
          part = fparts[i];
          if (isNaN(val)) {
            switch (part) {
              case 'MM':
                filtered = $(dates[language].months).filter(match_part);
                val = $.inArray(filtered[0], dates[language].months) + 1;
                break;
              case 'M':
                filtered = $(dates[language].monthsShort).filter(match_part);
                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                break;
            }
          }
          parsed[part] = val;
        }
        var _date, s;
        for (i = 0; i < setters_order.length; i++) {
          s = setters_order[i];
          if (s in parsed && !isNaN(parsed[s])) {
            _date = new Date(date);
            setters_map[s](_date, parsed[s]);
            if (!isNaN(_date))
              date = _date;
          }
        }
      }
      return date;
    },
    formatDate: function(date, format, language) {
      if (!date)
        return '';
      if (typeof format === 'string')
        format = DPGlobal.parseFormat(format);
      if (format.toDisplay)
        return format.toDisplay(date, format, language);
      var val = {
        d: date.getUTCDate(),
        D: dates[language].daysShort[date.getUTCDay()],
        DD: dates[language].days[date.getUTCDay()],
        m: date.getUTCMonth() + 1,
        M: dates[language].monthsShort[date.getUTCMonth()],
        MM: dates[language].months[date.getUTCMonth()],
        yy: date.getUTCFullYear().toString().substring(2),
        yyyy: date.getUTCFullYear()
      };
      val.dd = (val.d < 10 ? '0' : '') + val.d;
      val.mm = (val.m < 10 ? '0' : '') + val.m;
      date = [];
      var seps = $.extend([], format.separators);
      for (var i = 0, cnt = format.parts.length; i <= cnt; i++) {
        if (seps.length)
          date.push(seps.shift());
        date.push(val[format.parts[i]]);
      }
      return date.join('');
    },
    headTemplate: '<thead>' +
      '<tr>' +
      '<th colspan="7" class="datepicker-title"></th>' +
      '</tr>' +
      '<tr>' +
      '<th class="prev">&laquo;</th>' +
      '<th colspan="5" class="datepicker-switch"></th>' +
      '<th class="next">&raquo;</th>' +
      '</tr>' +
      '</thead>',
    contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
    footTemplate: '<tfoot>' +
      '<tr>' +
      '<th colspan="7" class="today"></th>' +
      '</tr>' +
      '<tr>' +
      '<th colspan="7" class="clear"></th>' +
      '</tr>' +
      '</tfoot>'
  };
  DPGlobal.template = '<div class="datepicker">' +
    '<div class="datepicker-days">' +
    '<table class="table-condensed">' +
    DPGlobal.headTemplate +
    '<tbody></tbody>' +
    DPGlobal.footTemplate +
    '</table>' +
    '</div>' +
    '<div class="datepicker-months">' +
    '<table class="table-condensed">' +
    DPGlobal.headTemplate +
    DPGlobal.contTemplate +
    DPGlobal.footTemplate +
    '</table>' +
    '</div>' +
    '<div class="datepicker-years">' +
    '<table class="table-condensed">' +
    DPGlobal.headTemplate +
    DPGlobal.contTemplate +
    DPGlobal.footTemplate +
    '</table>' +
    '</div>' +
    '<div class="datepicker-decades">' +
    '<table class="table-condensed">' +
    DPGlobal.headTemplate +
    DPGlobal.contTemplate +
    DPGlobal.footTemplate +
    '</table>' +
    '</div>' +
    '<div class="datepicker-centuries">' +
    '<table class="table-condensed">' +
    DPGlobal.headTemplate +
    DPGlobal.contTemplate +
    DPGlobal.footTemplate +
    '</table>' +
    '</div>' +
    '</div>';

  $.fn.datepicker.DPGlobal = DPGlobal;


  /* DATEPICKER NO CONFLICT
   * =================== */

  $.fn.datepicker.noConflict = function() {
    $.fn.datepicker = old;
    return this;
  };

  /* DATEPICKER VERSION
   * =================== */
  $.fn.datepicker.version = '1.7.0-dev';

  $.fn.datepicker.deprecated = function(msg) {
    var console = window.console;
    if (console && console.warn) {
      console.warn('DEPRECATED: ' + msg);
    }
  };


  /* DATEPICKER DATA-API
   * ================== */

  $(document).on(
    'focus.datepicker.data-api click.datepicker.data-api',
    '[data-provide="datepicker"]',
    function(e) {
      var $this = $(this);
      if ($this.data('datepicker'))
        return;
      e.preventDefault();
      // component click requires us to explicitly show it
      datepickerPlugin.call($this, 'show');
    }
  );
  $(function() {
    datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
  });

}));
/*!

 =========================================================
 * Now UI Kit - v1.3.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */


var transparent = true;
var big_image;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
  backgroundOrange = false,
  toggle_initialized = false;

var nowuiKit,
  $navbar,
  scroll_distance,
  oVal;

$(document).ready(function() {
  //  Activate the Tooltips
  $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

  // Activate Popovers and set color for popovers
  $('[data-toggle="popover"]').each(function() {
    color_class = $(this).data('color');
    $(this).popover({
      template: '<div class="popover popover-' + color_class + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    });
  });

  // Activate the image for the navbar-collapse
  nowuiKit.initNavbarImage();

  $navbar = $('.navbar[color-on-scroll]');
  scroll_distance = $navbar.attr('color-on-scroll') || 500;

  // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

  if ($('.navbar[color-on-scroll]').length != 0) {
    nowuiKit.checkScrollForTransparentNavbar();
    $(window).on('scroll', nowuiKit.checkScrollForTransparentNavbar)
  }

  $('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });

  // Activate bootstrapSwitch
  $('.bootstrap-switch').each(function() {
    $this = $(this);
    data_on_label = $this.data('on-label') || '';
    data_off_label = $this.data('off-label') || '';

    $this.bootstrapSwitch({
      onText: data_on_label,
      offText: data_off_label
    });
  });

  if ($(window).width() >= 992) {
    big_image = $('.page-header-image[data-parallax="true"]');

    $(window).on('scroll', nowuiKitDemo.checkScrollForParallax);
  }

  // Activate Carousel
  $('.carousel').carousel({
    interval: 4000
  });

  $('.date-picker').each(function() {
    $(this).datepicker({
      templates: {
        leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
        rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
      }
    }).on('show', function() {
      $('.datepicker').addClass('open');

      datepicker_color = $(this).data('datepicker-color');
      if (datepicker_color.length != 0) {
        $('.datepicker').addClass('datepicker-' + datepicker_color + '');
      }
    }).on('hide', function() {
      $('.datepicker').removeClass('open');
    });
  });


});

// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
  checkScrollForParallax: debounce(function() {
    var current_scroll = $(this).scrollTop();

    oVal = ($(window).scrollTop() / 3);
    big_image.css({
      'transform': 'translate3d(0,' + oVal + 'px,0)',
      '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
    });

  }, 6)

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

$(window).on('resize', function() {
  nowuiKit.initNavbarImage();
});

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);

  if (nowuiKit.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    nowuiKit.misc.navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 550);
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);
    div = '<div id="bodyClick"></div>';
    $(div).appendTo('body').click(function() {
      $('html').removeClass('nav-open');
      nowuiKit.misc.navbar_menu_visible = 0;
      setTimeout(function() {
        $toggle.removeClass('toggled');
        $('#bodyClick').remove();
      }, 550);
    });

    $('html').addClass('nav-open');
    nowuiKit.misc.navbar_menu_visible = 1;
  }
});

nowuiKit = {
  misc: {
    navbar_menu_visible: 0
  },

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > scroll_distance) {
      if (transparent) {
        transparent = false;
        $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar[color-on-scroll]').addClass('navbar-transparent');
      }
    }
  }, 17),

  initNavbarImage: function() {
    var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
    var background_image = $navbar.data('nav-image');

    if (background_image != undefined) {
      if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
        $navbar.css('background', "url('" + background_image + "')")
          .removeAttr('data-nav-image')
          .css('background-size', "cover")
          .addClass('has-image');
      } else {
        $navbar.css('background', "")
          .attr('data-nav-image', '' + background_image + '')
          .css('background-size', "")
          .removeClass('has-image');
      }
    }
  },

  initSliders: function() {
    // Sliders for demo purpose in refine cards section
    var slider = document.getElementById('sliderRegular');

    noUiSlider.create(slider, {
      start: 40,
      connect: [true, false],
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById('sliderDouble');

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  }
}

// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
  checkScrollForParallax: debounce(function() {
    var current_scroll = $(this).scrollTop();

    oVal = ($(window).scrollTop() / 3);
    big_image.css({
      'transform': 'translate3d(0,' + oVal + 'px,0)',
      '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
    });

  }, 6)

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};