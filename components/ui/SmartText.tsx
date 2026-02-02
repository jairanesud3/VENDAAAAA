import React from 'react';

interface SmartTextProps {
  content: string;
}

export const SmartText: React.FC<SmartTextProps> = ({ content }) => {
  if (!content) return null;

  // Split by double newlines to form paragraphs/sections
  const sections = content.split('\n');

  return (
    <div className="space-y-3 text-slate-300 text-sm leading-relaxed font-sans break-words overflow-hidden w-full">
      {sections.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <br key={index} className="h-2 block" />;

        // Headers (### or ##)
        if (trimmed.startsWith('#')) {
          const title = trimmed.replace(/^#+\s*/, '');
          return (
            <h3 key={index} className="text-white font-bold text-lg mt-4 mb-2 flex items-center gap-2 break-words">
              <span className="w-1 h-6 bg-primary rounded-full inline-block shrink-0"></span>
              {title.replace(/\*\*/g, '')}
            </h3>
          );
        }

        // List Items (- or *)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\./.test(trimmed)) {
            const listContent = trimmed.replace(/^[-*]\s*|^\d+\.\s*/, '');
            // Process Bold inside list
            const parts = listContent.split(/(\*\*.*?\*\*)/g);
            return (
                <div key={index} className="flex gap-3 pl-2">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <p className="break-words w-full">
                        {parts.map((part, i) => 
                            part.startsWith('**') && part.endsWith('**') ? (
                                <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                            ) : (
                                part
                            )
                        )}
                    </p>
                </div>
            );
        }

        // Regular Paragraphs with Bold parsing
        const parts = trimmed.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className="break-words">
            {parts.map((part, i) => 
                part.startsWith('**') && part.endsWith('**') ? (
                    <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                ) : (
                    part
                )
            )}
          </p>
        );
      })}
    </div>
  );
};