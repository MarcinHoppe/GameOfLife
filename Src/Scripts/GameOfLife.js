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
        var oldGrid = scan(self.rows),
            newGrid = update(oldGrid);
        render(self.rows, newGrid);
    };
}

function scan(rows) {
    var grid = [],
        i, j;
    for (i = 0; i < rows.length; ++i) {
        grid.push([]);
        for (j = 0; j < rows.length; ++j) {
            grid[i].push(rows[i].cells[j].valueOf());
        }
    }
    return grid;
}

function update(grid) {
    var result = [],
        i, j;
    for (i = 0; i < grid.length; ++i) {
        result.push([]);
        for (j = 0; j < grid.length; ++j) {
            result[i].push(0);
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
                if (grid[cell.row] !== undefined && grid[cell.row][cell.column] !== undefined) {
                    result[i][j] += grid[cell.row][cell.column];
                }
            });
        }
    }
    return result;
}

function render(rows, grid) {
    var i, j;
    for (i = 0; i < rows.length; ++i) {
        for (j = 0; j < rows.length; ++j) {
            if (grid[i][j] === 3) {
                rows[i].cells[j].isAlive(true);
            } else if (grid[i][j] === 4) {
                // Retain state.
            } else {
                rows[i].cells[j].isAlive(false);
            }
        }
    }
}

function makeRows(howMany) {
    var result = [],
        i;
    for (i = 0; i < howMany; ++i) {
        result.push({
            cells: makeCells(howMany)
        });
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
    this.valueOf = function () {
        return this.isAlive() ? 1 : 0;
    };
}

ko.applyBindings(new LifeViewModel());