import { MainLayout } from '@/components/layout/main-layout';
import { TopBar } from '@/components/layout/top-bar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center dark:opacity-20 opacity-10">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/40 to-accent/40 blur-3xl" />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 container mx-auto p-4">
          <div className="rounded-lg border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
            <MainLayout />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>© 2024 Systematic Review Tool. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}