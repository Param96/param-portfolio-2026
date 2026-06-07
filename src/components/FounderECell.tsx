"use client";

import { motion } from "framer-motion";

export default function FounderECell() {
  return (
    <section className="relative w-full py-40 bg-[#FEFAE0] text-[#2F3E46]">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A373] mb-6 block">
                0-to-1 Execution
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#2F3E46] mb-8">
                Building <br />
                <span className="font-bold italic text-[#52796F]">Community.</span>
              </h2>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="prose prose-lg prose-p:text-[#354F52] prose-p:leading-relaxed prose-p:font-medium"
            >
              <p>
                Engineering is only half the equation. The other half is cultivating environments where ambitious people can experiment, fail, and ship.
              </p>
              <p>
                I founded the Entrepreneurship Cell (E-Cell) at my university, growing it into a 30-member operational team. As President, I focus on establishing a culture of building. We organized our inaugural event, secured mentorship MoUs with industry leaders, and transitioned the narrative from academics to pure 0-to-1 execution.
              </p>
              <p>
                Leadership, to me, is simply building the infrastructure—whether code or community—that allows intelligence to scale.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
