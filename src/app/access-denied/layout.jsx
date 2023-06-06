export const metadata = {
  title: "Ricebowl | 403 Forbidden",
};

export default function AccessDeniedLayout({ children }) {
  return (
    <main className="flex flex-col justify-center items-center h-full">
      {children}
    </main>
  );
}
