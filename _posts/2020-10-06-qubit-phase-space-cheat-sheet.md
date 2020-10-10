---
layout: post
title: Qubit phase space cheat sheet
contents: true
---

Like my [other qubit cheat sheet][cheat], but specifically for phase-space-related things.

[cheat]:https://keerlu.github.io/2018/11/21/qubit-cheat-sheet.html


# Phase point operators

These can be used to construct the Wigner function $$W$$ given a density matrix $$\rho$$. They satisfy 

$$
\begin{equation}
W_{ij} (\rho) = \frac{1}{2} \text{Tr}(\rho A_{ij})
\end{equation}
$$

See [Wootters 1987][wootters] for more on these.

[wootters]:https://www.sciencedirect.com/science/article/abs/pii/000349168790176X

$$
\begin{equation}
A_{00} =
\frac{1}{2}\left(
\begin{array}{cc}
2 && 1-i \\
1+i && 0 \\
\end{array}
\right)
\end{equation}
$$

$$
\begin{equation}
A_{01} =
\frac{1}{2}\left(
\begin{array}{cc}
2 && -1+i \\
-1-i && 0 \\
\end{array}
\right)
\end{equation}
$$

$$
\begin{equation}
A_{10} =
\frac{1}{2}\left(
\begin{array}{cc}
0 && 1+i \\
1-i && 2 \\
\end{array}
\right)
\end{equation}
$$

$$
\begin{equation}
A_{11} =
\frac{1}{2}\left(
\begin{array}{cc}
0 && -1-i \\
-1+i && 2 \\
\end{array}
\right)
\end{equation}
$$

# Wigner function for a qubit

Now apply this to a general qubit of the form

$$
\begin{equation}
|\psi\rangle = \left(
\begin{array}{c}
\cos (\frac{\theta}{2})  \\
e^{i\phi}\sin (\frac{\theta}{2}) \\
\end{array}
\right)
\end{equation}
$$

Find that

$$
\begin{equation}
W_{00} = \frac{1}{4}\left[1 + \cos\theta + \sin\theta(\cos\phi + \sin\phi) \right]
\end{equation}
$$

$$
\begin{equation}
W_{01} = \frac{1}{4}\left[1 + \cos\theta - \sin\theta(\cos\phi + \sin\phi) \right]
\end{equation}
$$

$$
\begin{equation}
W_{10} = \frac{1}{4}\left[1 - \cos\theta + \sin\theta(\cos\phi - \sin\phi) \right]
\end{equation}
$$

$$
\begin{equation}
W_{11} = \frac{1}{4}\left[1 - \cos\theta - \sin\theta(\cos\phi - \sin\phi) \right]
\end{equation}
$$


## Qs

I'm not sure if these have a default notation, but I call them $$Q_i$$. I mean the quantities that the rows, columns and diagonals of the Wigner function add up to. Maybe an image would help:

{% include image.html img="assets/2020-10-06-qubit-phase-space-cheat-sheet/phase_space.jpg" title="Phase space" max-width="50%" %}


$$
\begin{equation}
Q_i = \frac{1}{2} - \frac{1}{2}\langle\psi | \sigma_i | \psi \rangle .
\end{equation}
$$

For a general qubit these are:

$$
\begin{equation}
Q_z = \frac{1}{2} - \frac{1}{2}\cos\theta.
\end{equation}
$$

$$
\begin{equation}
Q_x = \frac{1}{2} - \frac{1}{2}\sin\theta\cos\phi.
\end{equation}
$$

$$
\begin{equation}
Q_y = \frac{1}{2} - \frac{1}{2}\sin\theta\sin\phi.
\end{equation}
$$

# Examples

Here are some examples of Wigner functions, written in the form

$$
\begin{equation}
W = \left[
\begin{array}{c|c}
W_{01} & W_{11} \\
\hline
W_{00} & W_{10} \\
\end{array}
\right]
\end{equation}
$$

(as in the Wootters paper).

## Pauli matrix eigenstates

+1 eigenstate of $$\sigma_z$$:

$$
\begin{equation}
\left[
\begin{array}{c|c}
\frac{1}{2} & 0 \\
\hline
\frac{1}{2} & 0 \\
\end{array}
\right]
\end{equation}
$$

-1 eigenstate of $$\sigma_z$$:

$$
\begin{equation}
\left[
\begin{array}{c|c}
0 & \frac{1}{2} \\
\hline
0 & \frac{1}{2} \\
\end{array}
\right]
\end{equation}
$$

+1 eigenstate of $$\sigma_x$$:

$$
\begin{equation}
\left[
\begin{array}{c|c}
0 & 0 \\
\hline
\frac{1}{2} & \frac{1}{2} \\
\end{array}
\right]
\end{equation}
$$

-1 eigenstate of $$\sigma_x$$:

$$
\begin{equation}
\left[
\begin{array}{c|c}
\frac{1}{2} & \frac{1}{2} \\
\hline
0 & 0 \\
\end{array}
\right]
\end{equation}
$$

+1 eigenstate of $$\sigma_y$$:

$$
\begin{equation}
\left[
\begin{array}{c|c}
0 & \frac{1}{2} \\
\hline
\frac{1}{2} & 0 \\
\end{array}
\right]
\end{equation}
$$

-1 eigenstate of $$\sigma_y$$:

$$
\begin{equation}
\left[
\begin{array}{c|c}
\frac{1}{2} & 0 \\
\hline
0 & \frac{1}{2} \\
\end{array}
\right]
\end{equation}
$$

## Examples with negative probabilities

+1 eigenstate of $$\frac{1}{\sqrt{2}} (\sigma_z + \sigma_x) $$:

$$
\begin{equation}
\left[
\begin{array}{c|c}
\frac{1}{4} & \frac{1 - \sqrt{2}}{4} \\
\hline
\frac{1 + \sqrt{2}}{4} & \frac{1}{4} \\
\end{array}
\right]
\end{equation}
$$

One with the most negative possible value. Think this is an eigenstate of $$\frac{1}{\sqrt{3}} (\sigma_z + \sigma_x + \sigma_y)  $$ or something, but need to check:

$$
\begin{equation}
\left[
\begin{array}{c|c}
\frac{1 + \sqrt{3}}{4} & \frac{1}{4} \\
\hline
\frac{1 - \sqrt{3}}{4} & \frac{1}{4} \\
\end{array}
\right]
\end{equation}
$$




































