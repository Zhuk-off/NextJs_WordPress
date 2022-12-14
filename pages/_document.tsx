import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

          `,
        }}
      />
      <body>
        <Main />
        <NextScript />

        {/* <!-- Yandex.Metrika counter --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${process.env.NEXT_PUBLIC_YM_ID}, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true
              });
            `,
          }}
        ></script>
        <noscript dangerouslySetInnerHTML={{__html:`
          <div>
            <img
              src="https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YM_ID}"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        `}}>
        </noscript>
        {/* <!-- /Yandex.Metrika counter --> */}
      </body>
    </Html>
  );
}
