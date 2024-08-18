---
title: Datalog - Logic Programming
author: Kevin Damm
---

# Logic Programming

The process of applying mathematical logic to computation as a model composed
of declarative statements is
[Logic Programming](https://en.wikipedia.org/wiki/Logic_programming).  These
declarative statements are "rules" and represent knowledge about the domain.
They may be relations, (constant) objects, or functions.  They may contain
additional relations as parameters or variables which, after unifying with other
rules, represent additional rules or relations.

Because these rules are declarative, not procedural, the process of interpreting
them is up to the engine doing the goal search.  There are three distinct ways
to do this, each belonging to a family of logic programming languages: datalog,
Prolog and Answer Set Programming (ASP).
  
**Datalog** is popular in the study of relational databases and more generally
in data integration and program analysis, it is characterized by a bottom-up
search instead of Prolog's top-down approach.  This means that some problems
which will lead to an infinite loop in Prolog are actually solvable with datalog
However, datalog programs having negated clauses pose a significant challenge.

The following will focus on datalog because it's the language family that GDL
was modeled on, but the overall process of *unification* which the majority of
this essay is focused on, has equivalent semantics across these languages.  The
competitive General Game Players that have participated in contests such as
[the International General Game Playing Competition](http://logic.stanford.edu/ggp/readings/retrospective.html)
and
[the AAAI/IJCAI General Game Playing competition (PDF)](https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/2475/2361)
come from all three of these language families.

Learning either Prolog or ASP would equip you to think about building an agent
able to reason about rules as defined with datalog syntax.  The other two
language families have additional syntax, and Prolog adds a kind of procedural
search operation that makes the order of rules, and the order of clauses
within those rules, dictate what model comes out.  Prolog may even run into
an infinite loop where datalog- and ASP-based systems would otherwise succeed.

ASP is much closer to datalog in its operational semantics (it is the direct
result of evaluating datalog using the *stable model* semantics and *Negation
as Failure* to handle negated clauses).  However, it also adds 



## Inference via Rules

The rules that make up datalog are either *facts* or *inferences*.  A relation
by itself like `person(socrates)` is a fact, added to the knowledge base solely
for being stated on its own.  Other rules are composed of a constant or variable
relation (the *head*) and one or more relations combined with `&` (the *body*)
with the operator `:-` which strictly means "entails" but is often read as "if"
or "when".

The typical interpretation is that when everything in the body is unified with
statements from the knowledge base, the resulting head (with similar
substitutions) is also added to the knowledge base.  So, for example:

> `mortal(P) :- person(P)`

combined with the earlier example will automatically result in the inference of
`mortal(socrates)`.  This may be query-directed with `?-mortal(A)` to find all
atoms that may be in the relation `mortal`.   Reasoners that operate top-down
will use the head of this rule to direct the search toward relations that match
`person` and so on through additional rules if necessary.  Reasoners that
operate bottom-up will start with ground facts and move through the rules that
they are a body of until inferring a head that matches the query.


## Sentences

A *sentence* is a sequence of terms, beginning with a name and followed by its
parameters as comma-separated terms.  Each term may be a symbol (or atom), a
number, a variable, or a sentence (a subordinate relation).  Semantically, these
sentences may represent functions, objects or relations.  Which type they have
is determined by the context -- the syntax does not make any distinction between
these three types.


## Goals

...TODO


## Unification

...TODO

### Variables

...TODO


### Relations with Relations

...TODO


### Clauses with Clauses

...TODO


### Constant with Itself

...TODO


## Knowledge Base

### Data Types

...TODO


## Goal Proving

...TODO



## Comparision with Prolog

...TODO 

 - **Prolog**: probably the most well-known of the logic programming families,
   it performs a top-down search, assisted with backtracking and shaped by `!`,
   a "cut" operator that informs the search when not to backtrack further. 
   It is quite popular for use in theorem-proving problems.
 

## Comparision with ASP (Answer Set Programming)

...TODO

 - **ASP**: Answer Set Programming is based on the "stable model" semantics of
   logic programming and many Answer Set solvers are an enhancement of the DPLL
   algorithm (originally intended for solving CNF-SAT, the satisfiability of
   propositional logic in conjunctive normal form).  It will always terminate,
   unlike Prolog, and is usually applied to NP-Hard (difficult) search problems.
   A notable addition to languages in this family is the `choice` rule formatted
   as `{p,q,r}` which allows for choosing any of the atoms `p`, `q` or `r` and
   any combination of these (that is, 2<sup>3</sup> = 8 possible ways to satisfy
   this constraint) when searching the model space for valid answers.
