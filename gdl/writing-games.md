# Writing Games in the Game Description Language (GDL)

GDL was created by Stanford University Logic Group to aid in competitions for
General Game Playing research.  It comes in two formats -- prefix notation
(which follows Knowledge Interchange Format, i.e. KIF) and infix notation
(which is also called HRF for "human readable format").  This tutorial will use
the infix notation (HRF) but it is pretty straightforward to convert one format
into the other.  See [HRF vs. KIF](/gdl/hrf-vs-kif) for more details.

:::info Note:
I am following the same overall structure as the "writing-games" for the other
languages on this site ([ZRF](/zrf/writing-games), [Ludii](/ludii/writing-games),
[GGDL](/ggdl/writing-games)): starting with a rough outline of the typical shape
of a game definition then covering each section in a little more detail, with
examples.  There are keyword-specific pages for the dozen or so reserved words
and operators.  All content was written by me but takes significant inspiration
from [Stanford's GGP site](http://ggp.stanford.edu/public/lessons.php) and
[GGP.org](http://ggp.org).

Special thanks to Michael Genesereth for designing GDL and making many GGP
resources publicly available.  Thanks also to Alex Landau for the reference
implementation of a GGP Game Master and Client and making it open source via
GitHub, thanks to Sam Schreiber for maintaining the website for ggp.stanford.edu
and related tools, and thanks to everyone else involved in graciously providing these pieces of documentation and source code.
A lot of design decisions that I made for GGDL were influenced by the work
provided by these individuals.
:::

Game rules in GDL are written in text files usually ending in .kif or .hrf to
indicate the formatting of the rules descriptions.  The language is a variant
of [datalog](https://en.wikipedia.org/wiki/Datalog) with some Dynamic Logic
Programming added to handle updating the game state from player actions and
random outcomes.  There is no specific compilation step but game players do
typically transform the game description into an internal format that is more
convenient for doing search or validation over, such as PropNets or flattening
and grounding the logical terms.  We won't be covering that here, but you can
refer to this
[language specification](https://www.cs.uic.edu/~hinrichs/papers/love2006general.pdf)
and the [GGP book on Stanford's site](http://logic.stanford.edu/ggp/chapters/cover.html).
You can also check your games through the web UI for a
[rules checker](http://epilog.stanford.edu/sierra/sierra.html)
or run your code and UI through the
[style checker](http://gamemaster.stanford.edu/homepage/stylechecker.php)

## Basic Structure of a Game {#basic-structure}

Games do not have a required ordering but there is a standard convention for
which sections appear in top-to-bottom order:

```gdl-hrf
%% roles and base relations

%% initialization and constants

%% legal moves and their consequences

%% terminal conditions and goal payouts

%% views and enumerations
```

The [comment](/gdl/syntax/comments) character is `%` and you will often see it
doubled or tripled, as well as being used as a horizontal-rule to separate
entire sections.  You won't see it mentioned at all in the documentation, and in
example games you will always see it doubled or tripled (likewise for KIF
formatted games where the comment character is `;` -- only one is necessary but
they are almost always tripled, sometimes doubled).  You would have to look at
the grammar definition and unit tests for ggp.org's Java code or assume this
from datalog's handling of `;` to know otherwise.

Other punctuation includes `(` `)` for wrapping the parameters of relations,
`,` for separating those parameters when there are more than one, 

The rest of this tutorial is organized in the same order as these sections:

 - First the [player roles](#roles) for the game,
   as well as any [base relations](#base)
 - then any [initialization](#init) and constant relations
 - followed by the [actions](#actions) available to players,
   based on the current game state
 - at least one [terminal](#terminal) rule
   and one or more [goal](#goals) relations for determining rewards
 - and finally any [views and enumerations](#views-enums)

That last part is due to GDL not having any arithmetic capacity, all numeric
representation and processing must be defined explicitly (typically by a form
of Peano arithmetic, successors of successors of ... of 1).  In practice this
is not too tedious but it does limit the scale that games can grow to, and
limits the ease of coding up mathematical games.  Adding arithmetic to logic
is not so easily done without running amok with non-decidability demons, but
that's a topic for a different document.


## A very simple game (Janken) {#rules-janken}

Before getting into the particulars of each of these sections, let's examine a
very simple game: rock-paper-scissors, a.k.a. Roshambo, a.k.a. Janken.

```gdl-hrf
%% A two-player game, players move simultaneously in GDL.
role(left)
role(right)

%% The `show` relation connects a player to their hand selection.
base(show(Role, Hand)) :- role(Role) & hand(Hand)

%% Each player's only available move is to choose one of the hand gestures.
action(play(Hand)) :- hand(Hand)
legal(play(Hand))

next(show(Player, Hand)) :- does(Player, play(Hand))

%% The game ends when players have played different hands.
terminal :-
  show(left, Lhand) &
  show(right, Rhand) &
  distinct(Lhand, Rhand)

%% Game winnings are all-or-nothing, there is no 'draw' outcome
goal(Player, 100) :- win(Player)
goal(Player, 0) :- role(Player) & ~win(Player)

%% View definition for determining if a player role has won.
win(Role) :- role(Role) &
  role(Other) & distinct(Role, Other) &
  show(Role, RHand) & show(Other, OHand) &
  better(RHand, OHand)

%% Enumeration of available hand gestures.
hand(ROCK)
hand(PAPER)
hand(SCISSORS)

%% Relative importance of hand gestures (for victory conditions).
better(PAPER, ROCK)
better(SCISSORS, PAPER)
better(ROCK, SCISSORS)
```

The simplicity of the game rules and the symmetry of game play makes this a good
example to start with, but don't worry if the above looks a little confusing
even if you've seen other programming languages, and even if you've seen other
variants of logic programming languages like Prolog.  The language is most like
`datalog` with a few special keywords for enabling turn-based gameplay.

If you're coming from another language and are used to seeing `if (...) { ... }`
conditional expressions, the above may look very weird indeed.  There are three
operators that stand out: `:-`, `&` and `~`.  The other thing to pay attention
to is the initial letter of symbols (atoms) being uppercase or lowercase.  If
the first letter is Uppercase then that symbol is a variable and may be replaced
with a more concrete value (either a lowercase symbol or a number).  More about
that in the section about [unification](#unification).

 - `~` is the boolean negation operator, so `~q(Y)` means that there is no
   evidence that `q(Y)` is true.  This means that the game rules don't have to
   indicate when `~q(Y)` is true, only when `q(Y)` holds and the rest is
   determined by what is called "Negation as Failure" (NaF).

 - `&` is as you have probably guessed, an 'and'ing of terms, or conjunction.
   There may be both positive and negated terms combined with `&` and there is
   no limit to how many terms may be and-ed together, but you will only see it
   on the right-hand side of an `:-` operator.

 - `:-` is the entailment operator and `p(X) :- q(Y)` means `p(X)` is true when
   `q(Y)` is true.  You may have negated terms on the right hand side, but GDL
   (and "safe" expressions in datalog) have the requirement that any variable
   in a negated term must also appear in a positive term elsewhere in the rule.

A GDL runtime will assume simultaneous play, which for the above example is
convenient as both players will show their hand at the same time.  The game
manager can withold each player's move until they are both collected and then
decide the outcome (keep playing, or declare a victor).  For games where players
alternate turns, this can be accommodated by giving one player control with a
special relation that updates on each turn (an example of this is given at the
end, using Tic-Tac-Toe).

There are only about a dozen keywords (compared to about 120+ keywords in ZRF).
This may seem a deficiency, and indeed there are no graphics/sounds/animation
keywords for assisting in rendering the game UI, but the simplicity of syntax
actually contains the potential for a large variety of game types.  Now that
we've covered some of the basics of the syntax, let's look at each part of the
game to see how a full game definition is expressed.


### Players {#roles}

Perhaps the most important part of any game: the players.  Every GDL definition
is explicit about the number of players involved and what kinds of actions they
can perform.  Games with a variable number of players (like most card games)
will need to have separate definitions for 3-, 4-, 5-... player games.

Player roles are specified with the [role](/gdl/syntax/role) keyword which takes
a single argument, used for identifying the role:

```gdl-hrf
role(robot)
```

In GDL-II there is a special role named `random` which can be used to provide
non-deterministic selection.  For example, a roll of a pair of six-sided dice
could define valid actions for this role and select from them arbitrarily as
part of each turn.

```gdl-hrf
role(random)

d(1)
d(2)
d(3)
d(4)
d(5)
d(6)

action(roll(X, Y)) :- d(X) & d(Y)
next(rolled(X, Y)) :- does(random, roll(X, Y))
```

This behavior can actually be added without adding any changes to the runtime
because the default behavior of the Game Manager with an invalid action (or a
timeout in responding) is to chose randomly among the valid actions for that
player.  The server may recognize this `random` name and avoid the need for
waiting until timeout or for sending intentionally bogus actions on behalf of
this player, but in either case the other players can assume `random` will take
actions by selecting from available options uniformly, with equal likelihood.


### Base relations {#base}

TODO

[`base`](/gdl/syntax/base)


### Initialization {#init}

TODO

[`init`](/gdl/syntax/init)


### Action specifications {#actions}

TODO

[`input`](/gdl/syntax/input)

[`does`](/gdl/syntax/does)

[`next`](/gdl/syntax/next)


### Terminal conditions {#terminal}

TODO

[`terminal`](/gdl/syntax/terminal)


### Goals / Rewards {#goals}

TODO

[`goal`](/gdl/syntax/goal)


### Views and Enumerations {#views-enums}

TODO


## Tic-Tac-Toe game definition {#rules-tic-tac-toe}

Let's take a look at another game definition, this time one where the players
alternate turns.  This is also the game used in other "writing games" tutorials
here, so it makes for a good comparison.

```gdl-hrf

```


