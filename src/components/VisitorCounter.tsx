import { useState, useEffect } from "react";

const VisitorCounter = () => {
	const [count, setCount] = useState<number>(0);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		// Get or initialize visitor count
		const storedCount = localStorage.getItem("visitorCount");
		const currentCount = storedCount ? parseInt(storedCount, 10) : 133742;
		const newCount = currentCount + 1;

		setCount(newCount);
		localStorage.setItem("visitorCount", newCount.toString());

		// Trigger animation
		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 600);
	}, []);

	// Pad the count to 6 digits
	const paddedCount = count.toString().padStart(6, "0");

	return (
		<div className="flex flex-col items-center gap-2">
			<p className="text-comment text-xs">You are visitor:</p>
			<div className="relative inline-flex items-center gap-0.5 bg-muted/80 border-2 border-terminal/40 rounded px-3 py-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
				{/* Retro "LED" style digits */}
				{paddedCount.split("").map((digit, idx) => (
					<div
						key={idx}
						className={`
              relative w-7 h-10 bg-gradient-to-b from-background/90 to-background/60
              border border-terminal/30 rounded-sm
              flex items-center justify-center
              font-mono font-bold text-2xl
              shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]
              ${isAnimating ? "animate-pulse" : ""}
            `}
						style={{
							animationDelay: `${idx * 50}ms`,
							textShadow:
								"0 0 8px hsl(var(--terminal)), 0 0 4px hsl(var(--terminal))",
						}}
					>
						<span className="text-terminal glow relative z-10">
							{digit}
						</span>
						{/* Scanline effect */}
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-terminal/5 to-transparent pointer-events-none" />
					</div>
				))}
			</div>
			<div className="flex items-center gap-1 text-[10px] text-comment">
				<span>🌐</span>
				<span>Since 1996</span>
				<span>•</span>
				<span className="text-warning">Geocities Certified</span>
			</div>
		</div>
	);
};

export default VisitorCounter;
