import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface CheckoutParams {
  productName: string;
  price: string | number;
  quantity?: string | number;
  imageUrl: string;
}

export function formatToIDR(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export async function navigateToCheckout(
  router: AppRouterInstance,
  params: CheckoutParams
): Promise<void> {
  try {
    console.log("Navigating to checkout with params:", params); // Debug log

    const searchParams = new URLSearchParams({
      product: params.productName,
      price: params.price.toString(),
      quantity: (params.quantity || 1).toString(),
      image: params.imageUrl,
    });

    const url = `/checkout?${searchParams.toString()}`;
    console.log("Navigation URL:", url); // Debug log

    await router.push(url);
  } catch (error) {
    console.error("Navigation error in checkout.ts:", error);
    throw error;
  }
}
