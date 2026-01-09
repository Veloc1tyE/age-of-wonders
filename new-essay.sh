#!/bin/bash
# Quick script to create a new essay from template

# Get essay slug from argument
if [ -z "$1" ]; then
    echo "Usage: ./new-essay.sh essay-slug"
    echo "Example: ./new-essay.sh free-starship"
    exit 1
fi

SLUG="$1"
TITLE=$(echo "$SLUG" | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g')
TODAY=$(date +%Y-%m-%d)
FILE="src/content/essays/${SLUG}.mdx"

# Create essay from template
cat > "$FILE" << EOF
---
title: $TITLE
description: [Add a compelling one-line description here]
date: $TODAY
draft: true
---

## Introduction

[Start with a hook - a surprising fact, compelling question, or bold claim]

## Main Content

[Your essay content here]

### Subsection

[Break into clear sections]

## Key Insight

[Highlight the main takeaway]

## What This Means

[Connect to the bigger picture - abundance, access, the future]

## Conclusion

[End with inspiration or a call to action]

---

## Notes & References

[Optional: Technical details, calculations, citations]
EOF

echo "✅ Created new essay: $FILE"
echo "📝 Edit the file and set draft: false when ready to publish"
echo "🚀 Preview at: http://localhost:4321/essays/$SLUG"
