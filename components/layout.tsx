import { CartCountProvider } from '../context/CartCounter';
import Alert from './alert';
import Footer from './footer';
import Meta from './meta';

export default function Layout({ preview, children }) {
  return (
    <CartCountProvider>
      <Meta />
      {/* <Header/> */}
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </CartCountProvider>
  );
}
