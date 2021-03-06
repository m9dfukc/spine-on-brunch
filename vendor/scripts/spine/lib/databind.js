// Generated by CoffeeScript 1.3.3
(function() {
  var Attribute, Checked, Click, DataBind, Enable, Options, Template, Update, Visible,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Template = (function() {

    function Template() {}

    Template.prototype.keys = [];

    Template.prototype.bind = function(operators, model, controller, el, options) {};

    Template.prototype.unbind = function(operators, model, controller, el, options) {};

    Template.prototype.init = function(operators, model, controller, el, options, event) {
      var binder, unbinder,
        _this = this;
      model.constructor.bind(event, binder = function() {
        return _this.update(operators, model, controller, el, options);
      });
      return controller.bind("destroy-bindings", unbinder = function(record) {
        model.constructor.unbind(event, binder);
        return controller.unbind("destroy-bindings", unbinder);
      });
    };

    Template.prototype.get = function(item, value, callback) {
      var result;
      if (typeof item[value] === "function") {
        result = item[value](callback);
      } else {
        result = item[value];
      }
      return result;
    };

    Template.prototype.set = function(model, property, value, options) {
      if (typeof model[property] === "function") {
        return;
      }
      if (!options || options.save) {
        return model.updateAttribute(property, value);
      } else {
        return model[property] = value;
      }
    };

    return Template;

  })();

  Update = (function(_super) {

    __extends(Update, _super);

    function Update() {
      return Update.__super__.constructor.apply(this, arguments);
    }

    Update.prototype.keys = ["text", "value"];

    Update.prototype.bind = function(operators, model, controller, el, options) {
      var operator, _i, _len,
        _this = this;
      el.bind("change", function() {
        return _this.change(operators, model, controller, el, options);
      });
      if (options.watch) {
        for (_i = 0, _len = operators.length; _i < _len; _i++) {
          operator = operators[_i];
          this.init([operator], model, controller, el, options, "update[" + operator.property + "]");
        }
      } else {
        this.init(operators, model, controller, el, options, "change");
      }
      return this.update(operators, model, controller, el, options);
    };

    Update.prototype.change = function(operators, model, controller, el, options) {
      var binder;
      binder = this;
      el.each(function() {
        var e, operator, _i, _len;
        e = $(this);
        for (_i = 0, _len = operators.length; _i < _len; _i++) {
          operator = operators[_i];
          switch (this.tagName) {
            case "INPUT":
            case "SELECT":
            case "TEXTAREA":
              binder.set(model, operator.property, e.val(), options);
              break;
            default:
              binder.set(model, operator.property, e.text(), options);
          }
        }
        return this;
      });
      return this;
    };

    Update.prototype.update = function(operators, model, controller, el, options) {
      var binder;
      binder = this;
      el.each(function() {
        var e, operator, value, _i, _len;
        e = $(this);
        for (_i = 0, _len = operators.length; _i < _len; _i++) {
          operator = operators[_i];
          value = binder.get(model, operator.property);
          switch (this.tagName) {
            case "INPUT":
            case "TEXTAREA":
              if (e.val() !== value) {
                e.val(value);
                e.trigger("change");
              }
              break;
            case "SELECT":
              e.find("option[selected]").each(function(key, element) {
                return $(element).removeAttr("selected");
              });
              e.find("option[value=" + value + "]").attr("selected", "selected");
              break;
            default:
              if (typeof value === "object" && value && value.constructor === Array) {
                e.text(value.join(","));
              } else if (typeof value === "object" && value) {
                e.text(value.toString());
              } else {
                e.text(value);
              }
          }
        }
        return this;
      });
      return this;
    };

    return Update;

  })(Template);

  Options = (function(_super) {

    __extends(Options, _super);

    function Options() {
      return Options.__super__.constructor.apply(this, arguments);
    }

    Options.prototype.keys = ["options", "selectedOptions"];

    Options.prototype.bind = function(operators, model, controller, el, options) {
      var ops, opsSelected,
        _this = this;
      if (options.watch) {
        ops = operators.filter(function(e) {
          return e.name === "options";
        })[0];
        opsSelected = operators.filter(function(e) {
          return e.name === "selectedOptions";
        })[0];
        this.init([ops, opsSelected], model, controller, el, options, "update[" + ops.property + "]");
        this.init([ops, opsSelected], model, controller, el, options, "update[" + opsSelected.property + "]");
      } else {
        this.init(operators, model, controller, el, options, "update");
      }
      if (operators.some(function(e) {
        return e.name === "selectedOptions";
      })) {
        el.bind("change", function() {
          return _this.change(operators, model, controller, el, options);
        });
      }
      return this.update(operators, model, controller, el, options);
    };

    Options.prototype.update = function(operators, model, controller, el, options) {
      var array, ops, opsSelected, process, selectedOptions;
      ops = operators.filter(function(e) {
        return e.name === "options";
      })[0];
      opsSelected = operators.filter(function(e) {
        return e.name === "selectedOptions";
      });
      process = function(array) {
        var changed, count, index, item, option, property, result, selected, _i, _j, _len, _ref,
          _this = this;
        options = el.children('option');
        if (array instanceof Array) {
          result = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = array.length; _i < _len; _i++) {
              item = array[_i];
              _results.push({
                text: item,
                value: item
              });
            }
            return _results;
          })();
        } else {
          result = Object.keys(array).map(function(r) {
            return {
              text: array[r],
              value: r
            };
          }).sort(function(a, b) {
            if (b.value === "") {
              return 1;
            } else if (a.value === "") {
              return -1;
            } else {
              return a.text.localeCompare(b.text);
            }
          });
        }
        count = 0;
        for (property in result) {
          if (!__hasProp.call(result, property)) continue;
          count = count = count + 1;
        }
        changed = false;
        for (index = _i = 0, _len = result.length; _i < _len; index = ++_i) {
          item = result[index];
          option = options.length > index ? $(options[index]) : null;
          if ((!isNaN(item.value - 0) && selectedOptions.indexOf(item.value - 0) >= 0) || selectedOptions.indexOf(item.value) >= 0) {
            selected = "selected='selected'";
          } else {
            selected = "";
          }
          if (option === null) {
            el.append("<option value='" + item.value + "' " + selected + ">" + item.text + "</option>");
            changed = true;
          } else {
            if (option.text() !== item.text) {
              option.text(item.text);
            }
            if ((typeof option.val === "function" ? option.val() : void 0) !== item.value) {
              option.val(item.value);
            }
            if (option.attr("selected") === "selected" || option.attr("selected") === true) {
              if (selected.length === 0) {
                option.removeAttr("selected");
                changed = true;
              }
            } else {
              if (selected.length > 0) {
                option.attr("selected", "selected");
                changed = true;
              }
            }
          }
        }
        if (options.length > count) {
          for (index = _j = count, _ref = options.length; count <= _ref ? _j <= _ref : _j >= _ref; index = count <= _ref ? ++_j : --_j) {
            $(options[index]).remove();
            changed = true;
          }
        }
        if (changed) {
          return el.trigger("change");
        }
      };
      selectedOptions = opsSelected.length === 1 ? this.get(model, opsSelected[0].property) : [];
      if (!(selectedOptions instanceof Array)) {
        selectedOptions = [selectedOptions];
      }
      array = ops ? this.get(model, ops.property, process) || [] : [];
      if (typeof array !== "function") {
        return process(array);
      }
    };

    Options.prototype.change = function(operators, model, controller, el, options) {
      var items, newValue, operator, value;
      operator = operators.filter(function(e) {
        return e.name === "selectedOptions";
      })[0];
      items = [];
      el.find("option:selected").each(function() {
        return items.push($(this).val());
      });
      value = this.get(model, operator.property);
      if (value instanceof Array || items.length > 1) {
        newValue = [];
        newValue = newValue.concat(items);
      } else {
        if (items.length === 1) {
          newValue = items[0];
        }
      }
      return this.set(model, operator.property, newValue, options);
    };

    return Options;

  })(Template);

  Click = (function(_super) {

    __extends(Click, _super);

    function Click() {
      return Click.__super__.constructor.apply(this, arguments);
    }

    Click.prototype.keys = ["click"];

    Click.prototype.bind = function(operators, model, controller, el, options) {
      var _this = this;
      return el.bind("click", function() {
        return _this.click(operators, model, controller, el, options);
      });
    };

    Click.prototype.click = function(operators, model, controller, el, options) {
      var binder, operator, _i, _len, _results;
      binder = this;
      _results = [];
      for (_i = 0, _len = operators.length; _i < _len; _i++) {
        operator = operators[_i];
        _results.push(binder.get(model, operator.property));
      }
      return _results;
    };

    return Click;

  })(Template);

  Enable = (function(_super) {

    __extends(Enable, _super);

    function Enable() {
      return Enable.__super__.constructor.apply(this, arguments);
    }

    Enable.prototype.keys = ["enable"];

    Enable.prototype.bind = function(operators, model, controller, el, options) {
      var operator, _i, _len;
      if (options.watch) {
        for (_i = 0, _len = operators.length; _i < _len; _i++) {
          operator = operators[_i];
          this.init([operator], model, controller, el, options, "update[" + operator.property + "]");
        }
      } else {
        this.init(operators, model, controller, el, options, "change");
      }
      return this.update(operators, model, controller, el, options);
    };

    Enable.prototype.update = function(operators, model, controller, el, options) {
      var operator, result;
      operator = operators.filter(function(e) {
        return e.name === "enable";
      })[0];
      result = this.get(model, operator.property);
      if (result) {
        return el.removeAttr("disabled");
      } else {
        return el.attr("disabled", "disabled");
      }
    };

    return Enable;

  })(Template);

  Visible = (function(_super) {

    __extends(Visible, _super);

    function Visible() {
      return Visible.__super__.constructor.apply(this, arguments);
    }

    Visible.prototype.keys = ["visible"];

    Visible.prototype.bind = function(operators, model, controller, el, options) {
      var operator, _i, _len;
      if (options.watch) {
        for (_i = 0, _len = operators.length; _i < _len; _i++) {
          operator = operators[_i];
          this.init([operator], model, controller, el, options, "update[" + operator.property + "]");
        }
      } else {
        this.init(operators, model, controller, el, options, "update");
      }
      return this.update(operators, model, controller, el, options);
    };

    Visible.prototype.update = function(operators, model, controller, el, options) {
      var operator, result;
      operator = operators.filter(function(e) {
        return e.name === "visible";
      })[0];
      result = this.get(model, operator.property);
      if (result) {
        return el.show();
      } else {
        return el.hide();
      }
    };

    return Visible;

  })(Template);

  Attribute = (function(_super) {

    __extends(Attribute, _super);

    function Attribute() {
      return Attribute.__super__.constructor.apply(this, arguments);
    }

    Attribute.prototype.keys = ["attr"];

    Attribute.prototype.bind = function(operators, model, controller, el, options) {
      var json, operator, property, _i, _len;
      if (options.watch) {
        for (_i = 0, _len = operators.length; _i < _len; _i++) {
          operator = operators[_i];
          json = JSON.parse(operator.property);
          for (property in json) {
            if (!__hasProp.call(json, property)) continue;
            this.init([operator], model, controller, el, options, "update[" + json[property] + "]");
          }
        }
      } else {
        this.init(operators, model, controller, el, options, "update");
      }
      return this.update(operators, model, controller, el, options);
    };

    Attribute.prototype.update = function(operators, model, controller, el, options) {
      var binder, json, operator, property, value;
      binder = this;
      operator = operators.filter(function(e) {
        return e.name === "attr";
      })[0];
      json = JSON.parse(operator.property);
      for (property in json) {
        if (!__hasProp.call(json, property)) continue;
        value = binder.get(model, json[property]);
        if (el.attr(property) !== value) {
          el.attr(property, value);
          el.trigger("change");
        }
      }
      return this;
    };

    return Attribute;

  })(Template);

  Checked = (function(_super) {

    __extends(Checked, _super);

    function Checked() {
      return Checked.__super__.constructor.apply(this, arguments);
    }

    Checked.prototype.keys = ["checked"];

    Checked.prototype.bind = function(operators, model, controller, el, options) {
      var operator, _i, _len,
        _this = this;
      el.bind("change", function() {
        return _this.change(operators, model, controller, el, options);
      });
      if (options.watch) {
        for (_i = 0, _len = operators.length; _i < _len; _i++) {
          operator = operators[_i];
          this.init([operator], model, controller, el, options, "update[" + operator.property + "]");
        }
      } else {
        this.init(operators, model, controller, el, options, "change");
      }
      return this.update(operators, model, controller, el, options);
    };

    Checked.prototype.change = function(operators, model, controller, el, options) {
      var current, operator, value;
      operator = operators.filter(function(e) {
        return e.name === "checked";
      })[0];
      value = this.get(model, operator.property);
      if (el.attr("type") === "radio") {
        if (el.length > 1) {
          current = $($.grep(el, function(item) {
            return $(item).is(":checked");
          })).val();
          if (current === "true") {
            current = true;
          }
          if (current === "false") {
            current = false;
          }
          if (value !== current) {
            return this.set(model, operator.property, current, options);
          }
        } else {
          if (el.is(":checked")) {
            return this.set(model, operator.property, el.val(), options);
          }
        }
      } else {
        if (value !== el.is(":checked")) {
          value = el.is(":checked");
          return this.set(model, operator.property, value, options);
        }
      }
    };

    Checked.prototype.update = function(operators, model, controller, el, options) {
      var changed, operator, result;
      operator = operators.filter(function(e) {
        return e.name === "checked";
      })[0];
      result = this.get(model, operator.property);
      changed = false;
      el.each(function() {
        var e, value;
        e = $(this);
        value = e.val();
        if (value === "true") {
          value = true;
        }
        if (value === "false") {
          value = false;
        }
        if (e.attr("type") === "radio") {
          if (result === value) {
            if (!e.is(":checked")) {
              e.attr("checked", "checked");
              return changed = true;
            }
          } else {
            if (e.is(":checked")) {
              e.removeAttr("checked");
              return changed = true;
            }
          }
        } else {
          if (result) {
            if (!e.is(":checked")) {
              e.attr("checked", "checked");
              return changed = true;
            }
          } else {
            if (e.is(":checked")) {
              e.removeAttr("checked");
              return changed = true;
            }
          }
        }
      });
      if (changed) {
        return el.trigger("change");
      }
    };

    return Checked;

  })(Template);

  DataBind = {
    binders: [new Update(), new Options(), new Click(), new Enable(), new Visible(), new Attribute(), new Checked()],
    refreshBindings: function(model) {
      var addElement, bindingElements, controller, element, elements, findBinder, info, init, key, options, parse, property, splitter, trim, _i, _len;
      if (!model) {
        model = this.model;
      }
      if (!model) {
        return;
      }
      controller = this;
      controller.trigger("destroy-bindings");
      splitter = /(\w+)(\\[.*])? (.*)/;
      options = {
        save: model.watchEnabled ? false : true,
        watch: model.watchEnabled ? true : false
      };
      $.extend(options, controller.bindingOptions);
      findBinder = function(key) {
        var binder, _i, _len, _ref;
        _ref = controller.binders;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          binder = _ref[_i];
          if (binder.keys.indexOf(key) >= 0) {
            return binder;
          }
        }
        return null;
      };
      addElement = function(elements, info, property) {
        var binder, element, matching;
        binder = findBinder(info.name);
        if (binder === null) {
          return;
        }
        matching = elements.filter(function(e) {
          return e.el[0] === info.element[0] && e.binder === binder;
        });
        if (matching.length === 0) {
          element = {
            el: info.element,
            binder: binder,
            operators: []
          };
          elements.push(element);
        } else {
          element = matching[0];
        }
        return element.operators.push({
          name: info.name,
          parameters: info.parameters,
          property: property
        });
      };
      parse = function(key) {
        var match, name, parameters, selector;
        match = key.match(splitter);
        if (match !== null) {
          name = match[1];
          parameters = match[2];
          selector = match[3];
        } else {
          name = key;
          selector = "";
        }
        if (selector === "") {
          selector = controller.el;
        } else {
          selector = controller.el.find(selector);
        }
        return {
          name: name,
          parameters: parameters,
          element: selector
        };
      };
      init = function(element) {
        var el, operators;
        operators = element.operators;
        el = element.el;
        element.binder.bind(operators, model, controller, el, options);
        return controller.bind("destroy", function() {
          return element.binder.unbind(operators, model, controller, el, options);
        });
      };
      trim = function(s) {
        return s.replace(/^\s+|\s+$/g, "");
      };
      bindingElements = function(elements) {
        return function(property) {
          return elements.filter(function(element) {
            return element.operators.some(function(item) {
              return item.property === property;
            });
          }).map(function(result) {
            return result.el[0];
          });
        };
      };
      elements = [];
      for (key in this.bindings) {
        if (this.bindings.hasOwnProperty(key)) {
          property = this.bindings[key];
          info = parse(key);
          addElement(elements, info, property);
        }
      }
      this.el.find("*[data-bind]").each(function() {
        var attributes, binder, databind, e, _i, _len, _results;
        e = $(this);
        databind = e.data("bind").split(",");
        attributes = databind.map(function(item) {
          var fullString, match, name, value;
          fullString = trim(item);
          match = fullString.match(/(\w+):(.*)/);
          name = match[1];
          value = trim(match[2]);
          return {
            name: name,
            value: value,
            element: e
          };
        });
        _results = [];
        for (_i = 0, _len = attributes.length; _i < _len; _i++) {
          info = attributes[_i];
          binder = findBinder(info.name);
          _results.push(addElement(elements, info, info.value));
        }
        return _results;
      });
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        element = elements[_i];
        init(element);
      }
      this.bindingElements = bindingElements(elements);
      return this;
    }
  };

  if (Spine.Activator) {
    DataBind.activators = ["refreshBindings"];
  }

  this.Spine.DataBind = DataBind;

}).call(this);
