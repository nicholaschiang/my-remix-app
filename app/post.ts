import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';

export interface Post {
  slug: string;
  title: string;
}

const postsPath = path.join(__dirname, '..', 'posts');

interface PostAttributes {
  title: string;
}

function isPostAttributes(attr: unknown): attr is PostAttributes {
  return typeof (attr as { title: unknown })?.title === 'string';
}

export async function getPosts(): Promise<Post[]> {
  const dir = await fs.readdir(postsPath);
  return Promise.all(dir.map(async (filename) => {
    const file = await fs.readFile(path.join(postsPath, filename));
    const { attributes: attr } = parseFrontMatter(file.toString());
    invariant(isPostAttributes(attr), `${filename} has bad meta data.`);
    return { slug: filename.replace(/\.md$/, ''), title: attr.title };
  }));
}

export async function getPost(slug: string): Promise<Post> {
  const filepath = path.join(postsPath, `${slug}.md`);
  const file = await fs.readFile(filepath);
  const { attributes: attr } = parseFrontMatter(file.toString());
  invariant(isPostAttributes(attr), `Post ${filepath} is missing attributes.`);
  return { slug, title: attr.title };
}
