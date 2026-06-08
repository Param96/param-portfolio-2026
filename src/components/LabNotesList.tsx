"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PortableText } from "next-sanity";

export default function LabNotesList({ notes }: { notes: any[] }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-20 text-[#52796F] text-lg font-medium">
        No lab notes published yet.
      </div>
    );
  }

  return (
    <>
      {notes.map((note, idx) => {
        const isEven = idx % 2 === 0;
        const alignClass = isEven 
          ? "ml-8 md:ml-0 md:mr-32 bg-[#FEFAE0]" 
          : "ml-8 md:ml-32 md:mr-0 bg-[#E9EDC9]";
        const dotColor = isEven ? "bg-[#D4A373] shadow-[0_0_15px_rgba(212,163,115,0.5)]" : "bg-[#52796F] shadow-[0_0_15px_rgba(82,121,111,0.5)]";
        const dateColor = isEven ? "text-[#84A98C]" : "text-[#D4A373]";
        const dotPosition = isEven ? "left-[-40px] md:right-[-40px] md:left-auto" : "left-[-40px]";
        
        return (
          <motion.article
            key={note._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1 * (idx % 3), ease: [0.16, 1, 0.3, 1] }}
            className={`relative p-8 md:p-12 border border-[#354F52]/5 shadow-xl transition-all hover:shadow-2xl ${alignClass}`}
          >
            <div className={`absolute ${dotPosition} top-10 w-4 h-4 rounded-full z-10 ${dotColor}`} />
            
            <span className={`font-jetbrains text-[10px] ${dateColor}`}>
              {new Date(note.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
            </span>
            <Link href={`/lab-notes/${note.slug}`}>
              <h2 className="text-2xl font-bold text-[#2F3E46] mt-4 mb-6 hover:text-[#52796F] transition-colors">
                {note.title}
              </h2>
            </Link>
            <div className="prose prose-p:text-[#354F52] prose-p:leading-relaxed text-sm max-w-none">
              {note.content ? (
                <PortableText value={note.content} />
              ) : (
                <p>No content provided.</p>
              )}
            </div>
            
            <div className="mt-8 flex gap-2 flex-wrap">
              {note.tags?.map((tag: string, i: number) => (
                <span key={i} className="text-[10px] uppercase font-bold text-[#84A98C] bg-[#84A98C]/10 px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        );
      })}
    </>
  );
}
