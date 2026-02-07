/**
 * TrustBadge Component
 * Subtle security indicator
 * Minimalist design for premium feel
 */
export default function TrustBadge() {
    return (
        <div className="mt-8 flex items-center justify-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <span className="material-symbols-outlined text-[16px] text-slate-400 dark:text-slate-500">
                lock
            </span>
            <span className="text-[10px] uppercase tracking-widest font-medium text-slate-400 dark:text-slate-500">
                Secured by OSA HR
            </span>
        </div>
    );
}
