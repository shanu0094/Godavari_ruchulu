import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata = {
  title: "FestBites - QR Food Stall",
  description: "Order your favorite food directly from your table.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
