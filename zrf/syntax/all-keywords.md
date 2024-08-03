---
title: ZRF Keyword Index
author: Kevin Damm
prev: false
next:
  text: Keyword Categories
  link: "./category/index"
---

# Alphabetical Index of Keywords

The following terms are considered special language syntax or are built-in
functions provided by the runtime of Zillions of Games.  The following listing
is an alphabetic index; there is also a
[categorical index](/zrf/syntax/category/)
available on this site.

**<dt>[`;`(comments)](/zrf/syntax/comments)</dt>**
<dd>
Any line that begins with `;` as well as any text appearing after a `;` is
considered a comment by Zillions of Games and ignored when running the game.
</dd>

**<dt>[`add`](/zrf/syntax/add)</dt>**
<dd>
</dd>

**<dt>[`board`](/zrf/syntax/board)</dt>**
<dd>
</dd>

**<dt>[`board-setup`](/zrf/syntax/board-setup)</dt>**
<dd>
</dd>

**<dt>[`comments`](/zrf/syntax/comments)</dt>**
<dd>
</dd>

**<dt>[`conditions`](/zrf/syntax/conditions)</dt>**
<dd>
</dd>

**<dt>['create'](/zrf/syntax/create)</dt>**
<dd>

</dd>

**<dt> [`description`](/zrf/syntax/description) </dt>**
<dd>
The description expression has one argument, a string of text to appear when
the user opens the Help:Description menu in the Game UI.  This text sould be
informative enough for deciding whether to play it, and should be written with
accessibility in mind as it may be the primary representation used by a screen
reader.

See [`history`](/zrf/syntax/history) and [`strategy`](/zrf/syntax/strategy) for
expressions where additional descriptive information can be provided.
</dd>

**<dt>[`dimensions`](/zrf/syntax/dimensions)</dt>**
<dd>
</dd>

**<dt>[`directions`](/zrf/syntax/directions)</dt>**
<dd>
</dd>

**<dt>[`draw-condition`](/zrf/syntax/draw-condition)</dt>**
<dd>
</dd>

**<dt>[`drops`](/zrf/syntax/drops)</dt>**
<dd>
</dd>

**<dt>[`game`](/zrf/syntax/game)</dt>**
<dd>
A game definition is a required top-level s-expression, and the only one other
than [`variant`](/zrf/syntax/game-variant) to be seen at the top (global) scope.
</dd>

**<dt>[`help`](/zrf/syntax/help)</dt>**
<dd>
Appears within a [`piece`](/zrf/syntax/piece) expression to associate status bar
help with a piece type.  It expects only one argument, the string of help text.
</dd>

**<dt> [`history`](/zrf/syntax/history) </dt>**
<dd>
Metadata expression like `description` and `strategy`, it gives background to
the origin of the game, its other names and what is known about its ancestors.
</dd>

**<dt>[`image`](/zrf/syntax/image)</dt>**
<dd>
</dd>

**<dt>[`loss-condition`](/zrf/syntax/loss-condition)</dt>**
<dd>
</dd>

**<dt> [`name`](/zrf/syntax/name) </dt>**
<dd>
Names a [`piece`](/zrf/syntax/piece) type.

Also may name a [`zone`](/zrf/syntax/zone) on a [`board`](/zrf/syntax/board).
</dd>

**<dt>[`players`](/zrf/syntax/players)</dt>**
<dd>
</dd>

**<dt>[`relative-config`](/zrf/syntax/relative-config)</dt>**
<dd>
</dd>

**<dt>[`stalemated`](/zrf/syntax/stalemated)</dt>**
<dd>
</dd>

**<dt>[`start-rectangle`](/zrf/syntax/start-rectangle)</dt>**
<dd>
</dd>

**<dt> [`strategy`](/zrf/syntax/strategy) </dt>**
<dd>
An expression within `game` or `variant` that gives a human-readable description
of winning strategies and game features worthy of evaluating.  Not suitable for
the Zillions game AI but perhaps useful to a hybrid (LLM + GGP) player.
</dd>

**<dt>[`strings`](/zrf/syntax/strings)</dt>**
<dd>
</dd>

**<dt> [`title`](/zrf/syntax/title) </dt>**
<dd>
Appears in [`game`](/zrf/syntax/game) and [`variant`](/zrf/syntax/variant)
expressions, associates the game with a string that is displayed wherever the
game's title is mentioned, including the game menu items and in the window's
title bar during play.

A hyphen `-` as the variant's entire title string will be interpreted as a line
separator within the variant section of the game selection menu.  This is for
organizational/layout purposes only, so the rest of the variant definition can
be empty, Zillions will treat it as ornamental.
</dd>

**<dt> [`variant`](/zrf/syntax/variant) </dt>**
<dd>
A top-level expression that defines a game in terms of how it differs from
another [`game`](/zrf/syntax/game) found within the same file.
</dd>

**<dt>[`win-condition`](/zrf/syntax/win-condition)</dt>**
<dd>
</dd>
