import { MainLayout } from '@/components/layout/main-layout';
import { TopBar } from '@/components/layout/top-bar';
import { Footer } from '@/components/layout/footer';
import { MatrixRain } from '@/components/ui/matrix-rain';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center dark:opacity-20 opacity-10 z-[1]">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/40 to-accent/40 blur-3xl" />
      </div>
      <MatrixRain />
      
      {/* Main content */}
      <div className="relative z-[2] flex flex-col min-h-screen bg-background/0">
        <TopBar />
        <main className="flex-1 container mx-auto p-4">
          <div className="rounded-lg border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
            <MainLayout />
          </div>
        </main>
        <Footer/>
      </div>
    </div>
  );
}