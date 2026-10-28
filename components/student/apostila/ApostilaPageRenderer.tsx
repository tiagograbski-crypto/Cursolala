import { type ContentBlock } from "@/lib/apostila-content";
import { ImagePlaceholder } from "@/components/student/apostila/ImagePlaceholder";
import { ProtocolAlert } from "@/components/student/apostila/ProtocolAlert";
import { GraphicStage } from "@/components/student/apostila/GraphicStage";
import { OswaldStar } from "@/components/student/apostila/OswaldStar";

interface ApostilaPageRendererProps {
  blocks: ContentBlock[];
}

export function ApostilaPageRenderer({ blocks }: ApostilaPageRendererProps) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-[1.04rem] leading-[1.85] text-ink"
              >
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h3
                key={index}
                className="mt-6 font-serif text-[1.45rem] leading-snug text-ink first:mt-0"
              >
                {block.text}
              </h3>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="relative mt-6 border-l-2 border-sage pl-5"
              >
                <p className="font-serif text-[1.15rem] leading-relaxed text-ink">
                  {block.text}
                </p>
                {block.attribution ? (
                  <footer className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                    — {block.attribution}
                  </footer>
                ) : null}
              </blockquote>
            );

          case "list":
            return (
              <ul key={index} className="mt-2 space-y-2.5">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 text-[1.02rem] leading-[1.75] text-ink"
                  >
                    <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "numbered-list":
            return (
              <ol key={index} className="mt-2 space-y-3">
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 text-[1.02rem] leading-[1.75] text-ink"
                  >
                    <span className="shrink-0 font-serif text-xl leading-none text-sage">
                      {itemIndex + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            );

          case "highlight":
            return (
              <aside
                key={index}
                className="mt-6 rounded-2xl border border-sage/20 bg-sage/8 px-5 py-4"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-sage">
                  {block.title}
                </p>
                <p className="mt-2 text-[1.02rem] leading-[1.75] text-ink">
                  {block.body}
                </p>
              </aside>
            );

          case "image-placeholder":
            return (
              <ImagePlaceholder
                key={index}
                caption={block.caption}
                figure={block.figure}
              />
            );

          case "graphic-stage":
            return (
              <GraphicStage
                key={index}
                caption={block.caption}
                figure={block.figure}
                aspectRatio={block.figure === 6 ? "1/1" : undefined}
              >
                {block.figure === 6 ? (
                  <OswaldStar variant="glass" embedded />
                ) : null}
              </GraphicStage>
            );

          case "protocol-alert":
            return (
              <ProtocolAlert
                key={index}
                title={block.title}
                body={block.body}
                variant={block.variant}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
