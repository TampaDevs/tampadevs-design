'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import clsx from 'clsx';

export interface Logo3dProps {
  /** URL to the OBJ file */
  objUrl?: string;
  /** URL to the MTL file (optional) */
  mtlUrl?: string;
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Enable auto-rotation */
  autoRotate?: boolean;
  /** Auto-rotation speed */
  rotationSpeed?: number;
  /** Background color (use 'transparent' for transparent) */
  backgroundColor?: string;
  /** Enable mouse wheel zoom */
  enableZoom?: boolean;
  /** Enable click-and-drag rotation */
  enablePan?: boolean;
  /** Additional CSS class */
  className?: string;
}

// Three.js types - using any since Three.js is an optional peer dependency
interface ThreeModules {
  THREE: any;
  OBJLoader: any;
  MTLLoader: any;
}

/**
 * Tampa Devs 3D Logo Component
 * Interactive 3D logo using Three.js with OBJ/MTL support
 */
export function Logo3d({
  objUrl = '',
  mtlUrl = '',
  width = 300,
  height = 300,
  autoRotate = true,
  rotationSpeed = 0.01,
  backgroundColor = 'transparent',
  enableZoom = false,
  enablePan = true,
  className,
}: Logo3dProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [threeAvailable, setThreeAvailable] = useState(false);

  // Refs for Three.js objects
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const threeRef = useRef<ThreeModules | null>(null);

  // Initialize Three.js
  useEffect(() => {
    let mounted = true;

    const loadThree = async () => {
      try {
        // Dynamic imports with type assertions to handle optional three.js dependency
        const threeModule = await import(/* webpackIgnore: true */ 'three') as any;
        const objLoaderModule = await import(/* webpackIgnore: true */ 'three/addons/loaders/OBJLoader.js') as any;
        const mtlLoaderModule = await import(/* webpackIgnore: true */ 'three/addons/loaders/MTLLoader.js') as any;

        if (!mounted) return;

        threeRef.current = {
          THREE: threeModule,
          OBJLoader: objLoaderModule.OBJLoader,
          MTLLoader: mtlLoaderModule.MTLLoader,
        };

        setThreeAvailable(true);
      } catch (e) {
        console.warn('Three.js not available:', e);
        if (mounted) {
          setThreeAvailable(false);
          setLoading(false);
        }
      }
    };

    loadThree();

    return () => {
      mounted = false;
    };
  }, []);

  // Initialize scene when Three.js is available
  useEffect(() => {
    if (!threeAvailable || !containerRef.current || !threeRef.current) return;

    const { THREE } = threeRef.current;
    const container = containerRef.current;

    // Create scene
    sceneRef.current = new THREE.Scene();

    // Create camera
    cameraRef.current = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current.position.z = 5;

    // Create renderer
    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: backgroundColor === 'transparent',
    });
    rendererRef.current.setSize(width, height);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);

    if (backgroundColor !== 'transparent') {
      rendererRef.current.setClearColor(backgroundColor);
    }

    container.appendChild(rendererRef.current.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    sceneRef.current.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, -5, -5);
    sceneRef.current.add(directionalLight2);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [threeAvailable, width, height, backgroundColor]);

  // Load model
  useEffect(() => {
    if (!threeAvailable || !threeRef.current || !sceneRef.current) return;

    const loadModel = async () => {
      const { THREE, OBJLoader, MTLLoader } = threeRef.current!;

      if (!objUrl) {
        setLoading(false);
        return;
      }

      try {
        let materials: any = null;

        // Load materials if MTL URL provided
        if (mtlUrl) {
          const mtlLoader = new MTLLoader();
          materials = await new Promise((resolve, reject) => {
            mtlLoader.load(
              mtlUrl,
              (mtl: any) => {
                mtl.preload();
                resolve(mtl);
              },
              undefined,
              reject
            );
          });
        }

        // Load OBJ model
        const objLoader = new OBJLoader();
        if (materials) {
          objLoader.setMaterials(materials);
        }

        const object = await new Promise<any>((resolve, reject) => {
          objLoader.load(objUrl, resolve, undefined, reject);
        });

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;

        object.position.sub(center);
        object.scale.setScalar(scale);

        // Remove old model if exists
        if (modelRef.current) {
          sceneRef.current.remove(modelRef.current);
        }

        modelRef.current = object;
        sceneRef.current.add(object);
        setLoading(false);
        setError(null);
      } catch (e) {
        console.error('Failed to load 3D model:', e);
        setError('Failed to load 3D model');
        setLoading(false);
      }
    };

    loadModel();
  }, [threeAvailable, objUrl, mtlUrl]);

  // Animation loop
  useEffect(() => {
    if (!threeAvailable || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (modelRef.current && autoRotate && !isDraggingRef.current) {
        modelRef.current.rotation.y += rotationSpeed;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [threeAvailable, autoRotate, rotationSpeed]);

  // Mouse/touch handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!enablePan) return;
    isDraggingRef.current = true;
    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  }, [enablePan]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enablePan || e.touches.length !== 1) return;
    isDraggingRef.current = true;
    previousMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, [enablePan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current || !modelRef.current) return;

    const deltaX = e.clientX - previousMouseRef.current.x;
    const deltaY = e.clientY - previousMouseRef.current.y;

    modelRef.current.rotation.y += deltaX * 0.01;
    modelRef.current.rotation.x += deltaY * 0.01;

    previousMouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current || !modelRef.current || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - previousMouseRef.current.x;
    const deltaY = e.touches[0].clientY - previousMouseRef.current.y;

    modelRef.current.rotation.y += deltaX * 0.01;
    modelRef.current.rotation.x += deltaY * 0.01;

    previousMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!enableZoom || !cameraRef.current) return;
    e.preventDefault();

    cameraRef.current.position.z += e.deltaY * 0.01;
    cameraRef.current.position.z = Math.max(2, Math.min(10, cameraRef.current.position.z));
  }, [enableZoom]);

  // Global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  // Fallback when Three.js is not available
  if (!threeAvailable && !loading) {
    return (
      <>
        <div
          className={clsx('td-logo-3d td-logo-3d--fallback', className)}
          style={{ width, height }}
        >
          <span className="td-logo-3d__fallback-text">
            Tampa<span className="td-logo-3d__fallback-accent">.dev</span>
          </span>
        </div>
        <style>{styles}</style>
      </>
    );
  }

  return (
    <>
      <div
        className={clsx('td-logo-3d', className)}
        style={{ width, height }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onWheel={handleWheel}
      >
        <div ref={containerRef} className="td-logo-3d__canvas" />

        {loading && (
          <div className="td-logo-3d__loading">
            <div className="td-logo-3d__spinner" />
          </div>
        )}

        {error && (
          <div className="td-logo-3d__error">
            <p>{error}</p>
          </div>
        )}
      </div>
      <style>{styles}</style>
    </>
  );
}

const styles = `
  .td-logo-3d {
    position: relative;
    overflow: hidden;
    border-radius: var(--td-radius-lg, 12px);
  }

  .td-logo-3d__canvas {
    width: 100%;
    height: 100%;
  }

  .td-logo-3d__canvas canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .td-logo-3d__loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(28, 36, 56, 0.1);
  }

  .td-logo-3d__spinner {
    width: 2rem;
    height: 2rem;
    border: 2px solid var(--td-color-border, rgba(255, 255, 255, 0.1));
    border-top-color: var(--td-color-coral, #E85A4F);
    border-radius: 50%;
    animation: td-logo-3d-spin 1s linear infinite;
  }

  @keyframes td-logo-3d-spin {
    to { transform: rotate(360deg); }
  }

  .td-logo-3d__error {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(28, 36, 56, 0.05);
    color: var(--td-color-text-muted, #9CA3AF);
    font-size: 0.875rem;
    text-align: center;
    padding: 1rem;
  }

  .td-logo-3d--fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--td-color-navy, #1C2438) 0%, var(--td-color-navy-dark, #1A2031) 100%);
    color: white;
  }

  .td-logo-3d__fallback-text {
    font-size: 2rem;
    font-weight: 700;
  }

  .td-logo-3d__fallback-accent {
    color: var(--td-color-coral, #E85A4F);
  }
`;
