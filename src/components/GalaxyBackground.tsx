import { useEffect, useState } from 'react';

export default function GalaxyBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="galaxy-layer" aria-hidden="true">
      <div className="absolute inset-0 bg-[#04060f]" />

      <div className="nebula nebula-a" />
      <div className="nebula nebula-b" />
      <div className="nebula nebula-c" />

      {mounted && (
        <>
          <div className="stars stars--xl absolute inset-0" />
          <div className="stars stars--lg absolute inset-0" />
          <div className="stars absolute inset-0" />

          <div className="constellation" />

          <div className="shooting-stars" aria-hidden>
            <div className="shooting-star s1" />
            <div className="shooting-star s2" />
            <div className="shooting-star s3" />
          </div>
        </>
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(4,6,15,0.5) 80%, rgba(4,6,15,0.85) 100%)',
        }}
      />
    </div>
  );
}
