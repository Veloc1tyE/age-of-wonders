# Email Subscription Setup Guide

Your Age of Wonders blog has a beautiful, simple email subscription form. Here's how to get it working:

## Buttondown Setup (Recommended - Free & Simple)

Buttondown is perfect for independent writers. It's clean, respects privacy, and has a generous free tier.

### Setup Steps:

1. **Create a Buttondown account**
   - Go to [buttondown.email](https://buttondown.email)
   - Sign up for free (supports up to 100 subscribers)
   - Choose your newsletter name: `ageofwonders` (or whatever you prefer)

2. **Update the subscribe form**
   - In `src/pages/subscribe.astro`, find this line:
   ```html
   action="https://buttondown.email/api/emails/embed-subscribe/ageofwonders"
   ```
   - Replace `ageofwonders` with your actual Buttondown username

3. **Customize your welcome email** (optional)
   - In Buttondown settings, set up your welcome email
   - Add your voice and vision

4. **Test it!**
   - Go to `/subscribe` on your site
   - Enter your email
   - You should get a confirmation email

### Buttondown Features:
- ✅ Clean, minimal interface
- ✅ Markdown support for emails
- ✅ Analytics
- ✅ Import/export subscribers
- ✅ Free up to 100 subscribers, then $9/mo
- ✅ RSS-to-email (if you add RSS later)

## Alternative Services

If you prefer other services, here are alternatives:

### Substack
- Very popular for writers
- Built-in discovery
- Free, takes 10% of paid subscriptions
- Replace the form with Substack's embed code

### ConvertKit
- More features, more complex
- Free up to 1,000 subscribers
- Good automation

### Mailchimp
- Classic choice
- Free up to 500 subscribers
- More marketing-focused

## Current Setup

The subscribe page has:
- ✅ Beautiful email form with proper styling
- ✅ Matches your retro-futuristic aesthetic
- ✅ Mobile responsive
- ✅ Hover states and focus styles
- ✅ Accessible form labels
- ✅ Clean, simple focus on email only

## Testing Locally

1. The form is set up but won't work until you:
   - Create a Buttondown account
   - Update the form action URL with your username

2. When you deploy, remember to:
   - Update `site` in `astro.config.mjs` to your actual domain
   - Update the Buttondown URL if needed
   - Test the subscription form

---

**Design Philosophy:** We've focused on simplicity—just email, no RSS or other distractions. This aligns with the "beautiful simplicity" aesthetic of Age of Wonders. Subscribers get your essays directly in their inbox, and you can focus on writing.
