import React from 'react';
interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export function NeonInput({
  label,
  id,
  className = '',
  ...props
}: NeonInputProps) {
  return <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="font-mono text-sm text-cyber-cyan uppercase tracking-widest opacity-80">
        {label}
      </label>
      <div className="relative group">
        <input id={id} className={`
            w-full bg-cyber-dark/50 border-2 border-cyber-gray 
            text-white font-body text-lg px-4 py-3 outline-none
            focus:border-cyber-cyan focus:shadow-neon-cyan
            transition-all duration-300 rounded-sm
            placeholder:text-gray-600
            ${className}
          `} {...props} />
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyber-cyan opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyber-cyan opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
      </div>
    </div>;
}