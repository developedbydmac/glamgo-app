/**
 * Product Category Enum
 * 
 * Defines the available categories for beauty products in GLAMGO.
 * These categories help organize products and enable filtering.
 */

export enum ProductCategory {
  HAIR = 'Hair',
  NAILS = 'Nails',
  MAKEUP = 'Makeup',
  SKINCARE = 'Skincare',
  TOOLS = 'Tools',
  ACCESSORIES = 'Accessories',
}

/**
 * Helper function to get all category values
 */
export const getAllCategories = (): ProductCategory[] => {
  return Object.values(ProductCategory);
};

/**
 * Helper function to get category display name
 */
export const getCategoryDisplayName = (category: ProductCategory): string => {
  return category;
};
