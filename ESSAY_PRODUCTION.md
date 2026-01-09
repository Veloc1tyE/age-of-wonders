# Essay Production Guide

This guide covers everything you need to create production-quality essays with visuals, charts, and math.

## 📊 Charts & Visualizations

### Option 1: Embedded Images (Simplest)

Create charts in your favorite tool (Excel, Google Sheets, Python, Observable, etc.) and save as images:

```mdx
![Energy Comparison Chart](/images/energy-comparison.png)
```

Place images in:
- `public/images/` for static images (served as-is)
- `src/assets/` for optimized images (Astro processes them)

### Option 2: SVG Inline (Best for Simple Charts)

Paste SVG code directly into your MDX:

```mdx
<svg width="600" height="400" viewBox="0 0 600 400">
  <!-- Your SVG chart code -->
</svg>
```

### Option 3: Observable Embeds (Interactive)

For interactive visualizations, use Observable:

```mdx
<iframe 
  width="100%" 
  height="500" 
  frameborder="0"
  src="https://observablehq.com/embed/@your-notebook?cells=chart"
></iframe>
```

### Option 4: Custom React Components (Advanced)

For complex interactivity, create React components. See `ADVANCED_CHARTS.md` for setup.

## 📐 Math Equations

You already have KaTeX set up! Use it like this:

### Inline Math

```mdx
The efficiency is $\eta = \frac{W_{out}}{Q_{in}}$ which shows...
```

### Block Math

```mdx
$$
E = mc^2
$$
```

### Multi-line Equations

```mdx
$$
\begin{aligned}
P_{\text{solar}} &= 173{,}000 \text{ TW} \\
P_{\text{usage}} &= 20 \text{ TW} \\
\text{Ratio} &= \frac{P_{\text{solar}}}{P_{\text{usage}}} = 8{,}650
\end{aligned}
$$
```

### Chemical Equations

```mdx
$$
\ce{^2H + ^3He -> ^4He + ^1H + 18.3 MeV}
$$
```

Note: For chemistry, you may want to use `\ce{}` or `\text{}` commands.

## 🖼️ Images

### Adding Images to Essays

1. **For photos/illustrations:** Place in `public/images/essay-name/`
2. **Reference in MDX:**

```mdx
![Free Starship Concept](/images/building-things-worthy/starship-concept.png)
```

### Image with Caption

```mdx
![Deuterium abundance in oceans](/images/deuterium-map.png)
*Figure 1: Global deuterium distribution. Source: [Citation]*
```

### Optimized Images (Recommended)

Place in `src/assets/` and Astro will optimize them:

```mdx
import starshipImage from '../../assets/starship-concept.png';

<img src={starshipImage.src} alt="Free Starship Concept" />
```

## 📊 Data Tables

For presenting data clearly:

```mdx
| Energy Source | Power (TW) | % of Total |
|--------------|-----------|------------|
| Solar (1hr)  | 173,000   | 8,650x     |
| Wind         | 2,000     | 100x       |
| Current Use  | 20        | 1x         |
```

## 🎨 Styling Tips

### Pull Quotes

```mdx
> Material abundance enables moral expansion. When energy becomes abundant, those pressures ease. Quality of life improves, creativity expands.
```

### Emphasis

```mdx
This is **bold** and this is *italic*.

**Material abundance enables moral expansion.**
```

### Code Blocks (for technical sections)

```mdx
```python
# Calculate fusion energy yield
deuterium_mass = 1000  # kg
energy_per_kg = 3.4e14  # Joules
total_energy = deuterium_mass * energy_per_kg
```
```

## 🔗 Links & References

### Internal Links

```mdx
See my essay on [The Free Starship](/essays/free-starship) for technical details.
```

### External Links

```mdx
According to [NASA's estimates](https://nasa.gov/...), solar radiation...
```

### Footnotes (using superscript)

```mdx
More energy from sunlight hits Earth in one hour than humanity uses in a year<sup>1</sup>.

---

<sup>1</sup> Source: NASA Solar Radiation Data
```

## 🚀 Publishing Workflow

1. **Write in MDX** using `building-things-worthy.mdx` as template
2. **Add images** to `public/images/essay-slug/`
3. **Test locally:** `npm run dev` and visit `/essays/your-slug`
4. **Check math renders** properly (KaTeX should display equations)
5. **Set `draft: false`** when ready to publish
6. **Build:** `npm run build` to verify no errors
7. **Deploy:** Push to production

## 📝 Recommended Tools

### For Charts:
- **Figma** - Beautiful static charts
- **Observable** - Interactive visualizations
- **Python + Matplotlib** - Scientific charts
- **Google Sheets** - Quick data viz
- **Desmos** - Math graphs

### For Diagrams:
- **Excalidraw** - Hand-drawn style
- **Figma** - Professional diagrams
- **draw.io** - Free diagramming

### For Equations:
- **Online LaTeX Editor** - Test equations
- **Mathpix** - Convert handwritten math to LaTeX
- Your editor is already set up with KaTeX!

## 🎯 Essay Checklist

Before publishing, verify:
- [ ] Title and description are compelling
- [ ] Date is correct
- [ ] `draft: false` when ready
- [ ] All images load correctly
- [ ] Math equations render properly
- [ ] Links work (internal and external)
- [ ] Mobile responsive (test on narrow screen)
- [ ] Proofread for typos
- [ ] Consistent voice and tone

---

**You're ready to create production-quality essays!** The template is set up, math works, and you can add visuals easily. Focus on the ideas—the infrastructure is solid. 🚀
