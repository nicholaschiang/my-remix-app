import { useActionData, useLoaderData, redirect, Form } from 'remix';
import type { ActionFunction, LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';

import { getPost, putPost } from '~/post';
import type { Post } from '~/post';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(typeof params?.slug === 'string');
  return getPost(params.slug);
};

interface PostError {
  title?: true;
  slug?: true;
  markdown?: true;
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const title = data.get('title');
  const slug = data.get('slug');
  const markdown = data.get('markdown');
  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;
  if (Object.keys(errors).length) return errors;
  invariant(typeof title === 'string');
  invariant(typeof slug === 'string');
  invariant(typeof markdown === 'string');
  await putPost({ title, slug, markdown });
  return redirect('/admin');
};

export default function EditPost() {
  const post = useLoaderData<Post>();
  const errors = useActionData<PostError | undefined>();
  return (
    <Form method='post'>
      <p>
        <label>
          Post Title: {errors?.title ? <em>Title is required</em> : null}
          <input type='text' name='title' defaultValue={post.title} />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug ? <em>Slug is required</em> : null}
          <input type='text' name='slug' defaultValue={post.slug} />
        </label>
      </p>
      <p>
        <label htmlFor='markdown'>Markdown:</label>{' '}
        {errors?.markdown ? <em>Markdown is required</em> : null}
        <br />
        <textarea id='markdown' rows={20} name='markdown' defaultValue={post.markdown} />
      </p>
      <p>
        <button type='submit'>Edit Post</button>
      </p>
    </Form>
  );
}
