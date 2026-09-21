import { useId, useRef, useState } from "react";
import { FileCheck2, FileUp, Image, UploadCloud, X } from "lucide-react";

const initialFiles = [
  { id: "hero-concept", name: "hero-concept.png", size: "2.4 MB", icon: Image },
  { id: "brand-guidelines", name: "brand-guidelines.pdf", size: "6.8 MB", icon: FileCheck2 },
];

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUploadDropzone() {
  const [files, setFiles] = useState(initialFiles);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const instructionsId = useId();

  function addFiles(fileList) {
    const added = Array.from(fileList).map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      size: formatSize(file.size),
      icon: file.type.startsWith("image/") ? Image : FileCheck2,
    }));
    if (added.length > 0) setFiles((current) => [...added, ...current]);
  }

  function removeFile(id) {
    setFiles((current) => current.filter((file) => file.id !== id));
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  }

  return (
    <section className="w-full max-w-xl rounded-[28px] border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface,#0d0d10)] p-5 shadow-[0_18px_60px_rgba(0,0,0,.24)] sm:p-6">
      <div>
        <p className="text-xs text-[var(--text-muted,#64748b)]">Assets</p>
        <h3 className="mt-1 text-xl font-semibold text-white">Upload project files</h3>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        aria-describedby={instructionsId}
        className={
          "mt-5 flex w-full flex-col items-center rounded-[22px] border border-dashed px-6 py-9 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 " +
          (isDragging
            ? "border-emerald-300/60 bg-emerald-300/[0.08]"
            : "border-emerald-300/25 bg-emerald-300/[0.035] hover:bg-emerald-300/[0.06]")
        }
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-300">
          <UploadCloud className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="mt-4 text-sm font-semibold text-[var(--text-primary,#e2e8f0)]">Drop files here or browse</span>
        <span id={instructionsId} className="mt-1 text-xs text-[var(--text-subtle,#475569)]">
          PNG, JPG, SVG, PDF up to 10MB
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        aria-label="Choose files to upload"
        accept=".png,.jpg,.jpeg,.svg,.pdf"
        className="sr-only"
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <p role="status" aria-live="polite" className="sr-only">
        {files.length} file{files.length === 1 ? "" : "s"} attached
      </p>

      <div className="mt-4 space-y-2">
        {files.map((file) => {
          const Icon = file.icon;
          return (
            <div key={file.id} className="flex items-center gap-3 rounded-2xl border border-[var(--border,rgba(255,255,255,.1))] bg-[var(--surface-inset,rgba(255,255,255,.025))] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-[var(--text-tertiary,#94a3b8)]">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[var(--text-secondary,#cbd5e1)]">{file.name}</p>
                <p className="mt-0.5 text-[10px] text-[var(--text-faint,#334155)]">{file.size} • uploaded</p>
              </div>
              <FileUp className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                aria-label={`Remove ${file.name}`}
                className="rounded-md text-[var(--text-faint,#334155)] transition hover:text-[var(--text-tertiary,#94a3b8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
