# woo-next

A ready-to-use store template that connects Next.js with the WooCommerce REST API. Uses Stripe for payments.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FArjunCodess%2Fwoo-next&project-name=woo-next&repository-name=woo-next&env=WC_CONSUMER_KEY%2CWC_CONSUMER_SECRET%2CWP_WEBSITE_URL%2CWP_WEBSITE_HOSTNAME%2CNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY%2CSTRIPE_SECRET_KEY%2CNEXT_PUBLIC_SITE_URL&envDescription=Environment+variables+required+for+woo-next)

## What This Is

This is a store template made with:
- Next.js (React framework)
- WooCommerce (main ecommerce product management)
- Stripe (payments)
- TypeScript (type safety)
- shadcn/ui (good-looking UI)

### What's included?

✅ Complete e-commerce functionality with WooCommerce<br>
✅ Secure payments via Stripe integration<br>
✅ Type-safe data layer with WooCommerce REST API<br>
✅ Dynamic product pages and cart system<br>
✅ Modern UI components from shadcn/ui<br>
✅ Responsive design for all devices<br>
✅ SEO optimization with proper metadata<br>
✅ Fast page loads with Server Components<br>
✅ Easy customization and extension<br>
✅ Proper TypeScript types<br>
✅ Clean project structure<br>

## Key Features

- 💰 Product listing with prices
- 🛒 Cart system
- 💳 Checkout with Stripe 
- 📱 Works on all screen sizes (mobile, tablet, desktop)
- ✅ Type-safe code with TypeScript
- 🔍 SEO ready with proper metadata
- 🎨 Clean UI using shadcn components
- 🚀 Fast page loads with Server Components
- 🧩 Easy to extend and customize

## Get Started

1. Clone this repo:
    ```bash
    git clone [your-repo-url]
    ```

2. Install stuff:
    ```bash
    npm install
    # or
    pnpm install
    ```

3. Set up your env vars:
Create a `.env.local` file with:
    ```
    WC_CONSUMER_KEY=
    WC_CONSUMER_SECRET=

    WP_WEBSITE_URL=
    WP_WEBSITE_HOSTNAME=

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
    STRIPE_SECRET_KEY=

    NEXT_PUBLIC_SITE_URL=http://localhost:3000
    ```

4. Start dev server:
    ```bash
    npm run dev
    # or
    pnpm dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) to see your store.

## Pages

- Home (`/`) - Shows all products
![woo-next](/public/home.png)
- Product detail (`/product/[id]`) - Shows one product
![woo-next](/public/product_id.png)
- Checkout success (`/success`) - After payment works
![woo-next](/public/success.png)
- Checkout cancel (`/cancel`) - When payment is stopped
![woo-next](/public/cancel.png)
- Cart - Shows all the products in cart
![woo-next](/public/cart.png)

## How to Use

### Change Store Settings

Edit `src/lib/constants.ts` to change:
- Currency symbol
- Store name
- Site URL
- Store description

### Style Changes

This uses shadcn/ui with Tailwind CSS. Edit styles in the component files or in `globals.css`.

### WooCommerce Setup

1. Have a WordPress site with WooCommerce plugin
2. Create API keys in WooCommerce settings
3. Add these keys to your `.env.local` file

### Stripe Setup

1. Get API keys from Stripe Dashboard
2. Add these keys to your `.env.local` file

## Project Structure

```
├── src/                  # All code lives here
│   ├── actions/          # Server actions (data fetching)
│   ├── app/              # Pages and routes
│   ├── components/       # UI components
│   ├── hooks/            # React hooks
│   ├── lib/              # Helper functions
│   ├── providers/        # Context providers
│   └── types/            # TypeScript types
├── public/               # Static files
├── next.config.ts        # Next.js config
└── package.json          # Dependencies
```

## Contributing

Want to help? Great!

1. Fork the repo
2. Create a branch (`git checkout -b new-feature`)
3. Make changes
4. Test your changes
5. Commit (`git commit -m 'feat: Add new feature'`)
6. Push to your branch (`git push origin new-feature`)
7. Open a Pull Request

### Rules for Contributing

- Keep it simple
- Follow the code style
- Test before you push
- Write clear commit messages

## License

MIT - do what you want with this.

## Credits

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Payments by [Stripe](https://stripe.com)
- Products from [WooCommerce](https://woocommerce.com/)