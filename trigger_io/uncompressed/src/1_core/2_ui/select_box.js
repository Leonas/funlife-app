/*
 * @copyright: 2011 Intel
 * @description:  This script will replace all drop downs with friendly select controls.  Users can still interact
 * with the old drop down box as normal with javascript, and this will be reflected

 */
(function ($) {
  $['select_box'] = {
    scroller        : null,
    getOldSelects   : function (element_id) {
      if(!$.os.android || $.os.androidICS) {
        return;
      }
      if(!$.fn['scroller']) {
        alert("This library requires jq.web.Scroller");
        return;
      }
      var container = element_id && document.getElementById(element_id) ? document.getElementById(element_id) : document;
      if(!container) {
        alert("Could not find container element for jq.web.select_box " + element_id);
        return;
      }
      var sels = container.getElementsByTagName("select");
      var that = this;
      for(var i = 0; i < sels.length; i++) {
        if(sels[i].hasSelectBoxFix) {
          continue;
        }
        (function (theSel) {
          var fakeInput = document.createElement("div");
          var theSelStyle = window.getComputedStyle(theSel);
          var width = theSelStyle.width == 'intrinsic' ? '100%' : theSelStyle.width;
          var selWidth = parseInt(width) > 0 ? width : '100px';
          var selHeight = parseInt(theSel.style.height) > 0 ? theSel.style.height : (parseInt(theSelStyle.height) ? theSelStyle.height : '20px');
          fakeInput.style.width = selWidth;
          fakeInput.style.height = selHeight;
          fakeInput.style.margin = theSelStyle.margin;
          fakeInput.style.position = theSelStyle.position;
          fakeInput.style.left = theSelStyle.left;
          fakeInput.style.top = theSelStyle.top;
          fakeInput.style.lineHeight = theSelStyle.lineHeight;
          //fakeInput.style.position = "absolute";
          //fakeInput.style.left = "0px";
          //fakeInput.style.top = "0px";
          fakeInput.style.zIndex = "1";
          if(theSel.value) {
            fakeInput.innerHTML = theSel.options[theSel.selectedIndex].text;
          }
          fakeInput.style.background = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAIAAABFWWJ4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM1NjQxRUQxNUFEODExRTA5OUE3QjE3NjI3MzczNDAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM1NjQxRUQyNUFEODExRTA5OUE3QjE3NjI3MzczNDAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzU2NDFFQ0Y1QUQ4MTFFMDk5QTdCMTc2MjczNzM0MDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzU2NDFFRDA1QUQ4MTFFMDk5QTdCMTc2MjczNzM0MDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6YWbdCAAAAlklEQVR42mIsKChgIBGwAHFPTw/xGkpKSlggrG/fvhGjgYuLC0gyMZAOoPb8//9/0Or59+8f8XrICQN66SEnDOgcp3AgKiqKqej169dY9Hz69AnCuHv3rrKyMrIKoAhcVlBQELt/gIqwstHD4B8quH37NlAQSKKJEwg3iLbBED8kpeshoGcwh5uuri5peoBFMEluAwgwAK+5aXfuRb4gAAAAAElFTkSuQmCC') right top no-repeat";
          fakeInput.style.backgroundColor = "white";
          fakeInput.style.lineHeight = selHeight;
          fakeInput.style.backgroundSize = "contain";
          fakeInput.className = "jqmobiSelect_fakeInput " + theSel.className;
          fakeInput.id = theSel.id + "_jqmobiSelect";

          fakeInput.style.border = "1px solid gray";
          fakeInput.style.color = "black";
          fakeInput.linkId = theSel.id;
          fakeInput.onclick = function (e) {
            that.initDropDown(this.linkId);
          };
          $(fakeInput).insertBefore($(theSel));
          //theSel.parentNode.style.position = "relative";
          theSel.style.display = "none";
          theSel.style.webkitAppearance = "none";
          // Create listeners to watch when the select value has changed.
          // This is needed so the users can continue to interact as normal,
          // via jquery or other frameworks
          for(var j = 0; j < theSel.options.length; j++) {
            if(theSel.options[j].selected) {
              fakeInput.value = theSel.options[j].text;
            }
            theSel.options[j].watch("selected", function (prop, oldValue, newValue) {
              if(newValue == true) {
                if(!theSel.getAttribute("multiple")) {
                  that.updateMaskValue(this.parentNode.id, this.text, this.value);
                }
                this.parentNode.value = this.value;
              }
              return newValue;
            });
          }
          theSel.watch("selectedIndex", function (prop, oldValue, newValue) {
            if(this.options[newValue]) {
              if(!theSel.getAttribute("multiple")) {
                that.updateMaskValue(this.id, this.options[newValue].text, this.options[newValue].value);
              }
              this.value = this.options[newValue].value;
            }
            return newValue;
          });

          fakeInput = null;
          imageMask = null;
          sels[i].hasSelectBoxFix = true;


        })(sels[i]);
      }
      that.createHtml();
    },
    updateDropdown  : function (id) {
      var element = document.getElementById(id);
      if(!element) {
        return;
      }
      for(var j = 0; j < element.options.length; j++) {
        if(element.options[j].selected) {
          fakeInput.value = element.options[j].text;
        }
        element.options[j].watch("selected", function (prop, oldValue, newValue) {
          if(newValue == true) {
            that.updateMaskValue(this.parentNode.id, this.text, this.value);
            this.parentNode.value = this.value;
          }
          return newValue;
        });
      }
      element = null;
    },
    initDropDown    : function (element_id) {

      var that = this;
      var element = document.getElementById(element_id);
      if(element.disabled) {
        return;
      }
      if(!element || !element.options || element.options.length == 0) {
        return;
      }
      var htmlTemplate = "";
      var foundInd = 0;
      document.getElementById("jqmobiSelectBoxScroll").innerHTML = "";

      document.getElementById("jqmobiSelectBoxHeaderTitle").innerHTML = (element.name != undefined && element.name != "undefined" && element.name != "" ? element.name : element_id);

      for(var j = 0; j < element.options.length; j++) {
        var currInd = j;
        element.options[j].watch("selected", function (prop, oldValue, newValue) {
          if(newValue == true) {
            that.updateMaskValue(this.parentNode.id, this.text, this.value);
            this.parentNode.value = this.value;
          }
          return newValue;
        });
        var checked = (element.options[j].selected) ? true : false;
        var button = "";
        var div = document.createElement("div");
        div.className = "jqmobiSelectRow";
        // div.id = foundID;
        div.style.cssText = ";line-height:40px;font-size:14px;padding-left:10px;height:40px;width:100%;position:relative;width:100%;border-bottom:1px solid black;background:white;";
        var anchor = document.createElement("a");
        anchor.href = "javascript:;";
        div.tmpValue = j;
        div.onclick = function (e) {
          that.setDropDownValue(element_id, this.tmpValue, this);
        };
        anchor.style.cssText = "text-decoration:none;color:black;";
        anchor.innerHTML = element.options[j].text;
        var span = document.createElement("span");
        span.style.cssText = "float:right;margin-right:20px;margin-top:-2px";
        var rad = document.createElement("button");
        if(checked) {
          rad.style.cssText = "background: #000;padding: 0px 0px;border-radius:15px;border:3px solid black;";
          rad.className = "jqmobiSelectRowButtonFound";
        }
        else {
          rad.style.cssText = "background: #ffffff;padding: 0px 0px;border-radius:15px;border:3px solid black;";
          rad.className = "jqmobiSelectRowButton";
        }
        rad.style.width = "20px";
        rad.style.height = "20px";

        rad.checked = checked;

        anchor.className = "jqmobiSelectRowText";
        span.appendChild(rad);
        div.appendChild(anchor);
        div.appendChild(span);

        document.getElementById("jqmobiSelectBoxScroll").appendChild(div);

        span = null;
        rad = null;
        anchor = null;
      }
      try {
        document.getElementById("jqmobiSelectModal").style.display = 'block';
      } catch (e) {
        console.log("Error showing div " + e);
      }
      try {
        if(div) {
          var scrollThreshold = numOnly(div.style.height);
          var offset = numOnly(document.getElementById("jqmobiSelectBoxHeader").style.height);

          if(foundInd * scrollThreshold + offset >= numOnly(document.getElementById("jqmobiSelectBoxFix").clientHeight) - offset) {
            var scrollToPos = (foundInd) * -scrollThreshold + offset;
          }
          else {
            scrollToPos = 0;
          }
          this.scroller.scrollTo({
            x: 0,
            y: scrollToPos
          });
        }
      } catch (e) {
        console.log("error init dropdown" + e);
      }
      div = null;
      element = null;
    },
    updateMaskValue : function (element_id, value, val2) {

      var element = document.getElementById(element_id + "_jqmobiSelect");
      var el2 = document.getElementById(element_id);
      if(element) {
        element.innerHTML = value;
      }
      if(typeof (el2.onchange) == "function") {
        el2.onchange(val2);
      }
      element = null;
      el2 = null;
    },
    setDropDownValue: function (element_id, value, div) {


      var element = document.getElementById(element_id);
      if(!element) {
        return
      }

      if(!element.getAttribute("multiple")) {
        element.selectedIndex = value;
        $(element).find("option").forEach(function (object) {
          object.selected = false;
        });
        $(element).find("option:nth-child(" + (value + 1) + ")").get(0).selected = true;
        this.scroller.scrollTo({
          x: 0,
          y: 0
        });
        this.hideDropDown();
      }
      else {
        //multi select

        var myEl = $(element).find("option:nth-child(" + (value + 1) + ")").get(0);
        if(myEl.selected) {
          myEl.selected = false;
          $(div).find("button").css("background", "#fff");
        }
        else {
          myEl.selected = true;
          $(div).find("button").css("background", "#000");
        }

      }
      $(element).trigger("change");
      element = null;
    },
    hideDropDown    : function () {
      document.getElementById("jqmobiSelectModal").style.display = 'none';
      document.getElementById("jqmobiSelectBoxScroll").innerHTML = "";
    },
    createHtml      : function () {
      var that = this;
      if(document.getElementById("jqmobiSelectBoxContainer")) {
        return;
      }
      var modalDiv = document.createElement("div");

      modalDiv.style.cssText = "position:absolute;top:0px;bottom:0px;left:0px;right:0px;background:rgba(0,0,0,.7);z-index:200000;display:none;";
      modalDiv.id = "jqmobiSelectModal";

      var myDiv = document.createElement("div");
      myDiv.id = "jqmobiSelectBoxContainer";
      myDiv.style.cssText = "position:absolute;top:8%;bottom:10%;display:block;width:90%;margin:auto;margin-left:5%;height:90%px;background:white;color:black;border:1px solid black;border-radius:6px;";
      myDiv.innerHTML = "<div id='jqmobiSelectBoxHeader' style=\"display:block;font-family:'Eurostile-Bold', Eurostile, Helvetica, Arial, sans-serif;color:#fff;font-weight:bold;font-size:18px;line-height:34px;height:34px; text-transform:uppercase;text-align:left;text-shadow:rgba(0,0,0,.9) 0px -1px 1px;    padding: 0px 8px 0px 8px;    border-top-left-radius:5px; border-top-right-radius:5px; -webkit-border-top-left-radius:5px; -webkit-border-top-right-radius:5px;    background:#39424b;    margin:1px;\"><div style='float:left;' id='jqmobiSelectBoxHeaderTitle'></div><div style='float:right;width:60px;margin-top:-5px'><div id='jqmobiSelectClose' class='button' style='width:60px;height:32px;line-height:32px;'>Close</div></div></div>";
      myDiv.innerHTML += '<div id="jqmobiSelectBoxFix"  style="position:relative;height:90%;background:white;overflow:hidden;width:100%;"><div id="jqmobiSelectBoxScroll"></div></div>';
      var that = this;
      modalDiv.appendChild(myDiv);

      $(document).ready(function () {

        if(jq("#ui_kit")) {
          jq("#ui_kit").append(modalDiv);
        }
        else {
          document.body.appendChild(modalDiv);
        }
        var close = $("#jqmobiSelectClose").get();
        close.onclick = function () {
          that.hideDropDown();
        };

        var styleSheet = $("<style>.jqselectscrollBarV{opacity:1 !important;}</style>").get();
        document.body.appendChild(styleSheet);
        try {
          that.scroller = $("#jqmobiSelectBoxScroll").scroller({
            scroller      : false,
            verticalScroll: true,
            vScrollCSS    : "jqselectscrollBarV"
          });

        } catch (e) {
          console.log("Error creating select html " + e);
        }
        modalDiv = null;
        myDiv = null;
        styleSheet = null;
      });
    }
  };

//The following is based off Eli Grey's shim
//https://gist.github.com/384583
//We use HTMLElement to not cause problems with other objects
  if(!HTMLElement.prototype.watch) {
    HTMLElement.prototype.watch = function (prop, handler) {
      var oldval = this[prop], newval = oldval,
          getter = function () {
            return newval;
          },
          setter = function (val) {
            oldval = newval;
            return newval = handler.call(this, prop, oldval, val);
          };
      if(delete this[prop]) { // can't watch constants
        if(HTMLElement.defineProperty) { // ECMAScript 5
          HTMLElement.defineProperty(this, prop, {
            get         : getter,
            set         : setter,
            enumerable  : false,
            configurable: true
          });
        }
        else if(HTMLElement.prototype.__defineGetter__ && HTMLElement.prototype.__defineSetter__) { // legacy
          HTMLElement.prototype.__defineGetter__.call(this, prop, getter);
          HTMLElement.prototype.__defineSetter__.call(this, prop, setter);
        }
      }
    };
  }
  if(!HTMLElement.prototype.unwatch) {
    HTMLElement.prototype.unwatch = function (prop) {
      var val = this[prop];
      delete this[prop]; // remove accessors
      this[prop] = val;
    };
  }
})(jq);