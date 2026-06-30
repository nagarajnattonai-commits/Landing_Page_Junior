import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface WireframeShape {
  type: "cube" | "octahedron" | "tetrahedron";
  x: number; // center in world space
  y: number;
  z: number;
  vx: number; // drifting velocities
  vy: number;
  vz: number;
  size: number;
  color: string;
  rx: number; // current rotations
  ry: number;
  rz: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  vertices: Point3D[];
  edges: [number, number][];
}

interface FloatingGlyph {
  text: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
}

export default function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, down: false });

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        setDimensions({ width, height });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle mouse and touch interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Normalize values between -1 and 1
      mouseRef.current.targetX = x / (rect.width / 2);
      mouseRef.current.targetY = y / (rect.height / 2);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left - rect.width / 2;
      const y = e.touches[0].clientY - rect.top - rect.height / 2;
      mouseRef.current.targetX = x / (rect.width / 2);
      mouseRef.current.targetY = y / (rect.height / 2);
    };

    const handleMouseDown = () => { mouseRef.current.down = true; };
    const handleMouseUp = () => { mouseRef.current.down = false; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Detect if we are on a mobile device to optimize performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 100;
    const connectionDistance = isMobile ? 100 : 140;

    // 1. Generate 3D particles in a spherical/cyber network lattice shape
    const particles: Particle[] = [];
    const radius = 250;

    for (let i = 0; i < particleCount; i++) {
      // Uniform distribution on sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const dist = radius * (0.35 + 0.65 * Math.random()); // distribute within a shell
      const x = dist * Math.sin(phi) * Math.cos(theta);
      const y = dist * Math.sin(phi) * Math.sin(theta);
      const z = dist * Math.cos(phi);

      const isCyan = Math.random() > 0.45;
      const isPink = !isCyan && Math.random() > 0.4;
      let color = "rgba(6, 182, 212, "; // Cyan
      if (isPink) color = "rgba(236, 72, 153, "; // Pink
      else if (!isCyan) color = "rgba(234, 179, 8, "; // Yellow

      particles.push({
        x,
        y,
        z,
        size: Math.random() * 2 + 1,
        color
      });
    }

    // Helper to generate 3D wireframe cube vertices & edges
    const getCubeShape = (): { vertices: Point3D[], edges: [number, number][] } => {
      const vertices: Point3D[] = [
        { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 }, { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
        { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }
      ];
      const edges: [number, number][] = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];
      return { vertices, edges };
    };

    // Helper to generate 3D wireframe octahedron (Double-Pyramid)
    const getOctahedronShape = (): { vertices: Point3D[], edges: [number, number][] } => {
      const vertices: Point3D[] = [
        { x: 0, y: -1.4, z: 0 }, { x: 0, y: 1.4, z: 0 },
        { x: -1, y: 0, z: -1 }, { x: 1, y: 0, z: -1 },
        { x: 1, y: 0, z: 1 }, { x: -1, y: 0, z: 1 }
      ];
      const edges: [number, number][] = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 3], [3, 4], [4, 5], [5, 2]
      ];
      return { vertices, edges };
    };

    // 2. Generate drifting 3D Wireframe Geometries
    const shapes: WireframeShape[] = [];
    const shapeCount = isMobile ? 3 : 7;
    for (let i = 0; i < shapeCount; i++) {
      const isCube = Math.random() > 0.5;
      const { vertices, edges } = isCube ? getCubeShape() : getOctahedronShape();
      
      // Randomly disperse shapes in a wide 3D space surrounding the screen center
      const angle = (i / shapeCount) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 250 + Math.random() * 200;
      
      shapes.push({
        type: isCube ? "cube" : "octahedron",
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 50,
        z: (Math.random() - 0.5) * 300,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.2,
        size: isCube ? 25 + Math.random() * 20 : 30 + Math.random() * 20,
        color: i % 3 === 0 ? "rgba(6, 182, 212, " : i % 3 === 1 ? "rgba(236, 72, 153, " : "rgba(234, 179, 8, ",
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        rz: Math.random() * Math.PI,
        rotSpeedX: 0.005 + Math.random() * 0.015,
        rotSpeedY: 0.005 + Math.random() * 0.015,
        rotSpeedZ: 0.003 + Math.random() * 0.008,
        vertices,
        edges
      });
    }

    // 3. Generate floating AI / Math / Code symbols that drift in 3D
    const glyphs: FloatingGlyph[] = [];
    const glyphOptions = ["AI", "1", "0", "{}", "f(x)", "X", "Y", "code", "⚛", "∑", "<>", "[]"];
    const glyphCount = isMobile ? 8 : 16;
    for (let i = 0; i < glyphCount; i++) {
      glyphs.push({
        text: glyphOptions[Math.floor(Math.random() * glyphOptions.length)],
        x: (Math.random() - 0.5) * canvas.width * 0.8,
        y: (Math.random() - 0.5) * canvas.height * 0.8,
        z: (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.4, // float upwards slowly
        vz: (Math.random() - 0.5) * 0.3,
        size: 10 + Math.random() * 12,
        color: Math.random() > 0.5 ? "rgba(6, 182, 212, " : "rgba(236, 72, 153, "
      });
    }

    let angleX = 0.0006;
    let angleY = 0.0012;
    const fov = 420; // Camera perspective field of view

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interaction tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Base slow rotation plus mouse dynamic rotation influence for the central sphere
      const rx = angleX + mouseRef.current.y * 0.004;
      const ry = angleY + mouseRef.current.x * 0.004;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      // ----------------------------------------------------
      // DRAW LAYER 1: Core 3D Constellation Sphere
      // ----------------------------------------------------
      const projected: Array<{ sx: number; sy: number; sz: number; p: Particle }> = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Rotate around Y axis
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate around X axis
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Save updated 3D position
        p.x = x1;
        p.y = y2;
        p.z = z2;

        // Small random micro-shivering
        p.x += (Math.random() - 0.5) * 0.12;
        p.y += (Math.random() - 0.5) * 0.12;

        const cameraZ = z2 + 500;
        const scale = fov / Math.max(cameraZ, 1);
        const sx = p.x * scale + canvas.width / 2;
        const sy = p.y * scale + canvas.height / 2;

        projected.push({ sx, sy, sz: z2, p });
      }

      // Draw connection lines
      ctx.lineWidth = 0.55;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          const dx = p1.p.x - p2.p.x;
          const dy = p1.p.y - p2.p.y;
          const dz = p1.p.z - p2.p.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < connectionDistance) {
            const opacityFactor = (1 - dist3D / connectionDistance);
            const depthFactor = (p1.sz + p2.sz) / 2;
            const normalizedDepth = (depthFactor + radius) / (radius * 2);
            const finalOpacity = opacityFactor * (0.04 + normalizedDepth * 0.16);

            ctx.strokeStyle = `rgba(100, 116, 139, ${finalOpacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      for (let i = 0; i < projected.length; i++) {
        const pInfo = projected[i];
        const p = pInfo.p;
        const cameraZ = pInfo.sz + 500;
        const finalSize = Math.max(0.1, p.size * (fov / cameraZ));
        const normalizedDepth = (pInfo.sz + radius) / (radius * 2);
        const opacity = 0.15 + normalizedDepth * 0.65;

        ctx.fillStyle = `${p.color}${opacity})`;
        ctx.beginPath();
        ctx.arc(pInfo.sx, pInfo.sy, finalSize, 0, Math.PI * 2);
        ctx.fill();

        // Aura glow on closest nodes
        if (pInfo.sz > radius * 0.35) {
          ctx.strokeStyle = `${p.color}${opacity * 0.22})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.arc(pInfo.sx, pInfo.sy, finalSize * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // ----------------------------------------------------
      // DRAW LAYER 2: Drifting 3D Wireframe Geometries
      // ----------------------------------------------------
      shapes.forEach((shape) => {
        // Drift movement
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.z += shape.vz;

        // Apply mouse subtle gravitational attraction / repulsion
        const dxMouse = (mouseRef.current.x * canvas.width / 2) - shape.x;
        const dyMouse = (mouseRef.current.y * canvas.height / 2) - shape.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 300) {
          const force = (300 - distMouse) * 0.0003;
          shape.x -= dxMouse * force;
          shape.y -= dyMouse * force;
        }

        // Screen boundary wrapping
        const maxDist = Math.max(canvas.width, canvas.height) * 0.75;
        if (Math.abs(shape.x) > maxDist) shape.x = -shape.x;
        if (Math.abs(shape.y) > maxDist) shape.y = -shape.y;
        if (Math.abs(shape.z) > 400) shape.z = -shape.z;

        // Auto rotation angles
        shape.rx += shape.rotSpeedX;
        shape.ry += shape.rotSpeedY;
        shape.rz += shape.rotSpeedZ;

        const cX = Math.cos(shape.rx), sX = Math.sin(shape.rx);
        const cY = Math.cos(shape.ry), sY = Math.sin(shape.ry);
        const cZ = Math.cos(shape.rz), sZ = Math.sin(shape.rz);

        // Project and transform shape vertices
        const shapeProjected: Point3D[] = [];
        shape.vertices.forEach((v) => {
          // Local rotation: Z axis
          let x_z = v.x * cZ - v.y * sZ;
          let y_z = v.y * cZ + v.x * sZ;

          // Local rotation: Y axis
          let x_y = x_z * cY - v.z * sY;
          let z_y = v.z * cY + x_z * sY;

          // Local rotation: X axis
          let y_x = y_z * cX - z_y * sX;
          let z_x = z_y * cX + y_z * sX;

          // Apply size scale & world position coordinates
          const wX = x_y * shape.size + shape.x;
          const wY = y_x * shape.size + shape.y;
          const wZ = z_x * shape.size + shape.z;

          // Camera transform with perspective
          const camZ = wZ + 600;
          const scale = fov / Math.max(camZ, 1);
          const sx = wX * scale + canvas.width / 2;
          const sy = wY * scale + canvas.height / 2;

          shapeProjected.push({ x: sx, y: sy, z: wZ });
        });

        // Depth average to calculate shape's collective opacity
        const avgDepth = shape.z; // -300 to 300
        const normDepth = (avgDepth + 300) / 600; // 0 to 1
        const opacity = 0.08 + normDepth * 0.22;

        // Draw edges of wireframe
        ctx.strokeStyle = `${shape.color}${opacity})`;
        ctx.lineWidth = 1.2;
        shape.edges.forEach(([i1, i2]) => {
          const pt1 = shapeProjected[i1];
          const pt2 = shapeProjected[i2];
          
          if (pt1 && pt2) {
            ctx.beginPath();
            ctx.moveTo(pt1.x, pt1.y);
            ctx.lineTo(pt2.x, pt2.y);
            ctx.stroke();
          }
        });

        // Draw glowing vertex points
        ctx.fillStyle = `${shape.color}${opacity * 1.5})`;
        shapeProjected.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // ----------------------------------------------------
      // DRAW LAYER 3: Drifting 3D Code Glyphs / AI Symbols
      // ----------------------------------------------------
      ctx.font = "bold 13px 'JetBrains Mono', monospace";
      glyphs.forEach((glyph) => {
        // Drift
        glyph.x += glyph.vx;
        glyph.y += glyph.vy;
        glyph.z += glyph.vz;

        // Parallax mouse drag influence
        const dynamicX = glyph.x + (mouseRef.current.x * glyph.z * 0.08);
        const dynamicY = glyph.y + (mouseRef.current.y * glyph.z * 0.08);

        // Wrap around bounds nicely
        if (glyph.y < -canvas.height / 2 - 50) {
          glyph.y = canvas.height / 2 + 50;
          glyph.x = (Math.random() - 0.5) * canvas.width * 0.8;
        }
        if (Math.abs(glyph.x) > canvas.width / 2 + 100) {
          glyph.x = -glyph.x;
        }
        if (Math.abs(glyph.z) > 300) {
          glyph.z = -glyph.z;
        }

        const camZ = glyph.z + 500;
        const scale = fov / Math.max(camZ, 1);
        const sx = dynamicX * scale + canvas.width / 2;
        const sy = dynamicY * scale + canvas.height / 2;

        const normDepth = (glyph.z + 300) / 600; // 0 to 1
        const opacity = 0.05 + normDepth * 0.35;
        const finalSize = Math.max(8, glyph.size * scale * 0.002);

        ctx.font = `bold ${Math.round(finalSize)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `${glyph.color}${opacity})`;
        ctx.fillText(glyph.text, sx, sy);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      id="threed-nodes-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-60 bg-transparent"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

