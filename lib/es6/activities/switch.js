"use strict";

let Activity = require("./activity");
let util = require("util");
let _ = require("lodash");
let Case = require("./case");
let When = require("./when");
let Default = require("./default");
let errors = require("../common/errors");
let constants = require("../common/constants");

function Switch() {
    Activity.call(this);

    this.expression = null;
}

util.inherits(Switch, Activity);

Switch.prototype.run = function (callContext, args) {
    if (args && args.length) {
        let parts = {
            cases: [],
            whens: [],
            default: null
        };
        for (let arg of args) {
            if (arg instanceof Case) {
                parts.cases.push(arg);
            }
            else if (arg instanceof When) {
                parts.whens.push(arg);
            }
            else if (arg instanceof Default) {
                if (parts.default === null) {
                    parts.default = arg;
                }
                else {
                    throw new errors.ActivityRuntimeError("Multiple default for a switch is not allowed.");
                }
            }
        }
        if (parts.cases.length || parts.whens.length || parts.default) {
            this._parts = parts;
            if (parts.cases.length) {
                this._doCase = true;
                callContext.schedule(this.expression, "_expressionGot");
            }
            else {
                this._doCase = false;
                callContext.activity._step.call(this, callContext);
            }
            return;
        }
    }
    callContext.complete();
};

Switch.prototype._expressionGot = function (callContext, reason, result) {
    if (reason === Activity.states.complete) {
        this.expression = result;
        callContext.activity._step.call(this, callContext);
    }
    else {
        callContext.end(reason, result);
    }
};

Switch.prototype._step = function (callContext) {
    let parts = this._parts;
    let doCase = this._doCase;
    if (doCase && parts.cases.length) {
        let next = parts.cases[0];
        parts.cases.splice(0, 1);
        callContext.schedule(next, "_partCompleted");
    }
    else if (!doCase && parts.whens.length) {
        let next = parts.whens[0];
        parts.whens.splice(0, 1);
        callContext.schedule(next, "_partCompleted");
    }
    else if (parts.default) {
        callContext.schedule(parts.default, "_partCompleted");
    }
    else {
        callContext.complete();
    }
};

Switch.prototype._partCompleted = function (callContext, reason, result) {
    if (reason === Activity.states.complete) {
        if (result === constants.markers.nope) {
            callContext.activity._step.call(this, callContext);
        }
        else {
            callContext.complete(result);
        }
    }
    else {
        callContext.end(reason, result);
    }
};

module.exports = Switch;