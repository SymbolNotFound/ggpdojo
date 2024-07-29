# Writing Your Own Zillions Game

:::info Note:
This tutorial is based on a document published in May 2003, copyright
[Zillions Development Corp.](https://www.zillions-of-games.com/zildev.html)
and authored by Jeff Mallett.  I obtained a copy as a PDF,
shared on Duke University computers which had all of its links
unreferenced, both internal and external (there is an evident
marker of this being the result of a "print:save-as-PDF" action).

Because there are otherwise scant available resources for Zillions
development and I think it provides useful insight for building
General Game Players as well as for General Game Playing language
design, I have converted it to Markdown.  I manually updated the
links between topics and the language specifics, especially all
of the keywords and built-in functions available for ZoG 2.0
(including deprecated keywords from version 1.3).  I also did 
significant editing, retaining the author's voice but reducing
repetitions and correcting typos, as well as re-structuring and
layout of the entire document for a blog + wiki website format.

I believe this additional work and supplemental content justifies
hosting the document here in this form.  Acknowledgement and thanks
to the original author
[Jeff Mallett](https://www.chessprogramming.org/Jeff_Mallett)
for writing the base content
and to *Zillions Development Corp.* for their development of the
language and software.  I think it is especially interesting to
compare their approach to similar General Game Playing tools such
as GDL (and GDL-II), CGDL, RBG, Ludii, OpenSpiel and others.
:::


The rules for a game are stored in a Zillions Rules File.  These files end with
a ".zrf".  Zillions loads the ZRF file, and uses it to find out how to run the
game.  ZRF files have 4 main parts: the board, the pieces, the goals of the
game, and additional information like history and strategy.

You can use any common text editor (Notepad, vim, VSCode) to create your new
game.  Make sure to save your game with a ".zrf" ending and save as a text file.


## Basic Structure of a Game

This tutorial is organized similar to the typical structure for a Zillions
[game](/zrf/syntax/game):

 - First the game's [players](#player-info),
   as well as [helpful and descriptive](#help) information
 - Followed by the [board information](#board-info)
 - Then, all [information about pieces](#piece-info)
 - And finally, [goal conditions](#goal-info) of the game

```zrf
(game
  ; ... players
  ; ... board
  ; ... pieces
  ; ... goals
)
```


There are some important things to note about the overall format.  Firstly, you
will want to pay careful attention to match **parentheses** when writing a
Zillions Rules File (ZRF).  The parentheses are used to group sections together,
so use a `)` for every `(` you type.

Notice that some lines begin with (or contain) a semi-colon (`;`) character.
This indicates that the rest of the line is a [comment](/zrf/syntax/comments)
and will be ignored when Zillions loads this ZRF.  Comments may begin on the
same line as other code, and only the portion after the semicolon is ignored by
Zillions.  It is a good idea to use lots of comments in your ZRF to make it
easier to understand (for others, and for your future self).

Consistent **indentation** also makes your program easier to read.  Zillions, on
the other hand, doesn’t care about this either.  It ignores all tabs and spacing
equally.  The exception is in [strings](/zrf/syntax/string), delimited with `"`
(double-quotation marks), which we’ll get to shortly.


## About the Game {#help}

OK, let's add a little more to our game:

```zrf
(game
  (title "Tic-Tac-Toe")
  (description "One side takes X's and the other side takes O's.
    Players alternate placing their marks on open spots.
    The object is to get three of your marks in a row horizontally,
    vertically, or diagonally. If neither side accomplishes this,
    it's a cat's game (a draw).")
  (history "Tic-Tac-Toe was an old adaptation of Three Men's Morris to
    situations where there were no available pieces. You can draw or
    carve marks and they are never moved. It is played all over the
    world under various names, such as 'Noughts and Crosses' in
    England.")
  (strategy "With perfect play, Tic-Tac-Toe is a draw. Against less
    than perfect opponents it's an advantage to go first, as having an
    extra mark on the board never hurts your position. The center is
    the key square as 4 possible wins go through it. The corners are
    next best as 3 wins go through each of them. The remaining
    squares are least valuable, as only 2 wins go through them.
    Try to get in positions where you can `trap` your opponent by
    threatening two 3-in-a-rows simultaneously with a single move. To
    be a good player, you must not only know how to draw as the second
    player, you must also be able to takes advantage of bad play.")
)
```

You can see we have added several sections which describe the game.  The
[title](/zrf/syntax/title) section gives our game a name.  All ZRF games need
names.  A single ZRF can contain multiple games and variants, so always add a title.  In this case, we are programming the game "Tic-Tac-Toe".

Next, you will see sections on
[description](/zrf/syntax/description),
[history](/zrf/syntax/history) and
[strategy](/zrf/syntax/strategy).
This is extra information for the user or other programmers reading the game
definition, to tell them the object of the game, the history of the game, and
provide a suggested strategy for players.


## A Complete Game

```zrf
(game
  (title "Tic-Tac-Toe")
  ; description, history and strategy omitted to save space.

  (players X O)
  (turn-order X O)

  (board
    (image "images\TicTacToe\TTTbrd.bmp")
    (grid
      (start-rectangle 16 16 112 112) ; top-left position
      (dimensions ;3x3
        ("top-/middle-/bottom-" (0 112)) ; rows
        ("left/middle/right" (112 0))) ; columns
        (directions (n -1 0) (e 0 1) (nw -1 -1) (ne -1 1))
      )
    )

  (piece
    (name man)
    (help "Man: drops on any empty square")
    (image
      X "images\TicTacToe\TTTX.bmp"
      O "images\TicTacToe\TTTO.bmp"
    )
    (drops ((verify empty?) add))
  )

  (board-setup
    (X (man off 5))
    (O (man off 5))
  )

  (draw-condition (X O) stalemated)
  (win-condition (X O)
    (or
      (relative-config man n man n man)
      (relative-config man e man e man)
      (relative-config man ne man ne man)
      (relative-config man nw man nw man)
    )
  )
)
```

The above sample is a complete game. You could cut it out and paste it into a
ZRF file, and play it.  Let's look at each of the new sections:

### Players {#player-info}

`(players X O)`

This line tells Zillions the names of the [players](/zrf/syntax/players).  In
this case, there are two players named "X" and "O".  That was easy!

`(turn-order X O)`

This line tells Zillions the turn-order that players move.  In this case, "X"
will move first, and then "O" will move.  After that, the turn order repeats, so
"X" will move again, and so on.

OK, we have told Zillions about the players.
Next let’s tell the program about the board.

### Board {#board-info}

```zrf
(board
  (image "images\TicTacToe\TTTbrd.bmp")
  (grid
    (start-rectangle 16 16 112 112)    ; top-left position
    (dimensions ; 3x3
      ("top-/middle-/bottom-" (0 112)) ; rows
      ("left/middle/right" (112 0))    ; columns
    )
    (directions (n -1 0) (e 0 1) (nw -1 -1) (ne -1 1))
  )
)
```

Use the [board](/zrf/syntax/board) statement to tell Zillions about the board.
The [image](/zrf/syntax/image) statement tells Zillions what bitmap file (*.BMP)
to use to display the board. In this case, the file in
"images\TicTacToe\TTTbrd.bmp" will be used.
You can create new board images using any graphics editor, like Windows Paint.

The "grid" statement makes it easy for you to specify a regularly spaced set of
positions.  The [start-rectangle](/zrf/syntax/start-rectangle) tells Zillions
about a starting position, with the coordinate of its upper left screen position
(16, 16) and the width and height (112 for each).
Points are measured over [x] and down [y] from the window's upper left corner.

The [dimensions](/zrf/syntax/dimensions) section has information about the
placement and name of the positions.  The line
`("top-/middle-/bottom-" (0 112))` tells Zillions the rows will be named "top-",
"middle-" and "bottom-".  To progress downward to the next row, the Y coordinate
will have 112 added to it  The X coordinate will remain unchanged as there is a
`0` in that position.  The next line has `("left/middle/right" (112 0))`. This specifies the column names and offsets.

The [directions](/zrf/syntax/directions) statement indicates the directions
linking each position ("n" for north, "e" for "east" and so on). The numbers
after these names indicated which way to step for that direction.  Use 0 for no
change, or "1" or "-1" to got forward or backward.

When Zillions interprets this "grid" statement, it will combine all this
information to make a three by three grid, with names of positions like
"top-left" and "bottom-right".  Now, how do we specify the pieces of the game?
The "piece" statement, of course!

### Pieces {#piece-info}

```zrf
(piece
  (name man)
  (help "Man: drops on any empty square")
  (image
    X "images\TicTacToe\TTTX.bmp"
    O "images\TicTacToe\TTTO.bmp"
  )
  (drops ((verify empty?) add))
)
```

The [name](/zrf/syntax/name) section gives this piece a name: "man".
The [help](/zrf/syntax/help) section gives the text which Zillions will
automatically display in the Status bar when the user points to the piece.
You should put information about how the piece moves in this section.

The [image](/zrf/syntax/image) section gives the bitmap names for Zillions to
use for each piece and for each player. You can make new piece bitmaps using a
graphics editor like Windows Paint.  Note that any fully green part of the
bitmap will appear as "transparent".

The [drops](/zrf/syntax/drops) section tells Zillions that this piece is dropped
onto the board when it moves. The `(verify empty?)` expression tells Zillions to
make sure a position is empty before [add](/zrf/syntax/add)ing it to the board.

Next, we tell Zillions how many pieces there are, and where they are located at
the start of the game:

```zrf
(board-setup
  (X (man off 5))
  (O (man off 5))
)
```

The [board-setup](/zrf/syntax/board-setup) section tells Zillions that there are
5 men for each player, off the board, at the start of the game.

### Goals {#goal-info}

OK, just one more section, where we tell Zillions the goal(s) of the game.
This is done using [*-condition statements](/zrf/syntax/conditions):

```zrf
(draw-condition (X O) stalemated)
(win-condition (X O)
  (or
    (relative-config man n man n man)
    (relative-config man e man e man)
    (relative-config man ne man ne man)
    (relative-config man nw man nw man)
  )
)
```

The [draw-condition](/zrf/syntax/draw-condition) statement above indicates that
if any side is [stalemated](/zrf/syntax/stalemated) (has no legal moves left),
then the game is a draw.  The [win-condition](/zrf/syntax/win-condition) 
statement is a little more complex, so let's go over it:

After `win-condition` we see `(X O)`, the names of the players which this
condition applies to.  Following that is a disjunction (an s-expression of `or`
where each argument is or-ed together, true if any of the sub-expressions are).

In Tic-Tac-Toe, you can win by aligning three of your marks in a row, column or
diagonal.  The [relative-config](/zrf/syntax/relative-config) statements tell
Zillions that any position where a "man" piece is north of another "man" piece
which is north of a third "man" piece indicates a win.  This line is repeated
for the other three directions.

That’s it. Zillions supports lots more commands and ways to generate moves, add
sound effects and music to your games, and detect more complex winning goals,
but we've covered the basics now.

Look through the [keywords document](/zrf/syntax/) to learn more about these
other Zillions commands.  And remember, there are a host of examples to look at
included with your copy of Zillions of Games.


## Creating Variants

Zillions of Games lets you create game variants with very little work.  Say
you wanted to create a variant of Tic-Tac-Toe where the first player to get
three-in-a-row loses.  The only changes you would need are in the game title,
description and the goal of the game.  Add these lines to our example ZRF file:

```zrf
(variant
  (title "Losing Tic-Tac-Toe")
  (description "This is the same as normal TicTacToe, except that the
    object is NOT to get 3-in-a-row.\\
    One side takes X's and the other side takes O's. Players alternate
    placing their marks on open spots. The object is to avoid getting three of
    your marks in a row horizontally, vertically, or diagonally. If there are
    no 3-in-a-rows, it's a cat's game (a draw).")
  (loss-condition (X O)
    (or
      (relative-config man n man n man)
      (relative-config man e man e man)
      (relative-config man ne man ne man)
      (relative-config man nw man nw man)
    )
  )
)
```

You can see that we have changed the [title](/zrf/syntax/title) and
[description](/zrf/syntax/description) to better describe the new variant,
plus the [win-condition](/zrf/syntax/win-condition) has been changed to a
[loss-condition](/zrf/syntax/loss-condition).

Zillions will use the other sections from the main game description (like the
`players`, `board`, `piece`, etc.) and substitute the changed sections (`title`,
`description` and `loss-condition` in this case).  This allows for simple
variants to be created in a few minutes.


## Graphics

Zillions requires that all piece and board graphics be in .BMP format.  Any
editing program will do for editing BMPs.  For simple graphics, you can use
Paint or shareware programs on the web like PaintShop Pro.

Zillions can read in standard BMP files of any bit depth.  Using 256 color
bitmaps for the boards and full 24 bit bitmaps for the pieces.

Though BMPs are rectangular, most pieces will not be perfectly rectangular and
you’ll need to make the space around the edges of the piece transparent.
Zillions treats pure green (0, 255, 0) as transparent when drawing bitmaps.
Graphics files are specified through the [image](/zrf/syntax/image) statement.


## Randomness

Zillions supports randomness in games through a "random player", a special,
computer-controlled player that chooses its move randomly.  Random players can
be used in many clever ways.

For example, though dice aren’t directly supported in Zillions, a random player
can be made to simulate dice.  You can see this in the rules for Senat, where
the `?Dice-Toss` player is a random player whose moves are the possible outocmes
of rolling a single d6.  Each turn, it arbitrarily chooses between these moves,
effectively rolling a die in the game.

Then the move logic for the next player can be based on which die was rolled.
Multiple dice can be simulated by consecutive moves of random players.  To
denote a random player, start the player's name with a question mark `?`.

Note that this is different than the question mark found at the end of some
built-in keywords (e.g. `exists?`) where it implies a conditional test.
