import { Link } from 'remix';

export default function AdminIndex(): JSX.Element {
  return (
    <p>
      <Link to='new'>Create a New Post</Link>
    </p>
  );
}
