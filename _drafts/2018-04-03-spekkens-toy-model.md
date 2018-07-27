---
layout: post
title: The Spekkens toy model
---




Last time I talked a bit about this paper by van Enk that I’m concentrating on understanding this year. This paper is an extension of a more well-known paper by Robert Spekkens, which is a favourite of mine. It introduces a very simple toy model - literally just four boxes and a rule about how much knowledge we can obtain - which reproduces a number of the counterintuitive features of quantum mechanics (not all of them though). This month I’m just going to introduce the basic setup of the model that’s needed to understand the van Enk model - I won’t really get on to what you can do with it. I will however include a sidenote to demonstrate what they are.<label for="test-sidenote" class="margin-toggle sidenote-number"></label><input type="checkbox" id="test-sidenote" class="margin-toggle"/><span class="sidenote">This is a sidenote.</span>

None of this section requires an understanding of quantum mechanics. It’s just a thing that could be in one of four boxes.

We can think of these four boxes as being arranged in a fully Ribbonfarm-compliant 2x2 as follows:

{% include image.html img="assets/boxes.svg" caption="Will this work?" title="yes it will" %}

The system is in one of these four states (labelled the ontic states as they correspond to what’s actually there). But an observer might not know the exact state, so an observer also has an epistemic state representing their knowledge of the system, which takes the form of a probability distribution over the four states. For example, they might just have no idea what state it’s in:

{% include image.html img="assets/boxes_equal_prob.png" caption="Will this work?" title="yes it will" %}

So in this case their epistemic state just assigns ¼ probability to each box.

The core of the Spekkens model is that the observer is unable to know the true ontic state. This is just assumed as a basic axiom of the model, the Knowledge Balance Principle, which states that

> At most you can obtain half the knowledge of the system.

We need to be able to quantify what we mean by knowledge, but fortunately in this case we can pick something pretty simple. There are four boxes, so two yes/no questions would be enough to pick out one ontic state for definite. Spekkens defines three canonical yes/no questions, which are the following:

<ol start="0">
  <li>Is it in the top two boxes?</li>
  <li>Is it in the left hand two boxes?</li>
  <li>Is it in the two boxes making up the top-left/bottom-right diagonal?</li>
</ol>

(I’m starting from 0 to match what van Enk does later.)
I’ve drawn the six canonical epistemic states corresponding to all of the possible answers to one question below:

{% include image.html img="assets/epistemic_states.svg" caption="Will this work?" title="yes it will" %}

Now if you obtained the answer to any two of these questions, you’d know the ontic state for certain, which is against the Knowledge Balance Principle. So in practice, the principle means that you can only learn the answer to one question.

(The model manages this by shuffling the ontic state around after each question in a way that stops you ever learning everything. That gives rise to some ‘dynamics’ for the system. But that’s not particularly relevant right now.)

Pictures are more fun than algebra, but sometimes algebra is preferable for actually calculating shit. So the van Enk model formalises all this stuff into algebra instead of boxes. He defines two variables $$X_a$$ and $$X_b$$, which can take two values, 0 or 1. I’ve drawn these on the boxes as follows:

{% include image.html img="assets/boxes_questions.svg" caption="Will this work?" title="yes it will" %}

So then the canonical questions become

0. Does $$X_a = 0$$?
1. Does $$X_b = 0$$?
2. Does $$X_a + X_b = 0$$?

Now question 3 might look wrong… if $$X_a = 1$$ and $$X_b = 1$$, as in the bottom right cell, then the answer should be 2. But the other feature of the formalisation is that we work mod 2, so that 1 + 1 = 0.

Next van Enk introduces some probabilities $$Q_0$$, $$Q_1$$, $$Q_2$$, for each of the three questions 0. to 2. If we know for sure that the answer to the first question is 0, he writes this as $$Q_0(0) = 1$$. (At the same time, we’d also know that $$Q_0(1) = 0$$, as it the answer definitely isn’t 1.)

The six canonical epistemic states are then formalised as sets of answers to the three questions, where you know one for certain and have basically no idea about the other two. E.g. ‘it’s in the top two boxes’ corresponds to the set

$$Q_0(0) = 1$$

$$Q_1(0) = \frac{1}{2}$$

$$Q_2(0) = \frac{1}{2}$$

This is unnecessarily complicating things for the original Spekkens model, which just uses the six canonical states. For those, you may as well just draw the boxes. But van Enk’s extension of the model is basically something like ‘what if we ask a bit of question 1, a bit of question 2 and a bit of question 3, such that somehow we end up with half the knowledge total?’ In this case there could be all sorts of values for Q_0, Q_1 and Q_2 as long as the knowledge requirement is satisfied.

However at this point, we also need to get more sophisticated about the definition of knowledge. This is the tricky bit of the van Enk paper and I spent some time thinking about it this month...





