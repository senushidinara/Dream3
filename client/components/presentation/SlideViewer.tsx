// add below imports

function VideoGallery({ urls }: { urls: string[] }) {
  const [i, setI] = useState(0);
  if (!urls || urls.length === 0) return null;
  return (
    <div>
      <video controls src={urls[i]} className="w-full rounded-md shadow-lg h-64 object-cover" />
      <div className="mt-2 flex gap-2">
        {urls.map((u, idx) => (
          <button key={u} onClick={() => setI(idx)} className={`px-2 py-1 rounded ${idx === i ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            Clip {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
