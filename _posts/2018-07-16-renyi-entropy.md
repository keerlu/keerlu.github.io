---
layout: post
title: Rényi entropy
contents: false
---

(I got interested in this when a funny entropy measure, the collision entropy, popped up in [a paper][enk] I was reading.)

[enk]:https://arxiv.org/abs/0705.2742

The Rényi entropies are a family of entropy measures that includes the well-known Shannon entropy along with a bunch of other more obscure ones that sometimes crop up. For simplicity I'm going to use an example of a system with four states. The probabilities of being in each state are labelled, for example, $$[0.2, 0.1, 0.3, 0.4]$$.

Entropy is connected to how 'spread out' these probabilities are. For example, $$[0.25, 0.25, 0.25, 0.25]$$ is maximally spread out over the four states and has the maximum entropy. At the other end of the scale, $$[1, 0, 0, 0]$$ is fully concentrated on one state and will have a low entropy. $$[0.2, 0.1, 0.3, 0.4]$$ will be somewhere in between.

The Rényi entropies all use a measure of concentration called **majorisation**, which works in the following way:


**First,** reorder the elements of the vector in descending order. For the three example vectors so far this gives:

$$[1, 0, 0, 0]$$

$$[0.4, 0.3, 0.2, 0.1]$$

$$[0.25, 0.25, 0.25, 0.25]$$

**Second,** compute partial sums:

$$[1, 1, 1, 1]$$

$$[0.4, 0.7, 0.9, 1]$$

$$[0.25, 0.5, 0.75, 1]$$

If all the partial sums of one vector $$x$$ are bigger than another vector $$y$$, we say that $$x$$ **majorises** $$y$$. $$[1, 0, 0, 0]$$ majorises the others because each partial sum is higher than for the other vectors - it gets to 1 immediately and stays there. Whereas $$[0.25, 0.25, 0.25, 0.25]$$ is majorised by everything - it’s the slowest way to get to 1.


If vector $$x$$ majorises vector $$y$$, it’s more concentrated and should have lower entropy - writing the entropy as $$H$$, you want $$H(x) < H(y)$$. Functions of this sort are called **Schur concave**.

The Rényi entropies all have this same Schur concave behaviour. They depend on a free parameter $$p$$, and roughly speaking the larger $$p$$ is the more weight it gives to more probable states.  

More precisely, the Rényi entropy is related to the $$p$$-norm (actually let's call it the $$\alpha$$-norm as we already have $$p$$ for probability knocking around). For a vector of probabilities $$P = (p_1, p_2, ..., p_n)$$ the Rényi entropy $$H_\alpha $$ can be written

$$H_\alpha = \frac{1}{1-\alpha} \log \left(\sum_{i=1}^n p_i^\alpha \right)$$

or in terms of the $$\alpha$$-norm  $$\|\|_\alpha$$,

$$H_\alpha = \frac{\alpha}{1-\alpha} \|P\|_\alpha $$.

Either way the formula messes up for $$\alpha = 1$$. The limiting case for $$\alpha \rightarrow 1$$ turns out to be the Shannon entropy.

As ever, people mostly just care about $$0$$, $$1$$, $$2$$ and $$\infty$$. The $$\alpha \rightarrow 0$$ **max-entropy** case weights everything nonzero equally. The $$\alpha \rightarrow \infty$$ **min-entropy** only cares about the highest probability event and ignores the rest.

The $$\alpha =2$$ case is an interesting one. It's called the **collision entropy**, and because it squares the probabilities it ends up weighting the most probable events more highly than the Shannon entropy would. I can see some vague link to collisions, as you're taking the square of each probability, so they're something like interaction terms.


Intuitively you would expect the 2-norm to be important because it always is, and does indeed seem to have some use in quantum mechanics (the van Enk paper quoted at the start refers back to [a paper by Brukner and Zeilinger][brukner]), but I'm still hazy on how or why.


[brukner]:https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.83.3354


-----------------------------------


**To add:** 

- examples
- exactly how van Enk's measure $$M_\alpha$$ of 'predictability' relates to $$H_\alpha$$. Already done this, just have to write up the notes.

**To read:**

- John Baez, [Renyi entropy and free energy][baez], and cited blog posts

[baez]:https://arxiv.org/abs/1102.2098





