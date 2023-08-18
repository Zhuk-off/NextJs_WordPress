// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getAllPagesSlug, getAllPostsWithSlug } from '../../lib/api';
import { getProductsData } from '../../utils/products';
import { IProduct } from '../../interfaces/products.interface';
import { filterSlugPages } from '../../lib/helpers';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const allPages = await getAllPagesSlug();
  const allProducts: IProduct[] = await getProductsData();
  const allPosts = await getAllPostsWithSlug();

  const fields = [];

  allProducts.map((product) => {
    fields.push({
      loc: process.env.NEXT_PUBLIC_SITE_URL + `/product/${product.slug}` + '/',
      lastmod: new Date(Date.parse(product.date_modified)).toISOString(),
      changefreq: 'daily', //'weekly','yearly',
      priority: 0.7,
    });
  });

  allPosts.edges.map(({ node }) => {
    fields.push({
      loc: process.env.NEXT_PUBLIC_SITE_URL + `/posts/${node.slug}` + '/',
      lastmod: new Date(Date.parse(node.modified)).toISOString(),
      changefreq: 'daily', //'weekly','yearly',
      priority: 0.7,
    });
  });

  allPages.edges.map(({ node }) => {
    const slug = filterSlugPages('/' + node.slug);
    if (slug) {
      fields.push({
        loc: process.env.NEXT_PUBLIC_SITE_URL + `/${node.slug}` + '/',
        lastmod: new Date(Date.parse(node.modified)).toISOString(),
        changefreq: 'daily', //'weekly','yearly',
        priority: 0.7,
      });
    }
  });

  return getServerSideSitemapLegacy(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
