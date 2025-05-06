export const CURRENCY_ICON = "₹"
export const CURRENCY_NAME = "inr"
export const STRIPE_API_VERSION = "2025-03-31.basil"

export const SITE_NAME = "WooNext"
export const SITE_URL = "https://woo-next.vercel.app"
export const SITE_DESCRIPTION = "A modern e-commerce store built with Next.js"
export const SITE_CREATOR = "WooNext Team"
export const SITE_KEYWORDS = ["ecommerce", "nextjs", "react", "shopping", "online store"]

export const DEFAULT_METADATA = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_CREATOR }],
  creator: SITE_CREATOR,
  publisher: SITE_CREATOR,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/next.svg`,
        width: 180,
        height: 37,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
}

export const HOME_METADATA = {
  ...DEFAULT_METADATA,
  title: `${SITE_NAME} | Home`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...DEFAULT_METADATA.openGraph,
    title: `${SITE_NAME} | Home`,
  },
  twitter: {
    ...DEFAULT_METADATA.twitter,
    title: `${SITE_NAME} | Home`,
  },
}

export const PRODUCT_METADATA = {
  ...DEFAULT_METADATA,
  title: `${SITE_NAME} | Product Details`,
  description: "View detailed product information and pricing",
  alternates: {
    canonical: "/product",
  },
  openGraph: {
    ...DEFAULT_METADATA.openGraph,
    title: `${SITE_NAME} | Product Details`,
    description: "View detailed product information and pricing",
  },
  twitter: {
    ...DEFAULT_METADATA.twitter,
    title: `${SITE_NAME} | Product Details`,
    description: "View detailed product information and pricing",
  },
}

export const SUCCESS_METADATA = {
  ...DEFAULT_METADATA,
  title: `${SITE_NAME} | Order Successful`,
  description: "Your order has been successfully processed",
  alternates: {
    canonical: "/success",
  },
  openGraph: {
    ...DEFAULT_METADATA.openGraph,
    title: `${SITE_NAME} | Order Successful`,
    description: "Your order has been successfully processed",
  },
  twitter: {
    ...DEFAULT_METADATA.twitter,
    title: `${SITE_NAME} | Order Successful`,
    description: "Your order has been successfully processed",
  },
}

export const CANCEL_METADATA = {
  ...DEFAULT_METADATA,
  title: `${SITE_NAME} | Order Cancelled`,
  description: "Your order has been cancelled",
  alternates: {
    canonical: "/cancel",
  },
  openGraph: {
    ...DEFAULT_METADATA.openGraph,
    title: `${SITE_NAME} | Order Cancelled`,
    description: "Your order has been cancelled",
  },
  twitter: {
    ...DEFAULT_METADATA.twitter,
    title: `${SITE_NAME} | Order Cancelled`,
    description: "Your order has been cancelled",
  },
}