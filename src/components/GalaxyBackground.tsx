import { useEffect, useState } from 'react';

export default function GalaxyBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="galaxy-layer" aria-hidden="true">
      {/* Deep space base */}
      <div className="absolute inset-0 bg-[#04060f]" />

      {/* Nebula clouds */}
      <div className="nebula nebula-a" />
      <div className="nebula nebula-b" />
      <div className="nebula nebula-c" />

      {/* Star fields (3 layers for depth) */}
      {mounted && (
        <>
          <div className="stars stars--xl absolute inset-0" style={{ animationDelay: '0s' }} />
          <div className="stars stars--lg absolute inset-0" style={{ animationDelay: '2s' }} />
          <div className="stars absolute inset-0" style={{ animationDelay: '4s' }} />

          {/* Constellation grid */}
          <div className="constellation" />

          {/* Shooting stars */}
          <div className="shooting-star s1" />
          <div className="shooting-star s2" />
          <div className="shooting-star s3" />
        </>
      )}

      {/* Vignette for readability */}
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
