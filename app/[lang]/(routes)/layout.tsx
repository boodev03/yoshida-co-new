import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ContactSection from "@/modules/home/ContactSection";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-svh">{children}</main>
      <ContactSection />
      <Footer />
    </>
  );
}
