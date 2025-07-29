import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

// Fonts système Apple-like, perf premium
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-br from-[#f6fafd] to-[#eaf1fb]`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert mb-2"
          src="/logo-kinexperience.png"
          alt="KineXperience Logo"
          width={98}
          height={98}
          priority
          style={{ borderRadius: 16, boxShadow: '0 6px 18px #1674ea15' }}
        />
        <h1 className="font-extrabold text-3xl sm:text-4xl text-center text-[#184074] tracking-tight mb-2">
          Génère ton programme d’exercices, personnalisé, validé par la science.
        </h1>
        <p className="text-lg sm:text-xl text-[#4366a1] text-center max-w-2xl font-semibold mb-3">
          KineXperience te propose la routine optimale en 30 secondes : adaptée à ta douleur, ton niveau, tes objectifs.
        </p>
        {/* Appel à l’action / futur bouton */}
        <a
          href="#"
          className="rounded-full bg-gradient-to-r from-[#1674ea] to-[#1d7fff] text-white font-bold py-3 px-8 text-lg shadow-lg hover:scale-105 transition-transform"
        >
          Commencer maintenant
        </a>
        {/* Section démo ou onboarding ici */}
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left mt-7">
          <li className="mb-2 tracking-[-.01em]">
            Teste l’éditeur en modifiant <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">src/pages/index.js</code>
          </li>
          <li className="tracking-[-.01em]">Visualise ton design instantanément.</li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Déployer sur Vercel
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lire la doc Next.js
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-[#a7b2c4] text-[15px] font-mono">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Exemples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          nextjs.org →
        </a>
      </footer>
    </div>
  );
}
