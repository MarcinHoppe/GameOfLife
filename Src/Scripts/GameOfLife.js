/// <reference path="knockout-3.1.0.js" />
'use strict';

function LifeViewModel() {
    var self = this;

    self.game = new Game(25);
    self.shouldAllowStart = ko.observable(true);

    self.start = function () {
        self.shouldAllowStart(false);
        setInterval(self.game.makeStep, 500);
    };
}

function Game(size) {
    var self = this;

    self.rows = makeRows(size);

    self.makeStep = function () {
        var current = scan(self.rows),
            next = update(current);
        render(self.rows, next);
    };
}

function scan(rows) {
    var current = [];
    rows.forEach(function (row) {
        var currentRow = [];
        row.cells.forEach(function (cell) {
            currentRow.push(cell.valueOf());
        });
        current.push(currentRow);
    });
    return current;
}

function update(current) {
    var next = [];
    current.forEach(function (currentRow, i) {
        var nextRow = [];
        currentRow.forEach(function (currentCell, j) {
            var nextCellValue = 0;
            var neighbours = [
                { row: i - 1, column: j - 1 },
                { row: i - 1, column: j     },
                { row: i - 1, column: j + 1 },
                { row: i    , column: j - 1 },
                { row: i    , column: j     },
                { row: i    , column: j + 1 },
                { row: i + 1, column: j - 1 },
                { row: i + 1, column: j     },
                { row: i + 1, column: j + 1 }
            ];
            neighbours.forEach(function (cell) {
                if (current[cell.row] !== undefined &&
                    current[cell.row][cell.column] !== undefined) {
                    nextCellValue += current[cell.row][cell.column];
                }
            });
            nextRow.push(nextCellValue);
        });
        next.push(nextRow);
    });
    return next;
}

function render(rows, next) {
    rows.forEach(function (row, i) {
        row.cells.forEach(function (cell, j) {
            if (next[i][j] === 3) {
                cell.isAlive(true);
            } else if (next[i][j] === 4) {
                // Retain state.
            } else {
                cell.isAlive(false);
            }
        });
    });
}

function makeRows(count) {
    var result = [];
    for (var i = 0; i < count; ++i) {
        result.push({
            cells: makeCells(count)
        });
    }
    return result;
}

function makeCells(count) {
    var result = [];
    for (var i = 0; i < count; ++i) {
        result.push(new Cell());
    }
    return result;
}

function Cell() {
    this.isAlive = ko.observable(false);
    this.toggle = function () {
        this.isAlive(!this.isAlive());
    };
    this.valueOf = function () {
        return this.isAlive() ? 1 : 0;
    };
}

ko.applyBindings(new LifeViewModel());