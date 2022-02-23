import { Link, useLoaderData } from 'remix';

import { getPosts } from '~/post';
import type { Post } from '~/post';

export async function loader(): Promise<Post[]> {
  return getPosts();
}

export default function Posts(): JSX.Element {
  const posts = useLoaderData<Post[]>();
  console.log(posts);
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
