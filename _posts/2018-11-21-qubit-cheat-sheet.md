---
layout: post
title: Qubit cheat sheet
contents: true
---

I always end up looking up or recalculating these things, so it's easier to have them in one place.

# Pauli matrices

$$ 
\begin{equation}
\sigma_x = \left(
\begin{array}{cc}
0 && 1 \\
1 && 0 \\
\end{array}
\right)
\end{equation}
$$

$$ 
\begin{equation}
\sigma_y = \left(
\begin{array}{cc}
0 && -i \\
i && 0 \\
\end{array}
\right)
\end{equation}
$$

$$ 
\begin{equation}
\sigma_z = \left(
\begin{array}{cc}
1 && 0 \\
0 && -1 \\
\end{array}
\right)
\end{equation}
$$



## Eigenvectors

$$ 
\begin{equation}
\vert x_+ \rangle = \vert\leftarrow\rangle= \frac{1}{\sqrt{2}}\left(
\begin{array}{c}
1  \\
1  \\
\end{array}
\right),
\vert x_- \rangle = \vert\rightarrow\rangle = \frac{1}{\sqrt{2}}\left(
\begin{array}{c}
1  \\
-1  \\
\end{array}
\right)
\end{equation}
$$


$$ 
\begin{equation}
\vert y_+ \rangle = \frac{1}{\sqrt{2}}\left(
\begin{array}{c}
1  \\
i  \\
\end{array}
\right),
\vert y_- \rangle = \frac{1}{\sqrt{2}}\left(
\begin{array}{c}
1  \\
-i  \\
\end{array}
\right)
\end{equation}
$$

$$ 
\begin{equation}
\vert z_+ \rangle = \vert\uparrow\rangle = \left(
\begin{array}{c}
1  \\
0  \\
\end{array}
\right),
\vert z_- \rangle = \vert\downarrow\rangle = \left(
\begin{array}{c}
0  \\
1  \\
\end{array}
\right)
\end{equation}
$$

## Density matrices for each eigenvector

$$
\begin{equation}
\vert x_+ \rangle\langle x_+\vert =
\frac{1}{2}\left(
\begin{array}{cc}
1 && 1 \\
1 && 1 \\
\end{array}
\right)
\end{equation}
$$

$$
\begin{equation}
\vert x_-\rangle\langle x_-\vert =
\frac{1}{2}\left(
\begin{array}{cc}
1 && -1 \\
-1 && 1 \\
\end{array}
\right)
\end{equation}
$$

$$
\begin{equation}
\vert y_+\rangle\langle y_+ \vert =
\frac{1}{2}\left(
\begin{array}{cc}
1 && -i \\
i && 1 \\
\end{array}
\right)
\end{equation}
$$

$$
\begin{equation}
\vert y_-\rangle\langle y_-\vert =
\frac{1}{2}\left(
\begin{array}{cc}
1 && i \\
-i && 1 \\
\end{array}
\right)
\end{equation}
$$

$$
\begin{equation}
\vert z_+ \rangle\langle z_+ \vert =
\left(
\begin{array}{cc}
1 && 0 \\
0 && 0 \\
\end{array}
\right)
\end{equation}
$$

$$
\begin{equation}
\vert z_-\rangle\langle z_-\vert =
\left(
\begin{array}{cc}
0 && 0 \\
0 && 1 \\
\end{array}
\right)
\end{equation}
$$


# Two point discrete Fourier transform

This is just 

$$
\begin{equation}
F =
\frac{1}{\sqrt{2}}\left(
\begin{array}{cc}
1 && 1 \\
1 && -1 \\
\end{array}
\right)
\end{equation}
$$




















