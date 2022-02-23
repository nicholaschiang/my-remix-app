import { Outlet, Link, useLoaderData } from 'remix';

import { getPosts } from '~/post';
import type { Post } from '~/post';
import styles from '~/styles/admin.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export const loader = async () => {
  return getPosts();
};

export default function Admin(): JSX.Element {
  const posts = useLoaderData<Post[]>();
  return (
    <div className='admin'>
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={post.slug}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
