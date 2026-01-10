import { c as createComponent, d as createAstro, m as maybeRenderHead, b as addAttribute, j as renderSlot, a as renderTemplate, e as renderScript, n as createVNode, aw as Fragment, ax as __astro_tag_component__ } from './astro/server_CrtqPIc8.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                                               */
/* empty css                                                                 */
import './StatCard_astro_astro_type_style_index_0_lang.8428ee3f_l0sNRNKZ.mjs';
/* empty css                                                                  */
/* empty css                                                                   */
/* empty css                                                             */

const $$Astro$4 = createAstro("https://ageofwonders.example");
const $$Callout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Callout;
  const { type = "info" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`callout callout-${type}`, "class")} data-astro-cid-mrmim4ef> ${renderSlot($$result, $$slots["default"])} </div> `;
}, "/Users/billy_j/age-of-wonders/src/components/Callout.astro", void 0);

const $$PullQuote = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="pull-quote" data-astro-cid-7q4cr32f> ${renderSlot($$result, $$slots["default"])} </div> `;
}, "/Users/billy_j/age-of-wonders/src/components/PullQuote.astro", void 0);

const $$Astro$3 = createAstro("https://ageofwonders.example");
const $$StatCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$StatCard;
  const { number, label } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="stat-inline" data-astro-cid-f47nkzfd> <span class="number" data-astro-cid-f47nkzfd>${number}</span> <span class="label" data-astro-cid-f47nkzfd>${label}</span> </div> `;
}, "/Users/billy_j/age-of-wonders/src/components/StatCard.astro", void 0);

const $$Astro$2 = createAstro("https://ageofwonders.example");
const $$SummaryBox = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SummaryBox;
  const { title = "Summary" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="summary-box" data-astro-cid-h3haue3q> ${title && renderTemplate`<h4 data-astro-cid-h3haue3q>${title}</h4>`} ${renderSlot($$result, $$slots["default"])} </div> `;
}, "/Users/billy_j/age-of-wonders/src/components/SummaryBox.astro", void 0);

const $$Astro$1 = createAstro("https://ageofwonders.example");
const $$DataInsight = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$DataInsight;
  const { insight, context } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="data-insight" data-astro-cid-afxj4xut> <div class="insight" data-astro-cid-afxj4xut>${insight}</div> ${context && renderTemplate`<div class="context" data-astro-cid-afxj4xut>${context}</div>`} </div> `;
}, "/Users/billy_j/age-of-wonders/src/components/DataInsight.astro", void 0);

const $$Astro = createAstro("https://ageofwonders.example");
const $$Share = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Share;
  const { title, description = "", url = "" } = Astro2.props;
  const shareUrl = url || Astro2.url.href;
  const shareTitle = title;
  const shareDescription = description;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);
  const encodedDescription = encodeURIComponent(shareDescription);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;
  const hnUrl = `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedTitle}`;
  return renderTemplate`${maybeRenderHead()}<div class="share-section" data-astro-cid-ung7bpju> <h3 data-astro-cid-ung7bpju>Share This Essay</h3> <p data-astro-cid-ung7bpju>Help others discover what's possible.</p> <div class="share-buttons" data-astro-cid-ung7bpju> <a${addAttribute(twitterUrl, "href")} target="_blank" rel="noopener noreferrer" class="share-button twitter" data-astro-cid-ung7bpju> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-ung7bpju> <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-astro-cid-ung7bpju></path> </svg>
Twitter
</a> <a${addAttribute(linkedinUrl, "href")} target="_blank" rel="noopener noreferrer" class="share-button linkedin" data-astro-cid-ung7bpju> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-ung7bpju> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-astro-cid-ung7bpju></path> </svg>
LinkedIn
</a> <a${addAttribute(hnUrl, "href")} target="_blank" rel="noopener noreferrer" class="share-button hn" data-astro-cid-ung7bpju> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-ung7bpju> <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z" data-astro-cid-ung7bpju></path> </svg>
Hacker News
</a> <a${addAttribute(emailUrl, "href")} class="share-button email" data-astro-cid-ung7bpju> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ung7bpju> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-astro-cid-ung7bpju></path> <polyline points="22,6 12,13 2,6" data-astro-cid-ung7bpju></polyline> </svg>
Email
</a> <button class="share-button copy"${addAttribute(shareUrl, "data-url")} data-astro-cid-ung7bpju> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ung7bpju> <rect x="9" y="9" width="13" height="13" rx="2" ry="2" data-astro-cid-ung7bpju></rect> <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" data-astro-cid-ung7bpju></path> </svg> <span class="button-text" data-astro-cid-ung7bpju>Copy Link</span> </button> </div> </div>  ${renderScript($$result, "/Users/billy_j/age-of-wonders/src/components/Share.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/billy_j/age-of-wonders/src/components/Share.astro", void 0);

const frontmatter = {
  "title": "Create an Age of Wonders",
  "description": "Only vision and will are necessary.",
  "date": "2026-01-08T00:00:00.000Z",
  "draft": false
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "i-the-moment-were-in",
    "text": "I. The Moment We’re In"
  }, {
    "depth": 3,
    "slug": "i-superintelligence",
    "text": "(i) Superintelligence"
  }, {
    "depth": 3,
    "slug": "ii-quantum-computing",
    "text": "(ii) Quantum Computing"
  }, {
    "depth": 3,
    "slug": "iii-biotech",
    "text": "(iii) Biotech"
  }, {
    "depth": 2,
    "slug": "ii-what-age-of-wonders-means",
    "text": "II. What “Age of Wonders” Means"
  }, {
    "depth": 2,
    "slug": "iii-whats-actually-possible",
    "text": "III. What’s Actually Possible"
  }, {
    "depth": 3,
    "slug": "energy-everywhere",
    "text": "Energy Everywhere"
  }, {
    "depth": 3,
    "slug": "materials-that-defy-intuition",
    "text": "Materials That Defy Intuition"
  }, {
    "depth": 3,
    "slug": "physics-permits-wonders",
    "text": "Physics Permits Wonders"
  }, {
    "depth": 3,
    "slug": "what-this-means",
    "text": "What This Means"
  }, {
    "depth": 2,
    "slug": "iv-energy-is-the-key-resource",
    "text": "IV. Energy is the Key Resource"
  }, {
    "depth": 3,
    "slug": "from-scarcity-to-possibility",
    "text": "From Scarcity to Possibility"
  }, {
    "depth": 3,
    "slug": "the-moral-dimension",
    "text": "The Moral Dimension"
  }, {
    "depth": 2,
    "slug": "v-nature-is-abundant-infrastructure-is-not",
    "text": "V. Nature is Abundant. Infrastructure is Not."
  }, {
    "depth": 2,
    "slug": "vi-you-can-build-this",
    "text": "VI. You Can Build This"
  }, {
    "depth": 2,
    "slug": "notes--references",
    "text": "Notes & References"
  }];
}
function _createMdxContent(props) {
  const _components = {
    br: "br",
    em: "em",
    h2: "h2",
    h3: "h3",
    hr: "hr",
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "i-the-moment-were-in",
      children: "I. The Moment We’re In"
    }), "\n", createVNode(_components.p, {
      children: "We are standing at the edge of a civilisational phase transition. Not just a new technology, but the convergence of several, each amplifying the others, and together shifting the boundary of what’s possible."
    }), "\n", createVNode(_components.p, {
      children: "For the first time in history, we have the tools to design intelligence, simulate nature, and reprogram life. These aren’t science fiction dreams. They are becoming real, fast. And they’re opening the door to something more profound: a future shaped less by what we inherit, and more by what we choose to build."
    }), "\n", createVNode(_components.h3, {
      id: "i-superintelligence",
      children: "(i) Superintelligence"
    }), "\n", createVNode(_components.p, {
      children: "The most visible shift in our world today is the rise of artificial intelligence. In just a few years, we’ve gone from simple chatbots to tools that reason, write code, and solve scientific problems once reserved for teams of experts."
    }), "\n", createVNode(_components.p, {
      children: "If you’ve worked in software, you’ve felt this shift. What began as autocomplete now feels like magic: agents that scaffold entire codebases, reason through architectures, and debug complex systems while you sleep. Tools like Claude, Cursor, and Codex have become fundamental amplifiers for our productive capacity."
    }), "\n", createVNode(_components.p, {
      children: "And yet, what makes this moment so striking isn’t just what AI can do. It’s what it can’t. These systems have no agency, curiosity, or desire. They do not choose goals. They execute them."
    }), "\n", createVNode(_components.p, {
      children: "Think of the difference between birds and planes. Birds fly with instinct and agility, weaving through branches and surfing the wind. Planes fly higher, farther, and faster — along the routes we build for them. Superintelligence is like that. Vast in power, but entirely shaped by human intent."
    }), "\n", createVNode(_components.p, {
      children: ["Because intelligence is the master resource to turn vision into action, we are removing bottlenecks to creation itself. Already, AI systems are surfacing new hypotheses and accelerating scientific workflows—from protein structure prediction", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-1",
          children: "[1]"
        })
      }), " to early-stage drug, material, and catalyst design."]
    }), "\n", createVNode($$DataInsight, {
      insight: "AlphaFold predicted the structure of over 200 million proteins—nearly every known protein on Earth.",
      context: "What once required years of lab work now takes minutes. This is intelligence as infrastructure."
    }), "\n", createVNode(_components.h3, {
      id: "ii-quantum-computing",
      children: "(ii) Quantum Computing"
    }), "\n", createVNode(_components.p, {
      children: "Quantum computing helps us understand and design the world at a deeper level, especially when it comes to materials."
    }), "\n", createVNode(_components.p, {
      children: "Biology already shows us what’s possible. Nature builds incredible structures using the same atoms we have access to. Muscles, shells, spider silk, and coral are all made with simple elements, yet stronger, lighter, and more adaptive than most human-made materials."
    }), "\n", createVNode(_components.p, {
      children: "The magic isn’t in the ingredients. It’s in the assembly."
    }), "\n", createVNode(_components.p, {
      children: "Today, we mostly guess. We discover materials through trial and error. But quantum computing (and AI-accelerated simulation) will expand our ability to simulate and explore how matter behaves at the atomic level."
    }), "\n", createVNode(_components.p, {
      children: "That changes everything."
    }), "\n", createVNode(_components.p, {
      children: "Materials that transmit energy without loss. Fabrics that store power like batteries. Structures that respond to their environment, heal themselves, or shift form on command. All built from first principles."
    }), "\n", createVNode(_components.p, {
      children: ["And we’re already seeing glimpses: early quantum simulations are helping develop better batteries and industrial catalysts", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-2",
          children: "[2]"
        })
      }), ". As these systems get better, the pace of discovery will increase. It will arrive first in narrow simulations, then in broader material design—but the trajectory is undeniable."]
    }), "\n", createVNode($$DataInsight, {
      insight: "Classical computers can't simulate how molecules interact at the quantum level, but quantum computers can.",
      context: "This opens the door to designing materials with specific properties: Superconductors, ultra-efficient catalysts, step-change battery improvements, and more from first principles."
    }), "\n", createVNode(_components.p, {
      children: "Designing new materials opens the door to new tools, new energy systems, and new kinds of infrastructure. It creates the foundations for biotech, which gives us the tools to produce such materials."
    }), "\n", createVNode(_components.h3, {
      id: "iii-biotech",
      children: "(iii) Biotech"
    }), "\n", createVNode(_components.p, {
      children: "Biotech is where design meets production."
    }), "\n", createVNode(_components.p, {
      children: "Once we know what to build — whether it’s a protein, polymer, or entirely new material — biology gives us a way to make it. Not with factories, but with cells. DNA as code. Enzymes as tools. Life as machinery."
    }), "\n", createVNode(_components.p, {
      children: "For billions of years, biology has been running the most advanced manufacturing systems on Earth. Everything from wood to silk to muscle is built with atomic precision, using ambient energy, water, and local materials. No mining. No high heat. No waste."
    }), "\n", createVNode(_components.p, {
      children: "We’re just beginning to understand how to program these systems."
    }), "\n", createVNode(_components.p, {
      children: ["CRISPR gave us the first clear edit button", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-3",
          children: "[3]"
        })
      }), ". Tools like AlphaFold are decoding the logic of protein structure", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-1",
          children: "[1]"
        })
      }), ". Synthetic biology is letting us design new organisms with specific functions: cells that produce medicines, microbes that extract rare metals, and yeast that brew biofuels", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-4",
          children: "[4]"
        })
      }), "."]
    }), "\n", createVNode($$DataInsight, {
      insight: "Up to 60% of physical inputs to the global economy could, in principle, be produced biologically.",
      context: "From textiles to fuels to building materials. Biology could replace factories with living systems that manufacture at room temperature with zero waste."
    }), "\n", createVNode(_components.p, {
      children: "Imagine plants that grow solar panels. Materials that self-repair. Foods tailored to your biology. Bioreactors that produce clean energy, high-performance materials, or rare drugs, at room temperature, with zero emissions."
    }), "\n", createVNode(_components.p, {
      children: "Biotech brings the physical world closer to the information world. It gives us the ability to print matter the way we print code. It moves us toward a future where creation is cleaner, faster, and far more precise—a future where every cell becomes a tiny factory for the age of wonders ahead."
    }), "\n", createVNode($$SummaryBox, {
      children: createVNode(_components.p, {
        children: "Taken together, these technologies form a kind of scaffolding for raising our creative ceiling. They give us tools to think more clearly, design more precisely, and produce at the deepest layers of reality. The future still depends on us: what we imagine, what we prioritise, and what we’re willing to try. An Age of Wonders is not inevitable. But for the first time, it’s within reach."
      })
    }), "\n", createVNode(_components.h2, {
      id: "ii-what-age-of-wonders-means",
      children: "II. What “Age of Wonders” Means"
    }), "\n", createVNode($$Callout, {
      type: "info",
      children: createVNode(_components.ol, {
        children: ["\n", createVNode(_components.li, {
          children: createVNode(_components.strong, {
            children: "The universe is abundant beyond our wildest dreams."
          })
        }), "\n", createVNode(_components.li, {
          children: createVNode(_components.strong, {
            children: "We can create a future of wonders."
          })
        }), "\n", createVNode(_components.li, {
          children: createVNode(_components.strong, {
            children: "Access is everything."
          })
        }), "\n"]
      })
    }), "\n", createVNode(_components.p, {
      children: ["The Sun floods Earth with thousands of times more energy than we use", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-5",
          children: "[5]"
        })
      }), ". The oceans contain fusion fuel for billions of years", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-6",
          children: "[6]"
        })
      }), ". Materials exist that are lighter than air yet stronger than steel", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-7",
          children: "[7]"
        })
      }), ". Physics permits levitation", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-8",
          children: "[8]"
        })
      }), ", time dilation", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-9",
          children: "[9]"
        })
      }), ", even energy extraction from black holes", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-10",
          children: "[10]"
        })
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "The gap between what’s possible and what we’ve built isn’t imposed by physics. It’s imposed by economic models optimised for quarterly returns, by regulations written for obsolete technologies, by collective imaginations that mistake current limitations for permanent ones."
    }), "\n", createVNode(_components.p, {
      children: "If energy becomes effectively unlimited, entire categories of problems vanish. If materials science delivers programmable matter, we can build what’s currently confined to imagination. If we take seriously what physics already permits, the ceiling disappears."
    }), "\n", createVNode(_components.p, {
      children: "The Age of Wonders isn’t about waiting for miracles. It’s about building the infrastructure to access what’s already there."
    }), "\n", createVNode(_components.h2, {
      id: "iii-whats-actually-possible",
      children: "III. What’s Actually Possible"
    }), "\n", createVNode(_components.p, {
      children: "The universe doesn’t ration energy. It floods us with it."
    }), "\n", createVNode(_components.p, {
      children: ["Every hour, the Sun delivers more energy to Earth than all of humanity uses in a year. The total? 173,000 terawatts hitting our planet continuously—over 10,000 times what we currently consume", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-5",
          children: "[5]"
        })
      }), createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-11",
          children: "[11]"
        })
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "The challenge has never been scarcity. It’s capture, conversion, and distribution."
    }), "\n", createVNode(_components.h3, {
      id: "energy-everywhere",
      children: "Energy Everywhere"
    }), "\n", createVNode(_components.p, {
      children: "Zoom out to the Solar System, and the numbers become almost meaningless. Earth intercepts roughly one two-billionth of the Sun’s total output. The rest radiates into space—enough to power trillions of civilisations at our current level."
    }), "\n", createVNode(_components.p, {
      children: "But solar is just the beginning."
    }), "\n", createVNode(_components.p, {
      children: ["The oceans contain enough deuterium—a hydrogen isotope—to fuel fusion reactors for 26 billion years at today’s consumption rates", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-6",
          children: "[6]"
        })
      }), ". One gallon of seawater, properly harnessed, holds the energy equivalent of 300 gallons of gasoline. The Moon’s surface contains an estimated one million metric tons of helium-3, another fusion fuel, deposited by billions of years of solar wind", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-12",
          children: "[12]"
        })
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "This isn’t “future technology might work someday.” The physics is settled. Fusion reactions are real—the Sun proves it every second. We’re simply learning to replicate the process at useful scales."
    }), "\n", createVNode($$DataInsight, {
      insight: "The deuterium in Earth's oceans could power humanity for 26 billion years—far longer than Earth will remain habitable.",
      context: "We don't have an energy problem. We have an access problem."
    }), "\n", createVNode(_components.h3, {
      id: "materials-that-defy-intuition",
      children: "Materials That Defy Intuition"
    }), "\n", createVNode(_components.p, {
      children: "While we solve energy, we’re also redesigning matter itself."
    }), "\n", createVNode(_components.p, {
      children: ["Graphene aerogel—essentially frozen air with a carbon skeleton—has a density of 0.16 milligrams per cubic centimetre", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-7",
          children: "[7]"
        })
      }), ". That’s lighter than helium. You can balance it on a flower petal without bending the stem."]
    }), "\n", createVNode(_components.p, {
      children: "And yet, it’s an order of magnitude stronger than steel by weight."
    }), "\n", createVNode(_components.p, {
      children: "This isn’t a riddle. Engineers have created materials that are simultaneously lighter than air and stronger than any metal in everyday use. Carbon nanotubes, metallic microlattices, and advanced composites—each breaks the old rules about what matter can do."
    }), "\n", createVNode(_components.p, {
      children: "Why does this matter? Because the limit on what we can build has always been materials. Space elevators, orbital habitats, interstellar craft—all become plausible when your structural materials weigh almost nothing but can hold immense loads."
    }), "\n", createVNode(_components.h3, {
      id: "physics-permits-wonders",
      children: "Physics Permits Wonders"
    }), "\n", createVNode(_components.p, {
      children: "Even phenomena that sound like magic are just applied physics."
    }), "\n", createVNode(_components.p, {
      children: ["Magnetic levitation already powers trains. But in a strong enough field—16 Tesla—you can levitate anything", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-8",
          children: "[8]"
        })
      }), ". Scientists have floated frogs, grasshoppers, and drops of water. The water molecules in living tissue are diamagnetic; they generate a tiny opposing field. Amplify that field enough, and gravity becomes optional."]
    }), "\n", createVNode(_components.p, {
      children: "Superconductors offer another route: quantum locking, where a chilled material expels magnetic fields and hovers rigidly at a fixed distance. Frictionless bearings. Floating cargo platforms. The physics is proven. The engineering is scaling up."
    }), "\n", createVNode(_components.p, {
      children: "Even time itself bends in our favour."
    }), "\n", createVNode(_components.p, {
      children: ["Einstein’s relativity shows that at near-light speeds, time dilates. A spacecraft accelerating at 1g could reach the nearest star in 3.6 years of ship time, or cross the entire galaxy in roughly 20 years for those onboard—though millennia would pass on Earth", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-13",
          children: "[13]"
        })
      }), createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-9",
          children: "[9]"
        })
      }), "—just energy and engineering."]
    }), "\n", createVNode(_components.p, {
      children: "The universe, it turns out, is generous even at extremes."
    }), "\n", createVNode(_components.p, {
      children: ["Physics permits energy extraction from rotating black holes—an example of how high the ceiling truly is. A spinning black hole can yield up to 29% of its mass-energy", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-14",
          children: "[14]"
        })
      }), createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-10",
          children: "[10]"
        })
      }), "—energy sufficient to power civilisations for eons."]
    }), "\n", createVNode($$DataInsight, {
      insight: "A rotating black hole can yield up to 29% of its mass-energy—enough to power civilisations for untold eons.",
      context: "Showcasing that known physics is extraordinarily generous."
    }), "\n", createVNode(_components.h3, {
      id: "what-this-means",
      children: "What This Means"
    }), "\n", createVNode(_components.p, {
      children: "Known physics—no speculation, no breakthroughs required—allows for:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Effectively unlimited clean energy (solar + fusion)"
      }), "\n", createVNode(_components.li, {
        children: "Materials stronger than steel and lighter than air"
      }), "\n", createVNode(_components.li, {
        children: "Magnetic levitation of objects large and small"
      }), "\n", createVNode(_components.li, {
        children: "Interstellar travel within a human lifetime"
      }), "\n", createVNode(_components.li, {
        children: "Energy extraction from stellar-mass objects"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "These aren’t miracles. They are technical and political projects—many already on a clear path from proof-of-concept to deployment."
    }), "\n", createVNode(_components.p, {
      children: "Freeman Dyson wrote in 1965 about civilisations harnessing starlight. Today, we’re building solar farms and ITER fusion reactors. The gap is scale, not principle."
    }), "\n", createVNode($$PullQuote, {
      children: createVNode(_components.p, {
        children: "The only limits are the laws of physics."
      })
    }), "\n", createVNode(_components.h2, {
      id: "iv-energy-is-the-key-resource",
      children: "IV. Energy is the Key Resource"
    }), "\n", createVNode(_components.p, {
      children: ["Energy is not just another resource. It’s the one that unlocks everything else", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-15",
          children: "[15]"
        })
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["Every human capability—from agriculture to medicine to computation—scales with available energy. Cities run on it. Hospitals depend on it. Communication networks need it. The difference between poverty and prosperity, between survival and flourishing, often comes down to a single variable: watts per capita", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-16",
          children: "[16]"
        })
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Consider what changes when energy becomes abundant."
    }), "\n", createVNode(_components.h3, {
      id: "from-scarcity-to-possibility",
      children: "From Scarcity to Possibility"
    }), "\n", createVNode(_components.p, {
      children: ["When energy is scarce, societies face zero-sum trade-offs", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-17",
          children: "[17]"
        })
      }), ". Clean water or electricity? Food production or manufacturing? Healthcare or heating? Every choice means sacrifice. Conflict over resources becomes rational. Suffering gets rationalised as inevitable. Short-term thinking dominates because tomorrow’s problems seem insurmountable when today’s needs aren’t met", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-18",
          children: "[18]"
        })
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "But Abundance changes the equation entirely."
    }), "\n", createVNode(_components.p, {
      children: ["Cheap, plentiful energy makes desalination trivial—turning every ocean into freshwater", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-19",
          children: "[19]"
        })
      }), ". It makes vertical farming viable—feeding billions without destroying forests", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-20",
          children: "[20]"
        })
      }), ". It enables carbon capture at scale—reversing climate change while we transition to sustainable energy", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-21",
          children: "[21]"
        })
      }), ". It powers automation that eliminates dangerous, degrading labour. It makes distance irrelevant—bringing goods, services, and opportunities to the most remote places."]
    }), "\n", createVNode(_components.p, {
      children: "Energy abundance doesn’t just solve material problems. It transforms how societies think."
    }), "\n", createVNode(_components.p, {
      children: ["When basic needs are effortlessly met, people can focus on creation instead of extraction. On building instead of competing. On long-term flourishing instead of short-term survival", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-22",
          children: "[22]"
        })
      }), ". Education becomes universal. Healthcare improves. Research accelerates", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-23",
          children: "[23]"
        })
      }), createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-24",
          children: "[24]"
        })
      }), "."]
    }), "\n", createVNode($$DataInsight, {
      insight: "Every dollar invested in energy access returns $5-10 in economic value through healthcare, education, and productivity.",
      context: "Abundance doesn't just solve one problem. It unlocks solutions to dozens of problems simultaneously."
    }), "\n", createVNode(_components.h3, {
      id: "the-moral-dimension",
      children: "The Moral Dimension"
    }), "\n", createVNode(_components.p, {
      children: "Here’s what’s rarely discussed: Abundance enables moral expansion."
    }), "\n", createVNode(_components.p, {
      children: ["This isn’t idealism. It’s historical pattern", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-25",
          children: "[25]"
        })
      }), ". Societies become more humane as they become wealthier—not because wealth makes people virtuous, but because Abundance removes the pressures that make cruelty seem necessary."]
    }), "\n", createVNode(_components.p, {
      children: "When food is scarce, starvation is tragic but expected. When clean fuels are scarce, preventable deaths are accepted as a reality. When resources are scarce, exploitation feels like survival."
    }), "\n", createVNode(_components.p, {
      children: "But when energy becomes effectively unlimited, those justifications collapse."
    }), "\n", createVNode($$DataInsight, {
      insight: "770 million people lack electricity. 2.6 billion lack clean cooking fuel. Both problems are solvable today.",
      context: "Every day we delay building energy infrastructure, millions remain trapped in preventable poverty."
    }), "\n", createVNode(_components.p, {
      children: "It becomes harder to rationalise suffering when the means to prevent it are abundant. Harder to accept inequality when the resources exist to lift everyone. Harder to defend systems built on extraction when clean alternatives are cheaper and better. Abundance doesn’t guarantee good choices—humans are still humans—but it removes the false excuse that cruelty is economically necessary."
    }), "\n", createVNode(_components.p, {
      children: ["The future isn’t about hoarding limited resources. It’s about building the infrastructure to access what’s already there in overwhelming quantity", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-26",
          children: "[26]"
        })
      }), "."]
    }), "\n", createVNode($$PullQuote, {
      children: createVNode(_components.p, {
        children: "Abundance enables moral expansion."
      })
    }), "\n", createVNode(_components.h2, {
      id: "v-nature-is-abundant-infrastructure-is-not",
      children: "V. Nature is Abundant. Infrastructure is Not."
    }), "\n", createVNode(_components.p, {
      children: "Look at the numbers, and a pattern emerges: nature provides Abundance. We create scarcity."
    }), "\n", createVNode(_components.p, {
      children: "The bottleneck isn’t supply. It’s infrastructure."
    }), "\n", createVNode(_components.p, {
      children: "We lack efficient solar capture and storage. We haven’t mastered fusion containment. We don’t have the materials for space-based collectors or the economic models to fund them at scale. These are problems of access, not physics."
    }), "\n", createVNode(_components.p, {
      children: "The same pattern appears everywhere. Graphene aerogel—lighter than air, stronger than steel—exists in laboratories but not in construction yards. Magnetic levitation works beautifully, but requires infrastructure we haven’t built. Time dilation enables interstellar travel, but only if we develop propulsion systems that can sustain 1g acceleration."
    }), "\n", createVNode(_components.p, {
      children: ["But look at what’s already shifting. Solar costs have fallen 90% in a decade", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-27",
          children: "[27]"
        })
      }), ". Battery storage is following the same curve. Fusion experiments have crossed key milestones in ignition and gain", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-31",
          children: "[31]"
        })
      }), ". Desalination costs have dropped 80% since 2000", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-28",
          children: "[28]"
        })
      }), "."]
    }), "\n", createVNode($$DataInsight, {
      insight: "Solar energy costs have declined by 90% in the last decade. Battery storage costs have fallen 89% since 2010.",
      context: "The infrastructure for Abundance is happening right now. Every year, it becomes cheaper and easier."
    }), "\n", createVNode(_components.p, {
      children: "We’re not fighting nature’s limits. We’re building the bridges between what exists and what we can use. Every breakthrough in materials science, energy storage, or manufacturing brings Abundance closer. Every improvement in solar efficiency or fusion confinement brings the ceiling higher."
    }), "\n", createVNode(_components.p, {
      children: ["The Age of Wonders isn’t about discovering new physics. It’s about ", createVNode(_components.em, {
        children: "using"
      }), " the physics we already understand."]
    }), "\n", createVNode(_components.p, {
      children: ["And here’s what most people miss: ", createVNode(_components.strong, {
        children: "courage is the bottleneck"
      }), "."]
    }), "\n", createVNode(_components.h2, {
      id: "vi-you-can-build-this",
      children: "VI. You Can Build This"
    }), "\n", createVNode(_components.p, {
      children: "The tools exist. AI that amplifies intelligence. Quantum computing that designs materials. Biotech that reprograms life. Solar panels. Fusion research. Advanced materials. Open-source knowledge. Global networks."
    }), "\n", createVNode(_components.p, {
      children: "Everything in this essay is real. Measured. Published. Waiting for someone with vision and will."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "You don’t need permission."
      })
    }), "\n", createVNode(_components.p, {
      children: ["Individuals and communities are deploying solar installations without waiting for utilities", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-29",
          children: "[29]"
        })
      }), ". Fusion startups are raising capital and building reactors outside traditional institutions", createVNode("sup", {
        children: createVNode("a", {
          href: "#ref-30",
          children: "[30]"
        })
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "The infrastructure for creation is increasingly decentralised, accessible, and cheap."
    }), "\n", createVNode(_components.p, {
      children: "You need curiosity, determination, and the courage to build as if Abundance is already here."
    }), "\n", createVNode(_components.p, {
      children: "Because it is."
    }), "\n", createVNode(_components.p, {
      children: "The Age of Wonders isn’t something that happens to us. It’s something we create, one bold decision at a time. Intelligence is no longer the bottleneck."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Courage is."
      })
    }), "\n", createVNode($$Share, {
      title: "Create an Age of Wonders",
      description: "Known physics permits abundance. Infrastructure and courage determine whether we reach it."
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h2, {
      id: "notes--references",
      children: "Notes & References"
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-1",
        children: "[1]"
      }), " Jumper, J. et al. (2021).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.nature.com/articles/s41586-021-03819-2",
        target: "_blank",
        children: "”Highly accurate protein structure prediction with AlphaFold.”"
      }), " ", createVNode(_components.em, {
        children: "Nature"
      }), " 596, 583–589.", createVNode(_components.br, {}), "\nSee also: ", createVNode("a", {
        href: "https://alphafold.ebi.ac.uk/",
        target: "_blank",
        children: "AlphaFold Protein Structure Database"
      }), " — Over 200 million predicted structures."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-2",
        children: "[2]"
      }), " O’Brien, J. (2019).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.weforum.org/stories/2019/12/quantum-computing-applications-climate-change/",
        target: "_blank",
        children: "”Quantum computing for innovative climate-change solutions.”"
      }), " ", createVNode(_components.em, {
        children: "World Economic Forum"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-3",
        children: "[3]"
      }), " Doudna, J.A. & Charpentier, E. (2014).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.science.org/doi/10.1126/science.1258096",
        target: "_blank",
        children: "”The new frontier of genome engineering with CRISPR-Cas9.”"
      }), " ", createVNode(_components.em, {
        children: "Science"
      }), " 346(6213)."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-4",
        children: "[4]"
      }), " McKinsey Global Institute (2020).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.mckinsey.com/industries/life-sciences/our-insights/the-bio-revolution-innovations-transforming-economies-societies-and-our-lives",
        target: "_blank",
        children: "”The Bio Revolution.”"
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-5",
        children: "[5]"
      }), " NASA Earth Observatory.", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://earthobservatory.nasa.gov/features/EnergyBalance",
        target: "_blank",
        children: "”Earth’s Energy Budget.”"
      }), createVNode(_components.br, {}), "\n(Explains how incoming solar radiation reaches Earth and contributes to the climate system; NASA confirms the Sun’s enormous energy input.)"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-6",
        children: "[6]"
      }), " ITER Organization / National Academies of Sciences.", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.iter.org/sci/FusionFuels",
        target: "_blank",
        children: "”Fusion fuels: deuterium and tritium.”"
      }), createVNode(_components.br, {}), "\n(Scientific description of abundant deuterium in oceans as a long-term fusion fuel potential.)"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-7",
        children: "[7]"
      }), " Sun, H. et al. (2013).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://doi.org/10.1002/adma.201204576",
        target: "_blank",
        children: "”Ultra-light graphene aerogels.”"
      }), " ", createVNode(_components.em, {
        children: "Advanced Materials"
      }), " 25(18), 2554–2560."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-8",
        children: "[8]"
      }), " Berry, M.V. & Geim, A.K. (1997).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://iopscience.iop.org/article/10.1088/0143-0807/18/4/012",
        target: "_blank",
        children: "”Of flying frogs and levitrons.”"
      }), " ", createVNode(_components.em, {
        children: "Eur. J. Phys."
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-9",
        children: "[9]"
      }), " Rindler, W. (1977).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://link.springer.com/book/10.1007/978-3-642-86650-0",
        target: "_blank",
        children: "”Essential Relativity: Special, General, and Cosmological.”"
      }), " (2nd ed.) Springer."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-10",
        children: "[10]"
      }), " Cui, Y. et al. (2021).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://arxiv.org/abs/2012.00879",
        target: "_blank",
        children: "”Energy extraction through magnetic reconnection from Kerr black holes.”"
      }), " ", createVNode(_components.em, {
        children: "Phys. Rev. D"
      }), " 103, 023014. (Open-access preprint)"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-11",
        children: "[11]"
      }), " MIT News (2011).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://news.mit.edu/2011/energy-scale-part3-1026",
        target: "_blank",
        children: "”Shining brightly.”"
      }), createVNode(_components.br, {}), "\n(About 173,000 terawatts of solar energy continuously strike Earth, ~10,000× human energy use.)"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-12",
        children: "[12]"
      }), " Wittenberg, L. et al. (1986).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://dx.doi.org/10.13182/FST86-A24972",
        target: "_blank",
        children: "”Helium-3 Fusion and the Lunar Resource.”"
      }), " ", createVNode(_components.em, {
        children: "Fusion Technology"
      }), ", Vol. 10.", createVNode(_components.br, {}), "\n(Helium-3 is abundant on the Moon from solar wind and latent in gas giants.)"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-13",
        children: "[13]"
      }), " Forward, R.L. (1984).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://doi.org/10.2514/3.8632",
        target: "_blank",
        children: "”Roundtrip Interstellar Travel Using Laser-Pushed Lightsails.”"
      }), " ", createVNode(_components.em, {
        children: "J. Spacecraft Rockets"
      }), " 21(2), 187–195."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-14",
        children: "[14]"
      }), " Kipping, D. (2019).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://arxiv.org/abs/1903.03423",
        target: "_blank",
        children: "”The Halo Drive: Fuel-free relativistic propulsion.”"
      }), " Preprint (physics proposal)."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-15",
        children: "[15]"
      }), " Smil, V. (2017).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://mitpress.mit.edu/9780262536165/energy-and-civilization/",
        target: "_blank",
        children: "”Energy and Civilization: A History.”"
      }), " MIT Press."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-16",
        children: "[16]"
      }), " International Energy Agency (2022).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.iea.org/reports/world-energy-outlook-2022",
        target: "_blank",
        children: "”World Energy Outlook.”"
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-17",
        children: "[17]"
      }), " World Bank (2020).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.worldbank.org/en/topic/energy/overview",
        target: "_blank",
        children: "”Energy Access: Why It Matters.”"
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-18",
        children: "[18]"
      }), " United Nations Development Programme (2020).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://hdr.undp.org/",
        target: "_blank",
        children: "”Human Development Report.”"
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-19",
        children: "[19]"
      }), " National Renewable Energy Laboratory (2021).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.nrel.gov/water/desalination.html",
        target: "_blank",
        children: "”Renewable-Powered Desalination.”"
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-20",
        children: "[20]"
      }), " World Economic Forum (2025).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.weforum.org/stories/2025/07/energy-food-and-water-nexus/",
        target: "_blank",
        children: "”Why energy access is key to food security.”"
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-21",
        children: "[21]"
      }), " Gates, B. (2021).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.penguinrandomhouse.com/books/633968/how-to-avoid-a-climate-disaster-by-bill-gates/",
        target: "_blank",
        children: "”How to Avoid a Climate Disaster.”"
      }), " Knopf."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-22",
        children: "[22]"
      }), " Rosling, H. (2018).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.gapminder.org/factfulness-book/",
        target: "_blank",
        children: "”Factfulness.”"
      }), " Flatiron Books."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-23",
        children: "[23]"
      }), " OECD (2017).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://doi.org/10.1787/9789264285569-en",
        target: "_blank",
        children: "”Energy, education and development.”"
      }), " ", createVNode(_components.em, {
        children: "IEA/OECD – Energy Access Outlook 2017: From Poverty to Prosperity."
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-24",
        children: "[24]"
      }), " World Health Organization (2022).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.who.int/publications/i/item/9789240066960",
        target: "_blank",
        children: "”Energy access in health care facilities.”"
      }), " ", createVNode(_components.em, {
        children: "WHO – Energizing health: accelerating electricity access in health-care facilities."
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-25",
        children: "[25]"
      }), " Pinker, S. (2018).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.penguinrandomhouse.com/books/317051/enlightenment-now-by-steven-pinker/",
        target: "_blank",
        children: "”Enlightenment Now: The Case for Reason, Science, Humanism, and Progress.”"
      }), " Viking."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-26",
        children: "[26]"
      }), " Rockström, J. et al. (2023).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.clubofrome.org/publication/earth4all-book/",
        target: "_blank",
        children: "”Earth for All: A Survival Guide for Humanity.”"
      }), " Club of Rome."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-27",
        children: "[27]"
      }), " International Renewable Energy Agency (2021).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.irena.org/publications/2021/Jun/Renewable-Power-Costs-in-2020",
        target: "_blank",
        children: "”Renewable Power Costs in 2020.”"
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-28",
        children: "[28]"
      }), " World Bank (2019).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://documents1.worldbank.org/curated/en/476041552622967264/pdf/135312-WP-PUBLIC-14-3-2019-12-3-35-W.pdf",
        target: "_blank",
        children: "”The Role of Desalination in an Increasingly Water-Scarce World.”"
      }), " ", createVNode(_components.em, {
        children: "World Bank Technical Paper."
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-29",
        children: "[29]"
      }), " International Energy Agency (2022).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.iea.org/reports/renewables-2022",
        target: "_blank",
        children: "”Renewables 2022: Distributed Solar.”"
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-30",
        children: "[30]"
      }), " Fusion Industry Association (2023).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.fusionindustryassociation.org/wp-content/uploads/2023/07/FIA%E2%80%932023-FINAL.pdf",
        target: "_blank",
        children: "”The Global Fusion Industry in 2023.”"
      }), " ", createVNode(_components.em, {
        children: "FIA Third Annual Industry Report."
      })]
    }), "\n", createVNode(_components.p, {
      children: [createVNode("span", {
        id: "ref-31",
        children: "[31]"
      }), " Lawrence Livermore National Laboratory (2022).", createVNode(_components.br, {}), "\n", createVNode("a", {
        href: "https://www.llnl.gov/news/national-ignition-facility-achieves-fusion-ignition",
        target: "_blank",
        children: "”National Ignition Facility achieves fusion ignition.”"
      }), createVNode(_components.br, {}), "\n(First controlled fusion experiment to produce more energy from fusion than the laser energy delivered to the target.)"]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/essays/create-an-age-of-wonders.mdx";
const file = "/Users/billy_j/age-of-wonders/src/content/essays/create-an-age-of-wonders.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/billy_j/age-of-wonders/src/content/essays/create-an-age-of-wonders.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
