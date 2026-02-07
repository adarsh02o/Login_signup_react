/**
 * GlassCard Component
 * Premium glassmorphism container with subtle noise texture
 * cleaner, thinner borders for a high-end feel
 */
export default function GlassCard({ children, className = '' }) {
    return (
        <div className={`relative w-full max-w-[400px] sm:max-w-[440px] 
                        animate-[slideUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] 
                        group ${className}`}>

            {/* Glow effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-blue-500/20 
                          rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Main card */}
            <div className="glass-effect relative w-full h-full rounded-2xl 
                           border border-white/20 dark:border-white/10
                           shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] 
                           dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] 
                           overflow-hidden transition-all duration-500
                           bg-white/80 dark:bg-[#0F1016]/80">

                {/* Noise texture overlay */}
                <div className="noise-bg mix-blend-overlay"></div>

                {/* Content */}
                <div className="relative p-6 sm:p-8 z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
