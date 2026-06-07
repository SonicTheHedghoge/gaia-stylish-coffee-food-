import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { animate, motion, AnimatePresence } from 'motion/react';

interface ThreeIntroProps {
  onComplete: () => void;
}

export function ThreeIntro({ onComplete }: ThreeIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);
  const ctxRef = useRef<any>(null);
  const initializedRef = useRef(false);

  // Independent fallback — guarantees "Enter" button appears regardless of Three.js/CDN state
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    // Guard against double-mount (StrictMode) or re-renders
    if (initializedRef.current) return;
    initializedRef.current = true;

    let animationFrameId: number;

    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.className = 'w-full h-full outline-none';
    containerRef.current.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#111111');
    scene.fog = new THREE.FogExp2('#111111', 0.03);

    const isMobile = window.innerWidth < 768;
    const sizes = { width: window.innerWidth, height: window.innerHeight };

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 35 : 25,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.minDistance = 4;
    controls.maxDistance = 35;
    controls.minPolarAngle = Math.PI / 8;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(sizes.width, sizes.height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const composer = new EffectComposer(renderer);
    composer.setSize(sizes.width, sizes.height);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(sizes.width, sizes.height),
      0.35, 0.6, 0.85
    );
    composer.addPass(bloomPass);

    const filmPass = new FilmPass(0.2, false);
    composer.addPass(filmPass);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 4);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x9bb6ff, 0.8);
    fillLight.position.set(-6, 3, -2);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.4);
    rimLight.position.set(-2, 4, -6);
    scene.add(rimLight);

    const baseUrl = 'https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room12/cecbd1c77333b3c9ee23bb1eb41dee395e14ca3e/dist';

    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    let itemsLoaded = 0;
    let itemsErrored = 0;
    const totalItems = 5;

    const checkDone = () => {
      const progress = Math.round(((itemsLoaded + itemsErrored) / totalItems) * 100);
      setLoadingProgress(progress);
      if (itemsLoaded + itemsErrored >= totalItems) {
        setIsLoaded(true);
      }
    };

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    const loadTex = (url: string) =>
      textureLoader.load(
        url,
        () => { itemsLoaded++; checkDone(); },
        undefined,
        () => { itemsErrored++; checkDone(); }
      );

    const bakedTexture = loadTex(`${baseUrl}/baked.jpg`);
    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;
    const normalTexture = loadTex(`${baseUrl}/normal.jpg`);
    normalTexture.flipY = false;
    const occlusionTexture = loadTex(`${baseUrl}/occlusion.jpg`);
    occlusionTexture.flipY = false;

    const bakedMaterial = new THREE.MeshStandardMaterial({
      map: bakedTexture,
      normalMap: normalTexture,
      aoMap: occlusionTexture,
      side: THREE.DoubleSide,
      metalness: 0.85,
      roughness: 0.5,
    });
    const metalicMaterial = new THREE.MeshStandardMaterial({
      map: bakedTexture,
      side: THREE.DoubleSide,
      roughness: 0,
    });

    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      `${baseUrl}/model.glb`,
      (gltf) => {
        gltf.scene.traverse((child: any) => {
          if (child.isMesh) child.material = metalicMaterial;
        });
        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);
        gltf.scene.position.y += (box.max.y - box.min.y) / 2;
        sceneGroup.add(gltf.scene);
        itemsLoaded++;
        checkDone();
      },
      undefined,
      () => { itemsErrored++; checkDone(); }
    );

    gltfLoader.load(
      `${baseUrl}/metalic.glb`,
      (gltf) => {
        gltf.scene.traverse((child: any) => {
          if (child.isMesh) {
            child.material = bakedMaterial;
            if (child.geometry?.attributes.uv) {
              child.geometry.setAttribute(
                'uv2',
                new THREE.BufferAttribute(child.geometry.attributes.uv.array, 2)
              );
            }
          }
        });
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);
        gltf.scene.position.y += (box.max.y - box.min.y) / 2;
        sceneGroup.add(gltf.scene);
        itemsLoaded++;
        checkDone();
      },
      undefined,
      () => { itemsErrored++; checkDone(); }
    );

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height, false);
      composer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener('resize', handleResize);

    const tick = () => {
      controls.update();
      if (!isAnimatingRef.current) {
        sceneGroup.rotation.y += 0.0004;
        camera.position.y += Math.sin(Date.now() * 0.0003) * 0.0015;
      }
      composer.render();
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    ctxRef.current = { camera, controls };

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.traverse((obj: any) => {
        obj.geometry?.dispose?.();
        if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose?.());
        else obj.material?.dispose?.();
      });
      scene.clear();
      renderer.dispose();
      composer.dispose();
      ctxRef.current = null;
    };
  }, []);

  const handleEnter = () => {
    setIsAnimating(true);
    isAnimatingRef.current = true;
    const ctx = ctxRef.current;
    if (!ctx) {
      onComplete();
      return;
    }

    const { camera, controls } = ctx;
    const targetPos = { x: 0, y: 2, z: 5 };
    const cinematicEase = [0.25, 1, 0.3, 1] as const;

    animate(camera.position.x, targetPos.x, { duration: 2.4, ease: cinematicEase, onUpdate: (v) => (camera.position.x = v) });
    animate(camera.position.y, targetPos.y, { duration: 2.4, ease: cinematicEase, onUpdate: (v) => (camera.position.y = v) });
    animate(camera.position.z, targetPos.z, { duration: 2.4, ease: cinematicEase, onUpdate: (v) => (camera.position.z = v) });
    animate(camera.fov, 35, {
      duration: 2.4,
      ease: 'easeInOut',
      onUpdate: (v) => { camera.fov = v; camera.updateProjectionMatrix(); }
    });

    setTimeout(() => {
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.enableRotate = true;
      onComplete();
    }, 2400);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-[#111111]"
    >
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Cinematic fade-in over canvas */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[#111111] z-20 pointer-events-none"
      />

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#111111] z-30 pointer-events-none"
          >
            <div className="text-gold uppercase tracking-[0.5em] text-sm md:text-base font-medium">
              Loading
            </div>
            <div className="w-48 h-[2px] bg-white/10 mt-6 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold rounded-full"
                animate={{ width: `${Math.max(5, loadingProgress)}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <div className="text-white/50 text-[10px] mt-4 uppercase tracking-[0.2em] font-mono">
              {loadingProgress}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoaded && !isAnimating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
          >
            <button
              onClick={handleEnter}
              className="px-8 md:px-12 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white uppercase tracking-[0.3em] text-xs font-semibold rounded-full transition-all flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95"
            >
              Enter Experience
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
