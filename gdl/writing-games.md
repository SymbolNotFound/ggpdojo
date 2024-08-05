# Writing Games in Game Description Language (GDL)

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

## Basic Structure of a Game

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
they are almost always tripled, sometimes doubled).  You have to look at the
grammar definition and unit tests for ggp.org's Java code to know otherwise.

The rest of this tutorial is organized in the same order as these sections:

 - First the [player roles](#roles) for the game,
   as well as any [base relations](#base)
 - then any [initialization](#init) and constant relations
 - followed by the [actions](#actions) available to players,
   based on the current game state
 - at least one [terminal](#terminal) rule
   and associated [goal](#goals) relations
 - and finally any [views](#views) and explicit [enumerations](#enums)

That last part is due to GDL not having any arithmetic capacity, all numeric
representation and processing must be defined explicitly (typically by a form
of Peano arithmetic, successors of successors of ... of 1).  In practice this
is not too tedious but it does limit the scale that games can grow to, and
limits the ease of coding up mathematical games.  Adding arithmetic to logic
is not so easily done without running amok with non-decidability demons, but
that's a topic for a different document.


## A very simple game (Janken)

Before getting into the particulars of each of these sections, let's examine a
very simple game: rock-paper-scissors, a.k.a. Roshambo, a.k.a. Janken.

```gdl-hrf

```

TODO

