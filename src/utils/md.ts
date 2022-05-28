import { CalloutIcon } from '../types';
import asciitable from 'asciitable.js';
import opengraph from './opengraph';

export const inlineCode = (text: string) => {
  return `\`${text}\``;
};

export const bold = (text: string) => {
  return `**${text}**`;
};

export const italic = (text: string) => {
  return `_${text}_`;
};

export const strikethrough = (text: string) => {
  return `~~${text}~~`;
};

export const underline = (text: string) => {
  return `<u>${text}</u>`;
};

export const link = (text: string, href: string) => {
  return `[${text}](${href})`;
};

export const codeBlock = (text: string, language?: string) => {
  return `\`\`\`${language}
${text}
\`\`\``;
};

export const heading1 = (text: string) => {
  return `# ${text}`;
};

export const heading2 = (text: string) => {
  return `## ${text}`;
};

export const heading3 = (text: string) => {
  return `### ${text}`;
};

export const quote = (text: string) => {
  // the replace is done to handle multiple lines
  return `> ${text.replace(/\n/g, "  \n>")}`;
};

export const callout = (text: string, icon?: CalloutIcon) => {
  let emoji: string | undefined;
  if (icon?.type === 'emoji') {
    emoji = icon.emoji;
  }

  // the replace is done to handle multiple lines
  return `> ${emoji ? emoji + ' ' : ''}${text.replace(/\n/g, "  \n>")}`;
};

export const bullet = (text: string) => {
  return `- ${text}`;
};

export const todo = (text: string, checked: boolean) => {
  return checked ? `- [x] ${text}` : `- [ ] ${text}`;
};

export const image = (alt: string, href: string) => {
  if (/^https?:\/\//.test(alt)) {
    // if alt is an external url, turn it into a "image link"
    return link(`![](${href})`, href);
  }
  return `![${alt}](${href})`;
};

export const addTabSpace = (text: string, n = 0) => {
  const tab = "	";
  for (let i = 0; i < n; i++) {
    if (text.includes("\n")) {
      const multiLineText = text.split(/(?<=\n)/).join(tab);
      text = tab + multiLineText;
    } else text = tab + text;
  }
  return text;
};

export const divider = () => {
  return "---";
};

export const table = (cells: string[][]) => {
  const matrix = [cells[0], null, ...cells.slice(1)];
  return asciitable(matrix);
};


export const preview = async (url: string) => {
  const data = await opengraph(url);
  const og = data.result;

  if (og) {
    const icon = og.ogImage?.url ? `![favicon](${og.favicon}) ` : '';
    const preview = og.ogImage?.url ? `![image](${og.ogImage.url}) ` : '';
    const title = og.ogSiteName || og.ogTitle;
    const description = og.ogDescription || '';
  
    const lines = [
      `[${icon}**${title}**](${url})`,
      description.replace(/\n/g, "  "),
      url
    ];

    return lines.filter(Boolean).map(line => `> ${line}`).join('  \n');
  }
  else {
    return `> [${url}](${url})`;
  }
}

export const bookmark = async (url: string) => {
  const data = await opengraph(url);
  const og = data.result;

  if (og) {
    const icon = og.ogImage?.url ? `![favicon](${og.favicon}) ` : '';
    const preview = og.ogImage?.url ? `![image](${og.ogImage.url}) ` : '';
    const title = og.ogTitle;
    const description = og.ogDescription || '';
  
    const lines = [
      `[${preview}**${title}**](${url})`,
      description.replace(/\n/g, "  "),
      url
    ];

    return lines.filter(Boolean).map(line => `> ${line}`).join('  \n');
  }
  else {
    return `> [${url}](${url})`;
  }
}