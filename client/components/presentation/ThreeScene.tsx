import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene({ images, filter = "", px = 0, py = 0 }: { images: string[]; filter?: string; px?: number; py?: number }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pxRef = useRef(px);
  const pyRef = useRef(py);

  // keep refs in sync without re-creating the whole scene
  useEffect(() => {
    pxRef.current = px;
  }, [px]);
  useEffect(() => {
    pyRef.current = py;
  }, [py]);

  useEffect(() => {
    const el = mountRef.current!;
    if (!el) return;
    // clear previous children (in case component re-mounted)
    el.innerHTML = "";

    const width = el.clientWidth || 800;
    const height = el.clientHeight || 450;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const group = new THREE.Group();
    scene.add(group);

    // create layers from images
    const loader = new THREE.TextureLoader();
    const planes: THREE.Mesh[] = [];
    images.forEach((src, i) => {
      const tex = loader.load(src);
      tex.minFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      const geom = new THREE.PlaneGeometry(16, 9);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.z = -i * 0.6; // depth
      mesh.scale.setScalar(0.96 - i * 0.02);
      group.add(mesh);
      planes.push(mesh);
    });

    // subtle point light for glow
    const light = new THREE.PointLight(0xffffff, 0.35);
    light.position.set(0, 0, 5);
    scene.add(light);

    let resizeObserver: ResizeObserver | null = null;

    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(el);

    let t = 0;
    const animate = () => {
      t += 0.01;
      // read current parallax refs
      const curPx = pxRef.current || 0;
      const curPy = pyRef.current || 0;

      // move group slowly and apply parallax from px/py
      group.rotation.y = curPx * 0.08;
      group.rotation.x = -curPy * 0.06;
      group.position.x = curPx * 0.6;
      group.position.y = -curPy * 0.4;

      // subtle bob for each layer
      group.children.forEach((c, idx) => {
        c.position.x = Math.sin(t + idx) * 0.02 * (idx + 1);
        c.position.y = Math.cos(t + idx * 1.3) * 0.02 * (idx + 1);
      });

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      resizeObserver?.disconnect();
      // dispose textures/materials
      planes.forEach((p) => {
        if (p.material) {
          const m = p.material as THREE.Material & { map?: THREE.Texture };
          if (m.map) {
            m.map.dispose();
          }
          m.dispose();
        }
        if (p.geometry) p.geometry.dispose();
      });
      renderer.dispose();
      // remove canvas
      if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [images.join("||")]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" style={{ filter }} />;
}
