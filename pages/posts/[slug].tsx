import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import MoreStories from '../../components/more-stories';
import PostHeader from '../../components/post-header';
import SectionSeparator from '../../components/section-separator';
import Layout from '../../components/layout';
import PostTitle from '../../components/post-title';
import Tags from '../../components/tags';
import {
  getAllPostsWithSlug,
  getPostAndMorePosts,
  getFooterHeaderRestAPIData,
} from '../../lib/api';
import { CMS_NAME } from '../../lib/constants';
import { HeaderFooterContext } from '../../context/headerFooterContext';

export default function Post({ post, posts, preview, dataRest }) {
  if (!dataRest) return null;
  const router = useRouter();
  const morePosts = posts?.edges;
  const { data } = dataRest;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <HeaderFooterContext.Provider value={{ data }}>
      <Layout preview={preview}>
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <Head>
                  <title>
                    {post.title} | Next.js Blog Example with {CMS_NAME}
                  </title>
                  <meta
                    property="og:image"
                    content={post.featuredImage?.node.sourceUrl}
                  />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.featuredImage}
                  date={post.date}
                  author={post.author}
                  categories={post.categories}
                />
                <PostBody content={post.content} />
                <footer>
                  {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                </footer>
              </article>

              <SectionSeparator />
              {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </>
          )}
        </Container>
      </Layout>
    </HeaderFooterContext.Provider>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);
  const dataRest = await getFooterHeaderRestAPIData();

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
      dataRest,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true,
  };
};
