export type NavCategory = {
  name: string;
  href: string;
  description: string;
};

export type NavItem = {
  name: string;
  href: string;
};

export const categories: NavCategory[] = [
  {
    name: "Electronics",
    href: "/category/electronics",
    description: "Phones, laptops, and accessories",
  },
  {
    name: "Clothing",
    href: "/category/clothing",
    description: "Fashion for all ages and styles",
  },
  {
    name: "Home",
    href: "/category/home",
    description: "Furniture, decor, and kitchen goods",
  },
];

export const navigationItems: NavItem[] = [
  {
    name: "Deals",
    href: "/deals",
  },
  {
    name: "New Arrivals",
    href: "/new-arrivals",
  },
];

export const allProductsLink = {
  name: "All Products",
  href: "/",
  description: "Browse our complete product catalog",
}; 