import { CartCountProvider } from '../context/CartCounter';
import Alert from './alert';
import Footer from './footer';
import Header from './header';
import Meta from './meta';
import Container from './container';
import { ISeoRes } from '../interfaces/seo.interfaces';
import { IPageResponse } from '../interfaces/pages.interfaces';
import Seo from './seo/AddSeo';
import { IProduct } from '../interfaces/products.interface';

interface ILayout {
  preview?: boolean;
  page?: IPageResponse;
  product?: IProduct;
  children: any;
}

export default function Layout({
  preview = false,
  page,
  product,
  children,
}: ILayout) {
  let schema: string;
  let uri: string;

  // Prepare a scheme for product and set the scheme, uri for products or for pages
  if (product?.yoast_head_json?.schema) {
    const schemaProductJson = product?.yoast_head_json?.schema;
    schema = JSON.stringify(schemaProductJson).replace(`"`, `\"`);
    uri = '/' + product?.slug + '/';
  } else {
    schema = page?.seo?.schemaDetails ? page?.seo?.schemaDetails : null;
    uri = page?.uri;
  }

  // console.log(schema);

  return (
    <CartCountProvider>
      {/* важно стрнаницы что отдельные они без метатегов блог, товары, корзина, оформление */}
      {page?.seo || product?.yoast_head_json ? (
        <Seo seo={page?.seo || product?.yoast_head_json} uri={uri} />
      ) : null}

      {schema ? <Meta schemaDetails={schema} /> : null}

      <div className="min-h-screen">
        <Alert preview={preview} />
        <Container>
          <Header />
        </Container>

        <main>{children}</main>
      </div>
      <Footer />
    </CartCountProvider>
  );
}
