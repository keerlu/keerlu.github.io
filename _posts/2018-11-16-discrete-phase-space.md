---
layout: post
title: Discrete phase space
---

Some very rough notes on discrete phase space, specifically the simplest case of 2 position and 2 momentum states forming a 2x2 grid like this: 

{% include image.html img="assets/2018-11-16-discrete-phase-space/2x2_grid.jpg" title="Discrete phase space" max-width="80%" %}

(I'm mostly interested in this for its connections to the [Spekkens toy model][spekkens], which uses a similar 2x2 grid of states.) 

[spekkens]:https://en.wikipedia.org/wiki/Spekkens_toy_model

I want to find the discrete Wigner function on this 2x2 phase space. This is defined by analogy to the continuous one (notes on that [here][wigner]). For a start, we're going to want discrete analogues of:

$$ 
\begin{equation}
\int^\infty_{-\infty} W(x, p) dp = |\psi(x)|^2
\end{equation}
$$

and 

$$ 
\begin{equation}
\int^\infty_{-\infty} W(x, p) dx = |\psi(p)|^2.
\end{equation}
$$

For a 2x2 system this is just the four equations

$$
\begin{eqnarray}
  \left\{
  \begin{aligned}
  W(0, 0) + W(0, 1) = \langle 0 | \psi(x) \rangle ^2, \\
  W(1, 0) + W(1, 1) = \langle 1 | \psi(x) \rangle ^2,
  \end{aligned}
  \right.
  \end{eqnarray}
$$

$$
\begin{eqnarray}
  \left\{
  \begin{aligned}
  W(0, 0) + W(1, 0) = \langle 0 | \psi(p) \rangle ^2, \\
  W(0, 1) + W(1, 1) = \langle 1 | \psi(p) \rangle ^2.
  \end{aligned}
  \right.
  \end{eqnarray}
$$

Or, in picture form:

{% include image.html img="assets/2018-11-16-discrete-phase-space/2x2_wigner.jpg" title="Wigner function and sums over lines" %}

The quantities $$ \langle 0 \vert \psi(x) \rangle ^2 $$ etc are what we actually measure, and we want to use these to infer the Wigner function $$W(x,p)$$. There's not enough information to do this uniquely, yet - we would also need to specify how the sums along the diagonals relate to measurements. I'll talk about that later.

The continuous version of this is called the inverse [Radon transform][radon], which tranforms a function over lines to a function on points. It's used in medical tomography to e.g. reconstruct an image of the density of the brain by taking X-ray measurements, which give a line integral of the density along the X-ray path. (The quantum state equivalent is called [quantum tomography][quantumtomo] by analogy).


[wigner]:https://keerlu.github.io/2018/07/17/wigner-function.html
[radon]:https://en.wikipedia.org/wiki/Radon_transform
[quantumtomo]:https://en.wikipedia.org/wiki/Quantum_tomography

## The discrete Fourier transform

Position and momentum are Fourier pairs, so we're going to want to Fourier transform between them. The discrete Fourier transform for two points is pretty simple (see e.g. [here][2point]): for $$\vert\psi\rangle = a\vert  z_+\rangle + b\vert  z_-\rangle$$, the Fourier transform is $$\vert\tilde{\psi}\rangle = F\vert\psi\rangle$$, where $$F$$ is the matrix

$$ 
\begin{equation}
F = \frac{1}{\sqrt{2}}\left(
\begin{array}{cc}
1 && 1 \\
1 && -1 \\
\end{array}
\right)
\end{equation}
$$

So, in components,

$$
\begin{equation}
\vert\tilde{\psi}\rangle =
\frac{1}{\sqrt{2}} (a + b) \vert z_+\rangle + \frac{1}{\sqrt{2}} (a - b) \vert  z_-\rangle
\end{equation}
$$

$$
\begin{equation}
=
\frac{a}{\sqrt{2}} \left(\vert  z_+\rangle + \vert  z_-\rangle\right)  + \frac{b}{\sqrt{2}} \left( \vert  z_+\rangle - \vert  z_-\rangle\right),
\end{equation}
$$

i.e. 

$$
\begin{equation}
\vert\tilde{\psi}\rangle = a\vert  x_+\rangle + b\vert x_-\rangle .
\end{equation}
$$

So the 2 point DFT transforms between the $$z$$ component representation and the $$x$$ component one.

[2point]:https://en.wikipedia.org/wiki/DFT_matrix#Two-point


## Translations in phase space

(For this section I'll mostly be following [Picturing Qubits in Phase Space][wootters] by Wootters.)

[wootters]:https://arxiv.org/abs/quant-ph/0306135

The 2x2 phase space is normally used for qubit states. In this case it's usual to take the horizontal axis as the $$z$$ component of spin, and the vertical axis as the $$x$$ component. So I'll relabel the axes in this way:

{% include image.html img="assets/2018-11-16-discrete-phase-space/2x2_spinspace.jpg" title="Phase space for qubit" max-width="80%" %}

We'll define horizontal and vertical translations on phase space in terms of their action on the state $$\vert\psi\rangle$$.

### Horizontal translations

Horizontal translations $$H$$ rearrange phase space cells like this:

{% include image.html img="assets/2018-11-16-discrete-phase-space/horizontal.jpg" title="Horizontal translations in phase space" max-width="80%"  %}

This swaps the two columns, so we should expect $$\vert z_+\rangle$$ and $$\vert z_-\rangle$$ states to be interchanged. This can be achieved with the operator

$$
\begin{equation}
H = \vert  z_+ \rangle\langle z_- \vert + \vert  z_- \rangle\langle  z_+ \vert = \left(
\begin{array}{cc}
0 && 1 \\
1 && 0 \\
\end{array}
\right).
\end{equation}
$$

This is the Pauli matrix $$\sigma_x$$, which acts on $$\vert  z_+ \rangle $$, $$\vert  z_- \rangle $$ as follows:

$$
\begin{equation}
\sigma_x \vert z_+\rangle= 
\left(
\begin{array}{cc}
0 && 1 \\
1 && 0 \\
\end{array}
\right)
\left(
\begin{array}{c}
1  \\
0  \\
\end{array}
\right)
\end{equation}
= 
\left(
\begin{array}{c}
0  \\
1  \\
\end{array}
\right)
= \vert z_-\rangle.
$$


$$
\begin{equation}
\sigma_x \vert z_-\rangle= 
\left(
\begin{array}{cc}
0 && 1 \\
1 && 0 \\
\end{array}
\right)
\left(
\begin{array}{c}
0  \\
1  \\
\end{array}
\right)
\end{equation}
= 
\left(
\begin{array}{c}
1  \\
0  \\
\end{array}
\right)
= \vert z_+\rangle,
$$

So the two states are interchanged as expected.

For $$\vert  x_+ \rangle $$ and $$\vert x_- \rangle $$, we have:

$$
\begin{equation}
\sigma_x \vert x_+\rangle= \frac{1}{\sqrt{2}}
\left(
\begin{array}{cc}
0 && 1 \\
1 && 0 \\
\end{array}
\right)
\left(
\begin{array}{c}
1  \\
1  \\
\end{array}
\right)
\end{equation}
= \frac{1}{\sqrt{2}}
\left(
\begin{array}{c}
1  \\
1  \\
\end{array}
\right)
= \vert x_+\rangle ,
$$

$$
\begin{equation}
\sigma_x \vert x_- \rangle= \frac{1}{\sqrt{2}}
\left(
\begin{array}{cc}
0 && 1 \\
1 && 0 \\
\end{array}
\right)
\left(
\begin{array}{c}
1  \\
-1  \\
\end{array}
\right)
\end{equation}
= \frac{1}{\sqrt{2}}
\left(
\begin{array}{c}
-1  \\
1  \\
\end{array}
\right)
= -\vert x_-\rangle .
$$

So $$\vert x_+\rangle$$ is unchanged, and $$\vert x_-\rangle$$ is reversed.

(Not quite sure why reversing $$\vert x_-\rangle$$ is OK. Maybe because normal QM takes place on a projective space, where $$\lambda\vert\psi\rangle$$ and $$\vert\psi\rangle$$ represent the same state? Maybe the same is true in this toy model.)

### Vertical translations

Similarly, vertical translations $$V$$ rearrange phase space like this:


{% include image.html img="assets/2018-11-16-discrete-phase-space/vertical.jpg" title="Vertical translations in phase space" max-width="80%" %}

This time the states $$\vert x_+\rangle$$ and $$\vert x_-\rangle$$ are interchanged. This can be done with the operator

$$
\begin{equation}
V = \vert  x_+ \rangle\langle x_- \vert + \vert x_- \rangle\langle  x_+ \vert = \left(
\begin{array}{cc}
1 && 0 \\
0 && -1 \\
\end{array}
\right).
\end{equation}
$$

This is the Pauli matrix $$\sigma_z$$. It acts on $$\vert  x_+ \rangle $$ and $$\vert x_- \rangle $$ as:

$$
\begin{equation}
\sigma_z \vert x_+\rangle= \frac{1}{\sqrt{2}}
\left(
\begin{array}{cc}
1 && 0 \\
0 && -1 \\
\end{array}
\right)
\left(
\begin{array}{c}
1  \\
1  \\
\end{array}
\right)
\end{equation}
= \frac{1}{\sqrt{2}}
\left(
\begin{array}{c}
1  \\
-1  \\
\end{array}
\right)
= \vert x_-\rangle ,
$$

$$
\begin{equation}
\sigma_z \vert x_-\rangle= \frac{1}{\sqrt{2}}
\left(
\begin{array}{cc}
1 && 0 \\
0 && -1 \\
\end{array}
\right)
\left(
\begin{array}{c}
1  \\
-1  \\
\end{array}
\right)
\end{equation}
= \frac{1}{\sqrt{2}}
\left(
\begin{array}{c}
1  \\
1  \\
\end{array}
\right)
= \vert x_+\rangle .
$$


So the components are swapped as expected. For  $$\vert  z_+ \rangle $$, $$\vert  z_- \rangle $$ we have

$$
\begin{equation}
\sigma_z \vert z_+\rangle= 
\left(
\begin{array}{cc}
1 && 0 \\
0 && -1 \\
\end{array}
\right)
\left(
\begin{array}{c}
1  \\
0  \\
\end{array}
\right)
\end{equation}
= 
\left(
\begin{array}{c}
1  \\
0  \\
\end{array}
\right)
= \vert z_+\rangle.
$$


$$
\begin{equation}
\sigma_z \vert z_-\rangle= 
\left(
\begin{array}{cc}
1 && 0 \\
0 && -1 \\
\end{array}
\right)
\left(
\begin{array}{c}
0  \\
1  \\
\end{array}
\right)
\end{equation}
= 
\left(
\begin{array}{c}
0  \\
-1  \\
\end{array}
\right)
= -\vert z_-\rangle,
$$

So $$\vert z_+\rangle$$ is unchanged and $$\vert z_-\rangle$$ is reversed.
































