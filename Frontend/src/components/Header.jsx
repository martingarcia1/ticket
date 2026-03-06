import React from 'react';

export default function Header() {
    return (
        <div className="col-span-1 xl:col-span-2 text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
                Ticket System
            </h1>
            <p className="text-slate-400 mt-2 text-lg">
                Generador de Presupuestos y Tickets de Software
            </p>
        </div>
    );
}
