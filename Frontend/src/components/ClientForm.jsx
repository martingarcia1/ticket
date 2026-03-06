import React from 'react';
import { User, Briefcase } from 'lucide-react';

export default function ClientForm({ clientInfo, onChange }) {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-8 dark:bg-slate-800 light:bg-white light:border-slate-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-slate-700 pb-4 text-slate-100 dark:text-slate-100 light:text-slate-900">
                <User size={24} className="text-indigo-500" />
                Detalles del Cliente
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-400">Cliente</label>
                    <div className="relative">
                        <User size={18} className="absolute top-3 left-3 text-slate-500" />
                        <input
                            type="text"
                            name="name"
                            value={clientInfo.name}
                            onChange={onChange}
                            placeholder="Ej. Esteban Siufi"
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:bg-slate-900 dark:text-slate-100 light:bg-slate-50 light:text-slate-900 light:border-slate-300"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-400">Empresa</label>
                    <div className="relative">
                        <Briefcase size={18} className="absolute top-3 left-3 text-slate-500" />
                        <input
                            type="text"
                            name="company"
                            value={clientInfo.company}
                            onChange={onChange}
                            placeholder="Ej. Marcelo Chavan"
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:bg-slate-900 dark:text-slate-100 light:bg-slate-50 light:text-slate-900 light:border-slate-300"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-400">Fecha</label>
                    <input
                        type="date"
                        name="date"
                        value={clientInfo.date}
                        onChange={onChange}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:bg-slate-900 dark:text-slate-100 light:bg-slate-50 light:text-slate-900 light:border-slate-300"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-slate-400">Nº de Ticket</label>
                    <input
                        type="text"
                        name="ticketNumber"
                        value={clientInfo.ticketNumber}
                        onChange={onChange}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all dark:bg-slate-900 dark:text-slate-100 light:bg-slate-50 light:text-slate-900 light:border-slate-300"
                    />
                </div>
            </div>
        </div>
    );
}
