import axios, { AxiosResponse } from 'axios';
import { ICountriesData } from '../interfaces/countries.interface';
import {
  FOOTER_HEADER_ENDPOINT,
  WOOCOMMERCE_COUNTRIES_ENDPOINT,
} from './constants';
import { modifyCountries, modifyUrlBackendToFrontend } from './helpers';

const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' };
  
  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }
  
  // console.log('headers', headers);
  // console.log('query', query);
  // console.log('variables', variables);
  // console.log('API_URL', API_URL);
  // WPGraphQL Plugin, Add WPGraphQL SEO Plugin, must be enabled 
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  });
// console.log('res', res);

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  );
  return data.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
            modified
          }
        }
      }
    }
  `);
  return data?.posts;
}

export async function getAllPagesSlug() {
  const data = await fetchAPI(`
  {
    pages {
      edges {
        node {
          slug
          modified
        }
      }
    }
  }
  `);
  return data?.pages;
}



export async function getPageByUri(uri) {
  const data = await fetchAPI(
    `
  query PageByUri($id: ID = "/", $idType: PageIdType = URI) {
    page(id: $id, idType: $idType) {
      id
      title
      slug
      date
      modified
      featuredImage {
        node {
          sourceUrl
        }
      }
      uri
      content
      seo{
        ...SeoFragment
      }
    }
  }
  fragment SeoFragment on PostTypeSEO {
    breadcrumbs {
      text
      url
    }
    title
    metaDesc
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphAuthor
    opengraphDescription
    opengraphTitle
    schemaDetails
    opengraphImage {
      sourceUrl
      altText
      title
    }
    opengraphSiteName
    opengraphPublishedTime
    opengraphModifiedTime
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
      title
    }
    opengraphType
    opengraphUrl
    readingTime
    opengraphPublisher
    metaKeywords
    canonical
    cornerstone
    focuskw
}
  `,
    {
      variables: {
        id: uri,
        idType: 'URI',
      },
    }
  );
  return data?.page;
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            modified
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === 'draft';
  const isRevision = isSamePost && postPreview?.status === 'publish';
  const data = await fetchAPI(
    `
    fragment SeoFragment on PostTypeSEO {
      breadcrumbs {
        text
        url
      }
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
      opengraphAuthor
      opengraphDescription
      opengraphTitle
      schemaDetails
      opengraphImage {
        sourceUrl
        altText
        title
      }
      opengraphSiteName
      opengraphPublishedTime
      opengraphModifiedTime
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
        title
      }
      opengraphType
      opengraphUrl
      readingTime
      opengraphPublisher
      metaKeywords
      canonical
      cornerstone
      focuskw
    }


    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      modified
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        uri
        seo {
          ...SeoFragment
        }
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              uri
              seo {
                ...SeoFragment
              }
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

// Get footer and header data from the plugin Headless CMS (Rest  API)
export async function getFooterHeaderRestAPIData() {
  const { data } = await axios.get(FOOTER_HEADER_ENDPOINT);
  // console.log(
  //   'FOOTER_HEADER_ENDPOINT',FOOTER_HEADER_ENDPOINT , data


  // );
  const dataRestModify = modifyUrlBackendToFrontend(data);
  return dataRestModify;
}

// Get countries
export async function getCountriesAPIData() {
  const { data: countries }: AxiosResponse<ICountriesData, any> =
    await axios.get(WOOCOMMERCE_COUNTRIES_ENDPOINT);
  modifyCountries(countries);

  return countries;
}
