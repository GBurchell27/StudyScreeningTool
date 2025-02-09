'use client';

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2024 Systematic Review Tool. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}