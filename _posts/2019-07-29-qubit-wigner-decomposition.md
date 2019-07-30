---
layout: post
title: Decomposition of the Wigner function for a qubit
contents: false
---

This is something like an 'appendix' to two blog posts I wrote, going into some technical details. It won't make a lot of sense without that context - read them first!

I want to show that the procedure I outlined in those posts for calculating the Wigner function of a qubit matches the normal calculation method described in e.g. [Wootters 1987][wootters].

[wootters]:https://www.sciencedirect.com/science/article/pii/000349168790176X

In the blog posts, I write the Wigner function out as follows:

$$\begin{align} 
W = \frac{1}{4}\Bigg( \begin{bmatrix}1 && 1 \\ 1 && 1 \end{bmatrix} \nonumber &+ q_z\begin{bmatrix}-1 && 1 \\ -1 && 1 \end{bmatrix} + (1-q_z)\begin{bmatrix}1 && -1 \\ 1 && -1 \end{bmatrix}\nonumber \\
&+ q_x\begin{bmatrix}1 && 1 \\ -1 && -1 \end{bmatrix} + (1-q_x)\begin{bmatrix}-1 && -1 \\ 1 && 1 \end{bmatrix}\nonumber \\
&+ q_y\begin{bmatrix}1 && -1 \\ -1 && 1 \end{bmatrix} + (1-q_y)\begin{bmatrix}-1 && 1 \\ 1 && -1 \end{bmatrix} \Bigg)\nonumber 
\end{align}$$

where the $$q_i$$ are the answers to the three 'questions' - the expectation values of the measurements 

$$\begin{equation}
Q_i = \frac{1}{2}(1-\sigma_i)
\end{equation}.$$ 

where the $$\sigma_i$$ are the Pauli matrices. The square-bracketed matrices are supposed to represent the 2x2 phase space graphs I used in the blog posts. There's an annoying notational clash where matrices normally have their indices labelled starting in the top left, whereas graphs have their origin in the bottom left. I've kept with the graph convention (as did Wootters), so that, for example $$W_{00}$$ would be the bottom left component, and used square brackets rather than round brackets to visually distinguish them from normal matrices.

Simplifying, we get

$$\begin{equation}
\label{wignerq}
W = \frac{1}{2}\begin{bmatrix}-q_z + q_x + q_y && q_z + q_x - q_y \\ 2 - q_z - q_x - q_y && q_z -q_x + q_y\end{bmatrix}
\end{equation}.$$

Now to make contact with the standard version. Wootters calculates the four components of the Wigner function $$W$$ from the density matrix $$\rho$$ of the qubit as follows:

$$\begin{equation}
\label{wootters}
W_{ij} = \frac{1}{2} \text{Tr}(\rho A_{ij})
\end{equation}$$

where the $$\rho$$ are the *phase point operators*

$$\begin{equation}A_{ij} = \frac{1}{2}\left[I + (-1)^i\sigma_z + (-1)^j\sigma_x + (-1)^{i+j}\sigma_y\right]
\end{equation}$$

Written out in components these become

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

Any density matrix $$\rho$$ can be decomposed in the following way (see e.g. [here][purity]):

$$
\begin{equation}
\rho = \frac{1}{2}(I + a_z\sigma_z + a_x\sigma_x + a_y\sigma_y ),
\end{equation}
$$

where the $$a$$s are components of a vector with $$a\leq1$$. Plugging this decomposition into the standard formula [$$\ref{wootters}$$] for the Wigner function gives

$$\begin{equation}
\label{wignera}
W = \frac{1}{4} \begin{bmatrix} 1 + a_z - a_x - a_y && 1 - a_z - a_x + a_y \\
1 + a_z + a_x + a_y && 1 - a_z - a_y + a_x 
\end{bmatrix}
\end{equation}$$

Finally we need to relate the $$a$$s back to the $$q$$s. We have $$q_i = \text{Tr}(Q_i\rho)$$, which decomposes as

$$\begin{equation}
q_i = \frac{1}{2}\left(\text{Tr}(Q_i) + a_z\text{Tr}(Q_i\sigma_z)+ a_x\text{Tr}(Q_i\sigma_x)+ a_y\text{Tr}(Q_i\sigma_y)\right),
\end{equation}$$

giving

$$\begin{align}
a_z = 1 - 2q_z, \\
a_x = 1 - 2q_x, \\
a_y = 1 - 2q_y. 
\end{align}$$

Putting these back into [$$\ref{wignera}$$] gives the formula [$$\ref{wignerq}$$] that I used for the Wigner function in my blog posts.


[purity]:https://en.wikipedia.org/wiki/Purity_(quantum_mechanics)#Geometrical_representation











