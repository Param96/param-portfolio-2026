import { sanityFetch } from "@/sanity/lib/live";
import { ALL_LAB_NOTES_QUERY } from "@/sanity/lib/queries";
import LabNotesHero3D from "@/components/LabNotesHero3D";
import LabNotesList from "@/components/LabNotesList";

export const revalidate = 60;

export default async function LabNotesPage() {
  const { data } = await sanityFetch({ query: ALL_LAB_NOTES_QUERY });
  const labNotes = data as any[];

  return (
    <div className="relative min-h-screen bg-[#FAEDCD]">
      
      {/* 3D Immersive Hero */}
      <LabNotesHero3D />

      {/* Raw / Unfinished Feed */}
      <section className="max-w-3xl mx-auto px-6 flex flex-col gap-24 relative mt-20 pb-40">
        
        {/* Background connector line */}
        <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[#354F52]/10 md:-translate-x-1/2 pointer-events-none" />

        <LabNotesList notes={labNotes} />
        
      </section>
    </div>
  );
}
