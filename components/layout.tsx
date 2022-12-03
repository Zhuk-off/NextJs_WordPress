import { CartCountProvider } from '../context/CartCounter';
import Alert from './alert';
import Footer from './footer';
import Header from './header';
import Meta from './meta';
import Container from './container';

export default function Layout({ preview, children }) {
  return (
    <CartCountProvider>
      <Meta />
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
