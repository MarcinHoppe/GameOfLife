/// <reference path="knockout-3.1.0.js" />
'use strict';

function LifeViewModel() {
    var self = this;

    self.game = new Game(25);
    self.shouldAllowStart = ko.observable(true);

    self.start = function () {
        self.shouldAllowStart(false);
        setInterval(self.game.makeStep, 100);
    };
}

function Game(size) {
    this.rows = makeRows(size);
}

Game.prototype.makeStep = function () {
    
}

function makeRows(howMany) {
    var result = [],
        i;
    for (i = 0; i < howMany; ++i) {
        result.push({ cells: makeCells(howMany) });
    }
    return result;
}

function makeCells(howMany) {
    var result = [],
        i;
    for (i = 0; i < howMany; ++i) {
        result.push(new Cell());
    }
    return result;
}

function Cell() {
    this.isAlive = ko.observable(false);
    this.toggle = function () {
        this.isAlive(!this.isAlive());
    };
}

ko.applyBindings(new LifeViewModel());