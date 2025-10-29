// Convertisseur minimal de markdown en HTML pour les descriptions d'offres
// Supports: titres (##), texte en gras (**text**), listes non ordonnées (- item), paragraphes

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function markdownToHtml(md: string): string {
  const lines = md.split(/\r?\n/);
  const htmlParts: string[] = [];
  let inList = false;
  const flushList = () => {
    if (inList) {
      htmlParts.push("</ul>");
      inList = false;
    }
  };

  for (let raw of lines) {
    let line = raw.trimEnd();
    // Sous-Titre
    const h2Match = /^##\s+(.+)$/.exec(line);
    if (h2Match) {
      flushList();
      const content = h2Match[1];
      htmlParts.push(`<h2>${inline(content)}</h2>`);
      continue;
    }

    // Élément de liste
    const liMatch = /^-\s+(.+)$/.exec(line);
    if (liMatch) {
      if (!inList) {
        htmlParts.push("<ul>");
        inList = true;
      }
      htmlParts.push(`<li>${inline(liMatch[1])}</li>`);
      continue;
    }

    // Ligne vide
    if (line.trim() === "") {
      flushList();
      htmlParts.push("");
      continue;
    }

    // Paragraphe
    flushList();
    htmlParts.push(`<p>${inline(line)}</p>`);
  }
  flushList();
  return htmlParts.join("\n");
}

function inline(text: string): string {
  // Texte en gras **text** → <strong>
  let out = escapeHtml(text);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return out;
}


