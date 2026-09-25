import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { HistoryList } from "@/components/HistoryList";

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-(--color-bg)">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col items-center gap-6 px-4 py-5 lg:items-start lg:gap-8 lg:px-12 lg:py-10">
          <HistoryList />
        </main>
      </div>
      <Footer />
    </div>
  );
}
