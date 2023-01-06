import { CartCountProvider } from '../context/CartCounter';
import Alert from './alert';
import Footer from './footer';
import Header from './header';
import Meta from './meta';
import Container from './container';
import { ISeoRes } from '../interfaces/seo.interfaces';
import { IPageResponse } from '../interfaces/pages.interfaces';
import Seo from './seo';

interface ILayout {
  preview?: boolean;
  page?: IPageResponse;
  children: any;
}

export default function Layout({ preview = false, page, children }:ILayout) {

  // if (!page) {
  //   return null
  // }

  return (
    <CartCountProvider>
      <Seo seo={page?.seo} uri={page?.uri}/>
      <Meta page={page}/>

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
