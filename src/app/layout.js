import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata = {
  title: "Godavari Ruchulu - QR Food Stall",
  description: "Order fresh food directly to your table seamlessly.",
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
