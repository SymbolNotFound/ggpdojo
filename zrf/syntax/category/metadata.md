---
title: "ZRF Keywords Category / Metadata"
author: Kevin Damm
prev: false
next: players
---

# Metadata Keywords

These keywords exist to provide structure to the other expressions or provide
information about the game itself, such as its title and helpful text.

**<dt> [`game`](/zrf/syntax/game) </dt>**
<dd>
A game definition is a required top-level s-expression, and the only one other
than [`variant`](/zrf/syntax/game-variant) to be seen at the top (global) scope.
</dd>

**<dt> [`title`](/zrf/syntax/title) </dt>**
<dd>
Appears in `game` and `variant` expressions, associates the game with a string
that is displayed wherever the game's title is mentioned, including the game
menu items and in the window's title bar during play.

A hyphen `-` as the variant's entire title string will be interpreted as a line
separator within the variant section of the game selection menu.  This is for
organizational/layout purposes only, so the rest of the variant definition can
be empty, Zillions will treat it as ornamental.
</dd>

**<dt> [`description`](/zrf/syntax/description) </dt>**
<dd>
The description expression has one argument, a string of text to appear when
the user opens the Help:Description menu in the Game UI.  This text sould be
informative enough for deciding whether to play it, and should be written with
accessibility in mind as it may be the primary representation used by a screen
reader.

See `history` and `strategy` for expressions where additional descriptive
information can be provided.
</dd>

**<dt> [`history`](/zrf/syntax/history) </dt>**
<dd>
Metadata expression like `description` and `strategy`, it gives background to
the origin of the game, its other names and what is known about its ancestors.
</dd>

**<dt> [`strategy`](/zrf/syntax/strategy) </dt>**
<dd>
An expression within `game` or `variant` that gives a human-readable description
of winning strategies and game features worthy of evaluating.  Not suitable for
the Zillions game AI but perhaps useful to a hybrid (LLM + GGP) player.
</dd>

**<dt> [`help`](/zrf/syntax/help) </dt>**
<dd>
Appears within a [`piece`](/zrf/syntax/piece) expression to associate status bar
help with a piece type.  It expects only one argument, the string of help text.
</dd>

**<dt> [`variant`](/zrf/syntax/game-variant) </dt>**
<dd>
A top-level expression that defines a game in terms of how it differs from
another `game` found within the same file.
</dd>

## Related Categories

**<dt> [`players`](/zrf/category/players) </dt>**
<dd>

</dd>

**<dt> [`board`](/zrf/category/board) </dt>**
<dd>
The `board` definition is necessary to representing the game's state.  Both the
topology (connectedness) and visual representation (graphics) are defined here.
The `pieces` and goals (`-condition`s) each depend on the board representation
as well.

In earlier versions of *Zillions of Games* there could only be one board (when
two `board` expressions existed it would result in only the second one being
recognized), but it is now possible to represent more than one board within
the same game definition, as long as positional and connection tests still pass.
</dd>

<dt> [`pieces`](/zrf/category/pieces) </dt>
<dd>
The equipment definitions in the `pieces` expression are fundamental to the game
by embodying the actions each player may take.
</dd>

<dt> [`goals`](/zrf/category/goals) </dt>
<dd>
Expressions which define win-/loss-/draw-conditions also relate to the structure
of the game.
</dd>

<!--
<dt> [``](/zrf/syntax/) </dt>
<dd>
</dd>
-->

