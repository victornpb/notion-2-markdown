import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv-safe';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from '../build/notion-to-md.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const page_id = process.env.NOTION_PAGE;

const notion = new Client({ auth: process.env.NOTION_SECRET });
const notion2md = new NotionToMarkdown({ notionClient: notion });

const page = await notion.pages.retrieve({ page_id });
const title = page?.properties?.title?.title[0]?.plain_text || 'Untitled';

const mdBlocks = await notion2md.pageToMarkdown(page_id);
const markdown = notion2md.toMarkdownString(mdBlocks);

fs.mkdirSync(path.join(__dirname, './output'), { recursive: true });
fs.writeFileSync(path.join(__dirname, './output', `${title.replace(/[^a-z0-9]/gi, '_')}.md`), markdown);
