---
layout: post
title: The Wigner function
---



The Wigner function plays a major role in the phase space reformulation of quantum physics, which I'm currently trying to learn about. I had very little intuition for what it was, other than some vague idea that it was a sort of probability-distribution-like thing, so I've been trying to fix that.

First I wondered if going back to the [original paper (pdf)][wigner] would be helpful. Turns out no. Wigner states that 'one may build the following expression', plonks it on the page, and then adds this helpful footnote:
<label for="mn-wigner" class="margin-toggle">&#8853;</label>
<input type="checkbox" id="mn-wigner" class="margin-toggle"/>
<span class="marginnote">
I searched a bit, and it looks like Szilard may have never been involved - Wigner just wanted to boost Szilard’s career when he got out of Germany in the 30s. Haven’t found the original source yet though.</span>

{% include image.html img="assets/wigner-szilard.png" caption="‘Me and my mate thought of it once, but we won’t tell you where or how.’ Thanks, Wigner!" title="This expression was found by L.Szilard and the present author some years ago for another purpose" %}

[wigner]:http://140.123.79.88/~yach932/CH3_Reference/51.PhysRev.40.749.pdf

So I had to look elsewhere. One of my starting points was [these][riedel1] [two][riedel2] blog posts about the Wigner function by Jess Riedel, a physicist who also got annoyed by the usual way it’s introduced without explanation. The first post starts with the density function, which is used more frequently in quantum physics and is something like an autocorrelation function in statistics, and then applies two transformations to it, a Fourier transform and a coordinate rotation. This is strongly connected to the story I’m trying to tell above. 

[riedel1]:http://blog.jessriedel.com/2014/04/01/wigner-function-fourier-transform-coordinate-rotation/

The key property of the Wigner function that every physics text talks about is the ability to reproduce the position and momentum distributions by integrating along the axes of phase space. Jess Riedel is dissatisfied with this and in his second blog post he points out that this is also true of the ‘Jigner function’, a pointless function he just made up... it’s not enough to pick it out uniquely.

I was also dissatisfied with this! I've ended up exploring along a somewhat different path, but I'll get to Riedel's version at the end. I'm still in the process of doing this and you will notice a lot of **To do**s and **To add**s in this post.


## Time-frequency analysis and musical notation

The first interesting thing I learnt when I started digging was that the Wigner function is also used in classical physics, in the field of [time-frequency analysis][timefreq]. Time and frequency are Fourier pairs in classical physics in the same way that position and momentum are in quantum physics. This means you can’t measure both of them precisely at the same time: a precisely localised position measurement will map to a fully spread out infinite sinusoid, and vice versa. So trying to plot time against frequency precisely for a signal is always going to be something of a bodge. 

[timefreq]:https://en.wikipedia.org/wiki/Time%E2%80%93frequency_analysis

Terence Tao [teaches a course][tao] on time-frequency harmonic analysis, and in the introduction he points out that actually people do try to plot frequency and time at once. Despite being slightly fake mathematically, it has a long history and is very useful:

{% include image.html img="assets/musical_scale.png" title="Musical scale" %}


I had never thought about this before! Musical notation is just time along the x axis and frequency up the y axis:

{% include image.html img="assets/time_frequency_music.svg" title="Musical scale" %}

 We would normally say that that first middle C has a frequency of 256 Hz, and strictly that only applies if you play it for all of time, to get an infinite sinusoid. In reality, though, all you want is for the waveform to be reasonably periodic at 256 Hz for the half a second or so that the note is supposed to last. The musical score does a good job of summarising the information you actually want, and that you won’t get from just looking at a position or frequency plot on its own.

[tao]:https://www.math.ucla.edu/~tao/254a.1.01w/blurb.html

There’s lots of theory in signal processing on different ways to do this. The simplest option is the short term Fourier transform. <label for="mn-yanny" class="margin-toggle">&#8853;</label>
<input type="checkbox" id="mn-yanny" class="margin-toggle"/>
<span class="marginnote">
This sort of spectrogram <a href="https://www.nytimes.com/interactive/2018/05/16/upshot/audio-clip-yanny-laurel-debate.html">got some unexpected publicity</a> in mid-2018 while I was researching this!
</span>You start in the time domain, keep the signal for a small chunk (‘window’) of time and set the rest to zero, and calculate the Fourier transform of that to get a local frequency. So if your window covers the duration of the middle C you’ll pick up the 256 Hz. Then you move your window along a bit in time to pick up some different frequencies. 

{% include image.html img="assets/short_time_fourier.svg" title="Short time Fourier series" caption="Sketch of the basic idea of a short time Fourier series. The original time series is at the top, and short windows of it are mapped to frequency curves. Think of each frequency curve as sticking up out of the page." %}

There’s an underlying symmetry in the Fourier transform, so that you could instead start in the frequency domain and take short windows of that, and transform to the time domain. This would be a pretty stupid choice in music, I think, because the signals we want to listen to tend to have spread-out, periodic behaviour in time rather than frequency. (On the other hand there are some important features in music that are narrow in time but wide in frequency, like the ‘attack’ at the start of a bowed string note, where it might be better?) But really it’s a trade off... you either end up with good time resolution or good frequency resolution.


To do better than this, you can make a cleverer choice of window. The short time Fourier transform just uses the ‘boxcar function’ as its window (this is the function that’s $$1$$ for a small chunk of the domain and $$0$$ everywhere else). Using a Gaussian window turns out to be the best compromise between resolution in time and resolution in frequency. This is called the [Gabor transform][gabor].

[gabor]:https://en.wikipedia.org/wiki/Gabor_transform

This is still a ‘one size fits all’ window function, though. It seems plausible that you can often do better by using a window that’s based on the actual function that you are transforming. In the case of the Wigner function, it looks like you use something like the mirror image of the signal itself as the window function (see e.g. [here][mirror] for a paper considering the Wigner function as the expectation value of the parity operator that reflects points in phase space. I say ‘something like’ as I think there might still be another coordinate change going on… I need to write it all out properly in the same notation and see…)

[mirror]:https://journals.aps.org/pra/abstract/10.1103/PhysRevA.15.449

------------------------------------------------------------------

**To add:**

- actually do this
- possibly an actual worked example, as well as the sketches

------------------------------------------------------------------

## Wigner function from Galilean invariance

There’s another route I want to go down before that, though, that’s more directly related to the van Enk model. 

!!fill in gaps

[This paper by Wootters][wootters] explains that actually the Wigner function has a more elegant property, which goes something like this: you can integrate along any line in phase space and get a similar marginal distribution, but for an observable that’s some linear combination of position and momentum. I think this is the property you need for the Wigner function to respect Galilean invariance, and still get something that makes sense if you transform your position and velocity coordinates. Which means that there’s some group theoretic structure going on here, and probably that was what Wigner and Weyl were thinking about, given that they both had an unusual knowledge of group theory for physicists of the time.


The Wootters paper goes on to use this property to construct a finite analogue to the Wigner function. In the case of a 2x2 phase space this starts to look very familiar… here are some Wigner functions:

[wootters]:https://www.sciencedirect.com/science/article/pii/000349168790176X

## Wigner function as 'convolutionary mean'

Jess Riedel's post [takes a different path][riedel2], explaining that it’s the ‘convolutionary mean’ of two other distributions that quantum optics people like for some reason, the Glauber-Sudarshan $$P$$ distribution and the Husimi $$Q$$ distribution. ('Convolutionary mean' is a useful term Riedel makes up - it means that $$W$$ is 'halfway' between $$P$$ and $$Q$$ in the sense that $$P * g = W$$ and $$Q = W * g$$ where $$g$$ is some Gaussian that's explained in the post).


[riedel2]:http://blog.jessriedel.com/2014/09/22/in-what-sense-is-the-wigner-function-a-quasiprobability-distribution/

--------------------------------------------------------------------

**To do:** learn what the hell these distributions are. Start by reading the blog post properly!

--------------------------------------------------------------------

This looks somewhat similar to the way it was introduced in [Ville’s original paper][ville] (Ville was the person who independently introduced the Wigner function to signal processing, where it is often known as the Wigner-Ville distribution.) <label for="mn-ville" class="margin-toggle">&#8853;</label>
<input type="checkbox" id="mn-ville" class="margin-toggle"/>
<span class="marginnote">
Ville was not a big name like Wigner: he worked at the telecommunicatons lab at the Société Alsacienne de Constructions Mécaniques, rather than a fancy university, and he published in an obscure journal called *Câbles et Transmissions*. So nobody really read his paper.</span> Ville's paper looks well worth reading properly - it gives a lot more setup that Wigner did, and makes connections with lots of important stuff to do with operator ordering and the Wigner-Weyl transform. 

Ville tries to write down a [characteristic function][char] for the distribution on time-frequency space, and runs into operator-ordering issues. He looks at the two most obvious choices of ordering given the situation (which I think may correspond to normal and anti-normal ordering), and rules them out for symmetry reasons. He then finds that a 'halfway' option of taking the geometric mean *does* work - I think this may correspond to the Weyl ordering.

--------------------------------------------------------------------

**To do:** go through the details, check that these do correspond to normal, anti-normal, and Weyl ordering. Also, is there a link between his 'two most obvious choices' and the $$P$$ and $$Q$$ distributions?

--------------------------------------------------------------------


[ville]:https://archive.org/details/VilleSigAnalytiqueCablesEtTrans1948En

[char]:https://en.wikipedia.org/wiki/Characteristic_function_(probability_theory)










<!--These look very like the states in the Spekkens model! Van Enk says they are not exactly the same, and that ‘it would nevertheless be interesting to study the precise relations’, which I guess translates as ‘these are similar but I don’t know exactly how’. It sounds like maybe the difference comes in when you start combining systems.-->


<!--Still, you can see the connection with the questions Q0, Q1, Q2 I talked about earlier. If you sum the boxes horizontally, vertically or along the diagonals you always get a legit, positive probability. The diagonal choice Q2 works because of this extra property of phase space, that you can sum along any line and not just the axes.-->


<!--I’m feeling happy with my choice of paper. The basic model is simple enough to dig into in detail without taking huge amounts of time to understand, but it has all these rich connections to other bits of physics. Probably next I should consolidate a bit, and learn how some of these vague qualitative arguments work in detail. -->

