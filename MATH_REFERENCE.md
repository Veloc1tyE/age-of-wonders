# Math & LaTeX Quick Reference

Quick reference for writing equations in your essays using KaTeX.

## Basic Syntax

### Inline Math
Use single `$` for inline: `$E = mc^2$` renders as $E = mc^2$

### Block Math
Use double `$$` for centered equations:

```latex
$$
E = mc^2
$$
```

## Common Symbols & Notation

### Greek Letters
```latex
$\alpha, \beta, \gamma, \delta, \epsilon$
$\theta, \lambda, \mu, \pi, \sigma, \tau, \omega$
$\Phi, \Psi, \Omega$ (capitals)
```

### Superscripts & Subscripts
```latex
$E_{kinetic}$           # Subscript
$x^2$                   # Superscript  
$E_{\text{solar}}$      # Text in subscript
$10^{14}$               # Scientific notation
```

### Fractions
```latex
$\frac{a}{b}$           # Regular fraction
$\frac{E_{out}}{E_{in}}$ # With subscripts
```

### Useful for Energy/Physics

```latex
# Energy equations
$E = mc^2$
$E = \frac{1}{2}mv^2$
$P = \frac{E}{t}$

# Efficiency
$\eta = \frac{W_{out}}{Q_{in}}$

# Power notation
$10^{14} \text{ Joules}$
$1.73 \times 10^5 \text{ TW}$

# Units
$\text{kWh, TWh, GW, MW}$
```

### Fusion Reactions

For deuterium-tritium fusion:
```latex
$$
\ce{^2H + ^3H -> ^4He + n + 17.6 \text{ MeV}}
$$
```

Or more simply:
```latex
$$
\text{D} + \text{T} \rightarrow \text{He-4} + \text{n} + 17.6 \text{ MeV}
$$
```

## Multi-line Equations

Use `aligned` environment:

```latex
$$
\begin{aligned}
E_{\text{solar/hour}} &= 173{,}000 \text{ TWh} \\
E_{\text{annual use}} &= 20{,}000 \text{ TWh} \\
\text{Ratio} &= \frac{173{,}000}{20{,}000} = 8.65
\end{aligned}
$$
```

## Common Patterns for Your Essays

### Energy Comparisons
```latex
$$
\frac{E_{\text{available}}}{E_{\text{used}}} = \frac{173{,}000 \text{ TWh}}{20{,}000 \text{ TWh}} \approx 8{,}650
$$
```

### Exponential Growth
```latex
$y = y_0 e^{rt}$
```

### Percentages
```latex
$\Delta E = \frac{E_{\text{final}} - E_{\text{initial}}}{E_{\text{initial}}} \times 100\%$
```

### Large Numbers
```latex
$1.73 \times 10^{17} \text{ watts}$
$6.02 \times 10^{23} \text{ particles}$
```

## Special Formatting

### Text in equations
```latex
$E_{\text{solar}}$ not $E_{solar}$
```

### Spacing
```latex
$a \quad b$     # Large space
$a \; b$        # Medium space  
$a \, b$        # Small space
```

### Arrows
```latex
$\rightarrow$   # Right arrow
$\Rightarrow$   # Double right arrow
$\leftrightarrow$ # Both directions
```

## Physical Constants

```latex
$c = 3 \times 10^8 \text{ m/s}$     # Speed of light
$h = 6.626 \times 10^{-34} \text{ J·s}$ # Planck constant
$k_B = 1.381 \times 10^{-23} \text{ J/K}$ # Boltzmann constant
```

## Testing Your Equations

1. Write equation in your MDX file
2. Run `npm run dev`
3. Check that KaTeX renders it correctly
4. If error, check bracket matching and escape characters

## Common Mistakes

❌ `$E_solar$` - underscore without braces  
✅ `$E_{\text{solar}}$`

❌ `$$E = mc^2$$` inline  
✅ Put block equations on their own lines

❌ Forgetting to escape special characters in text mode  
✅ Use `\text{}` for words in equations

## Resources

- [KaTeX Supported Functions](https://katex.org/docs/supported.html)
- [Detexify](http://detexify.kirelabs.org/classify.html) - Draw symbol to find LaTeX
- Test equations at [katex.org](https://katex.org/)

---

Your site has KaTeX fully configured and working. Just write your equations and they'll render beautifully! ✨
