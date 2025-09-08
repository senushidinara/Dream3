import React from "react";

const PDF_URL = "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F53337bd128644c329e1a2b0204008159?alt=media&token=ad4762bf-069f-4ba4-b630-53486a9db4c5&apiKey=dc3782de61224ee6afee73d63ac0f50c";
const VIDEO_URLS = [
  "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Facc57c7e7a8f4d5abd2b6797d824b465?alt=media&token=9091f04d-5b19-4856-bde4-b5774e7f66ef&apiKey=dc3782de61224ee6afee73d63ac0f50c",
  "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F4a0c33ee597444a3ab308a7083d48420?alt=media&token=01a78739-f034-4329-82d3-3ea4eb6dd562&apiKey=dc3782de61224ee6afee73d63ac0f50c",
  "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fcd81d4d2cc0a49a599574135b518ef8f?alt=media&token=644ace2c-019a-473b-bde3-4f6de8efa37c&apiKey=dc3782de61224ee6afee73d63ac0f50c",
  "https://cdn.builder.io/o/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fd454cb793cad4baa8074cb42ff1389cf?alt=media&token=6b430cff-50b4-4fcd-9ebc-74fe80325831&apiKey=dc3782de61224ee6afee73d63ac0f50c",
];

export default function Presentation() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-background to-background/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">Presentation: The Mind Palace Quest</h1>
        <p className="text-muted-foreground mt-2">View the PDF presentation below. Videos and downloads are included.</p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden border border-border/50" style={{ height: 720 }}>
              <iframe
                title="Mind Palace Presentation"
                src={PDF_URL}
                className="w-full h-full"
                frameBorder="0"
              />
            </div>
            <div className="mt-3 flex gap-3 flex-wrap">
              <a href={PDF_URL} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-primary/20 text-primary">Open original PDF</a>
              <a href={PDF_URL} download className="px-3 py-2 rounded-md bg-muted">Download PDF</a>
            </div>
          </div>

          <aside className="rounded-lg border border-border/50 p-4 bg-card/60">
            <h3 className="font-semibold">Videos</h3>
            <p className="text-sm text-muted-foreground">Playable previews of the presentation (MP4).</p>
            <div className="mt-3 space-y-3">
              {VIDEO_URLS.map((u, i) => (
                <div key={i} className="rounded-md overflow-hidden border">
                  <video controls src={u} className="w-full h-40 bg-black object-cover" />
                  <div className="p-2 flex items-center justify-between">
                    <span className="text-sm">Clip {i + 1}</span>
                    <a href={u} target="_blank" rel="noreferrer" className="text-xs text-primary underline">Open</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium">Notes</h4>
              <p className="text-xs text-muted-foreground mt-1">If the embedded PDF doesn't render in your browser, use the "Open original PDF" button to view or download.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
