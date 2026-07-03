import ResumeHero from "@/components/hero/meadow/ResumeHero";

export const metadata = {
  title: "Resume | Param Patel",
  description: "My professional journey, milestones, and experience.",
};

export default function ResumePage() {
  return (
    <main className="w-full h-full relative" style={{ backgroundColor: 'var(--bg-main)' }}>
      <ResumeHero />
    </main>
  );
}
