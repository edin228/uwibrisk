import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Pipedrive LeadBooster script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.pipedriveLeadboosterConfig = {
                  base: 'leadbooster-chat.pipedrive.com',
                  companyId: 1802642,
                  playbookUuid: '84e3c8fe-6b04-444e-bfc0-f9e1b80cf5fc',
                  version: 2
                };
                (function () {
                  var w = window;
                  if (w.LeadBooster) {
                    console.warn('LeadBooster already exists');
                  } else {
                    w.LeadBooster = {
                      q: [],
                      on: function (n, h) {
                        this.q.push({ t: 'o', n: n, h: h });
                      },
                      trigger: function (n) {
                        this.q.push({ t: 't', n: n });
                      },
                    };
                  }
                })();
              `,
            }}
          />
          <script src="https://leadbooster-chat.pipedrive.com/assets/loader.js" async />          
          <script src="https://cdn.userway.org/widget.js" data-account="YFNZVyXaJ6" async />
          <script src="https://player.vimeo.com/api/player.js" async />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;