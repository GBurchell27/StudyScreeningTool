import { MainLayout } from '@/components/layout/main-layout';
import { TopBar } from '@/components/layout/top-bar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1">
        <MainLayout />
      </main>
    </div>
  );
}