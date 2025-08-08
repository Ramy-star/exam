import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { BrainCircuit } from "lucide-react";

export function Header() {
  return (
    <header className="relative flex items-center justify-center gap-4 border-b-2 py-6 mb-5" style={{ borderColor: 'hsl(var(--header-border))' }}>
      <Image
        src="https://placehold.co/80x80.png"
        alt="Digestive System Icon"
        width={80}
        height={80}
        data-ai-hint="digestive system"
        className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-full shadow-md"
      />
      <h1 className="font-headline text-5xl md:text-6xl text-[hsl(var(--header-text))] shadow-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
        GIT
      </h1>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-2">
        <Link href="/quiz-builder" legacyBehavior passHref>
          <Button variant="outline" className="hidden sm:inline-flex">
            <BrainCircuit className="mr-2 h-4 w-4" />
            Quiz Builder
          </Button>
        </Link>
        <ThemeToggle />
      </div>
      <Link href="/quiz-builder" legacyBehavior passHref>
          <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50 sm:hidden rounded-full shadow-lg">
            <BrainCircuit className="h-5 w-5" />
            <span className="sr-only">Quiz Builder</span>
          </Button>
        </Link>
    </header>
  );
}
