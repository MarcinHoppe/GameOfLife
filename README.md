Conway's Game of Life
=====================

User stories
------------

 - As a user I want to see an empty board at startup so that I could begin a new game.
 - As a user I want to select and deselect cells on the board so that I could set the inital configuration.
 - As a user I want to start the game so that I could see how the configuration evolves.

Design
------

 - The UI is an HTML page. The models is pure JavaScript code.
 - The model and the UI are bound together using KnockoutJS view model.
 - The board is rendered as an HTML table.
 - View model exposes observables for rows (bound to &lt;tr&gt; elements) and for columns (bound to embedded &lt;td&gt; elements).
 - The start button triggers the simulation (setInterval).
  - There is no way to pause or stop the simulation other than refreshing the page. In such case the configuration is lost.
 - The simulation is a function invoked as a callback passed to setInterval.
 - The simulation function implements the logic of Conway's Game of Life and updates the observables.
 - KnockoutJS binding automatically updates proper &lt;td&gt; elements in the table.


Alternative design considered
-----------------------------
 - WPF app similar to Langton's Ant.
 - This would require a view model to be created and coded by hand.

