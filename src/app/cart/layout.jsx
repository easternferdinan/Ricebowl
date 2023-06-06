export const metadata = {
  title: "Ricebowl | Cart",
};

export default function CartLayout({ children }) {
  return (
    <main className="flex justify-between gap-5 flex-col min-h-full">
      {children}
    </main>
  );
}
