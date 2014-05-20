var Activity = require("./activity");
var util = require("util");
var Declarator = require("./declarator");
var ex = require("./ActivityExceptions");

function Pick()
{
    Declarator.call(this);
    this.asReserved("_argsGot");
}

util.inherits(Pick, Declarator);

Pick.prototype.varsDeclared = function (context, args)
{
    if (args && args.length)
    {
        this.__collectPick = true;
        this.schedule(args, "_argsGot");
    }
    else
    {
        this.complete([]);
    }
}

Pick.prototype._argsGot = function(context, reason, result)
{
    this.end(reason, result);
}

module.exports = Pick;
