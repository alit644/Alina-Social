import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
 const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; size: number; speed: number }[] = [];
    for (let i = 0; i < 10; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 1 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < 0) particle.y = canvas.height; 
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "oklch(83.3% 0.145 321.434)";
        ctx.fill();
        ctx.shadowBlur = 20;
        ctx.shadowColor = "oklch(83.3% 0.145 321.434)";
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
    <canvas ref={canvasRef} className="absolute inset-0"/>
      {/* Animated light sources */}
      <div className="absolute -left-[50px] md:-left-[150px] -top-[50px] md:-top-[200px] h-[200px] md:h-[400px] w-[200px] md:w-[400px] animate-pulse rounded-full bg-fuchsia-800/40 blur-[100px] transition-all duration-700 will-change-auto" />
      <div className="absolute -right-[50px] md:-right-[150px] -bottom-[50px] md:-bottom-[150px] h-[200px] md:h-[400px] w-[200px] md:w-[400px] animate-pulse rounded-full bg-blue-500/20 blur-[80px] transition-all duration-1000 delay-200 will-change-auto" />

    </>
  );
};

export default AnimatedBackground;
