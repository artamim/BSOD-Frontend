// app/shorts/[code]/page.js
export default async function PrankRedirect({ params }) {
  const { code } = await params;

  return (
    <div className="bsod">
      <div className="container">
        <h1 className="neg title">
          <span className="bg">A problem has been detected...</span>
        </h1>
        <p>UNEXPECTED_KERNEL_MODE_TRAP</p>
        <p>If this is the first time you've seen this error, restart your computer.</p>
        <p>Technical information:</p>
        <p>*** STOP: 0x0000007F (0x00000008, 0xBA4E7C90, 0xC0000034, 0x00000000)</p>
        <p>Code: {code}</p>
        <p>
          Dumping physical memory to disk: <span id="progress">0</span>% complete
        </p>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.onload = () => {
              const code = "${code}";
              const progressEl = document.getElementById('progress');
              if (!progressEl) return;

              fetch("http://localhost:8000/urls/" + code)
                .then(res => {
                  if (!res.ok) throw new Error("Not found");
                  return res.json();
                })
                .then(data => {
                  let progress = 0;
                  const interval = setInterval(() => {
                    progress += 10;
                    if (progress > 100) progress = 100;
                    progressEl.textContent = progress;

                    if (progress >= 100) {
                      clearInterval(interval);
                      setTimeout(() => {
                        window.location.href = data.url1;
                      }, 1500);
                    }
                  }, 80);
                })
                .catch(() => {
                  document.body.innerHTML += 
                    "<p style='color:red; margin-top:2rem;'>Link not found or expired.</p>";
                });
            };
          `,
        }}
      />
    </div>
  );
}