"use strict";
var Activity = require("./activity");
var util = require("util");
var Declarator = require("./declarator");
var errors = require("../common/errors");
function Pick() {
  Declarator.call(this);
}
util.inherits(Pick, Declarator);
Pick.prototype.varsDeclared = function(callContext, args) {
  if (args && args.length) {
    this.set("__collectPick", true);
    callContext.schedule(args, "_argsGot");
  } else {
    callContext.complete([]);
  }
};
Pick.prototype._argsGot = function(callContext, reason, result) {
  callContext.end(reason, result);
};
module.exports = Pick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxBQUFJLEVBQUEsQ0FBQSxRQUFPLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxZQUFXLENBQUMsQ0FBQztBQUNwQyxBQUFJLEVBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztBQUMxQixBQUFJLEVBQUEsQ0FBQSxVQUFTLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxjQUFhLENBQUMsQ0FBQztBQUN4QyxBQUFJLEVBQUEsQ0FBQSxNQUFLLEVBQUksQ0FBQSxPQUFNLEFBQUMsQ0FBQyxrQkFBaUIsQ0FBQyxDQUFDO0FBRXhDLE9BQVMsS0FBRyxDQUFFLEFBQUQsQ0FBRztBQUNaLFdBQVMsS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFDekI7QUFBQSxBQUVBLEdBQUcsU0FBUyxBQUFDLENBQUMsSUFBRyxDQUFHLFdBQVMsQ0FBQyxDQUFDO0FBRS9CLEdBQUcsVUFBVSxhQUFhLEVBQUksVUFBVSxXQUFVLENBQUcsQ0FBQSxJQUFHLENBQUc7QUFDdkQsS0FBSSxJQUFHLEdBQUssQ0FBQSxJQUFHLE9BQU8sQ0FBRztBQUNyQixPQUFHLElBQUksQUFBQyxDQUFDLGVBQWMsQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUMvQixjQUFVLFNBQVMsQUFBQyxDQUFDLElBQUcsQ0FBRyxXQUFTLENBQUMsQ0FBQztFQUMxQyxLQUNLO0FBQ0QsY0FBVSxTQUFTLEFBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztFQUM1QjtBQUFBLEFBQ0osQ0FBQTtBQUVBLEdBQUcsVUFBVSxTQUFTLEVBQUksVUFBVSxXQUFVLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxNQUFLLENBQUc7QUFDN0QsWUFBVSxJQUFJLEFBQUMsQ0FBQyxNQUFLLENBQUcsT0FBSyxDQUFDLENBQUM7QUFDbkMsQ0FBQTtBQUVBLEtBQUssUUFBUSxFQUFJLEtBQUcsQ0FBQztBQUNyQiIsImZpbGUiOiJhY3Rpdml0aWVzL3BpY2suanMiLCJzb3VyY2VSb290IjoibGliL2VzNiIsInNvdXJjZXNDb250ZW50IjpbInZhciBBY3Rpdml0eSA9IHJlcXVpcmUoXCIuL2FjdGl2aXR5XCIpO1xudmFyIHV0aWwgPSByZXF1aXJlKFwidXRpbFwiKTtcbnZhciBEZWNsYXJhdG9yID0gcmVxdWlyZShcIi4vZGVjbGFyYXRvclwiKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKFwiLi4vY29tbW9uL2Vycm9yc1wiKTtcblxuZnVuY3Rpb24gUGljaygpIHtcbiAgICBEZWNsYXJhdG9yLmNhbGwodGhpcyk7XG59XG5cbnV0aWwuaW5oZXJpdHMoUGljaywgRGVjbGFyYXRvcik7XG5cblBpY2sucHJvdG90eXBlLnZhcnNEZWNsYXJlZCA9IGZ1bmN0aW9uIChjYWxsQ29udGV4dCwgYXJncykge1xuICAgIGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc2V0KFwiX19jb2xsZWN0UGlja1wiLCB0cnVlKTtcbiAgICAgICAgY2FsbENvbnRleHQuc2NoZWR1bGUoYXJncywgXCJfYXJnc0dvdFwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNhbGxDb250ZXh0LmNvbXBsZXRlKFtdKTtcbiAgICB9XG59XG5cblBpY2sucHJvdG90eXBlLl9hcmdzR290ID0gZnVuY3Rpb24gKGNhbGxDb250ZXh0LCByZWFzb24sIHJlc3VsdCkge1xuICAgIGNhbGxDb250ZXh0LmVuZChyZWFzb24sIHJlc3VsdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGljaztcbiJdfQ==