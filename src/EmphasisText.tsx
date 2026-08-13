import React from "react";

/**
 * Resalta palabras marcadas con *asteriscos* en un color/peso distinto.
 * Ej: "Cada cosa en *su lugar*" -> "su lugar" sale en el color de acento.
 */
export const renderEmphasis = (
  text: string,
  accentColor: string,
): React.ReactNode => {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <span
          key={i}
          style={{ color: accentColor, fontWeight: 700 }}
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};
