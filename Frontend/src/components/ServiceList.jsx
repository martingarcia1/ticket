import React, { useState } from 'react';
import { FileText, Plus, Trash2, List } from 'lucide-react';
import { SERVICE_CATALOG } from '../hooks/useTicketState';

export default function ServiceList({
    items,
    onAdd,
    onAddFromCatalog,
    onRemove,
    onChange,
    totals,
    grandTotalARS,
    exchangeRate,
    formatCurrencyARS,
    formatCurrencyUSD
}) {

    const [showCatalog, setShowCatalog] = useState(false);

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-8">

            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-100">
                    <FileText size={24} className="text-indigo-500" />
                    Servicios y Honorarios
                </h2>

                {/* Real-time Exchange Rate Badge */}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700 text-sm">
                    <span className="text-slate-400">Dólar Cotización:</span>
                    {exchangeRate.loading ? (
                        <span className="text-slate-500 animate-pulse">Cargando...</span>
                    ) : (
                        <span className="font-semibold text-emerald-400">
                            {formatCurrencyARS(exchangeRate.value)}
                        </span>
                    )}
                </div>
            </div>

            {/* Catalog Dropdown Toggle */}
            <div className="mb-6">
                <button
                    onClick={() => setShowCatalog(!showCatalog)}
                    className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                    <List size={16} />
                    {showCatalog ? 'Ocultar Catálogo Predefinido' : 'Ver Catálogo Predefinido'}
                </button>

                {showCatalog && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 animate-[slideIn_0.2s_ease-out]">
                        {SERVICE_CATALOG.map(service => (
                            <div
                                key={service.id}
                                onClick={() => { onAddFromCatalog(service); setShowCatalog(false); }}
                                className="flex justify-between items-center p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer border border-transparent hover:border-indigo-500/30 transition-all"
                            >
                                <div>
                                    <div className="font-medium text-slate-200 text-sm">{service.description}</div>
                                    <div className="text-xs text-slate-400">{service.type}</div>
                                </div>
                                <div className="font-semibold text-indigo-400 text-sm">
                                    {service.currency === 'USD' ? formatCurrencyUSD(service.price) : formatCurrencyARS(service.price)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Table Headers for Desktop */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_minmax(80px,_1fr)_1fr_auto] gap-4 pb-2 border-b border-slate-700 mb-4 text-sm font-medium text-slate-400">
                <div>Descripción</div>
                <div>Cant.</div>
                <div>Precio Unit.</div>
                <div>Moneda</div>
                <div className="text-right">Total</div>
                <div className="w-8"></div>
            </div>

            {/* Items List */}
            <div className="space-y-4 mb-6">
                {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_minmax(80px,_1fr)_1fr_auto] gap-4 items-center bg-slate-900/50 p-4 rounded-xl md:bg-transparent md:p-0 animate-[slideIn_0.3s_ease-out]">

                        <div className="md:hidden text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Descripción</div>
                        <input
                            type="text"
                            value={item.description}
                            onChange={(e) => onChange(item.id, 'description', e.target.value)}
                            placeholder="Ej: Desarrollo Web"
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder-slate-600"
                        />

                        <div className="md:hidden text-xs font-medium text-slate-500 uppercase tracking-wider mt-2 mb-1">Cantidad</div>
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => onChange(item.id, 'quantity', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
                        />

                        <div className="md:hidden text-xs font-medium text-slate-500 uppercase tracking-wider mt-2 mb-1">Precio Unitario</div>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => onChange(item.id, 'price', e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
                        />

                        <div className="md:hidden text-xs font-medium text-slate-500 uppercase tracking-wider mt-2 mb-1">Moneda</div>
                        <select
                            value={item.currency}
                            onChange={(e) => onChange(item.id, 'currency', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-lg p-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                        >
                            <option value="ARS">ARS</option>
                            <option value="USD">USD</option>
                        </select>

                        <div className="font-semibold text-right text-slate-200 mt-2 md:mt-0 font-mono">
                            <span className="md:hidden text-sm font-normal text-slate-400 mr-2">Total:</span>
                            {item.currency === 'USD'
                                ? formatCurrencyUSD(Number(item.quantity) * Number(item.price))
                                : formatCurrencyARS(Number(item.quantity) * Number(item.price))}
                        </div>

                        <button
                            onClick={() => onRemove(item.id)}
                            disabled={items.length === 1}
                            title="Eliminar item"
                            className={`p-2 rounded-full transition-colors flex justify-center items-center mt-2 md:mt-0 w-full md:w-auto
                ${items.length === 1
                                    ? 'text-slate-600 cursor-not-allowed bg-slate-800'
                                    : 'text-red-400 hover:bg-red-500/10 hover:text-red-300 bg-slate-800 md:bg-transparent'
                                }`}
                        >
                            <Trash2 size={18} />
                            <span className="md:hidden ml-2">Eliminar</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Custom Item Button */}
            <button
                onClick={onAdd}
                className="w-full py-3 px-4 bg-slate-800/50 hover:bg-slate-700 border border-dashed border-slate-600 rounded-xl text-slate-300 font-medium flex items-center justify-center gap-2 transition-all hover:border-indigo-500/50 hover:text-indigo-400"
            >
                <Plus size={18} /> Agregar Servicio Personalizado
            </button>

            {/* Totals Section */}
            <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-col items-end gap-3">

                {/* Subtotal Breakdowns */}
                {totals.usd > 0 && (
                    <div className="flex justify-between w-full md:w-1/2 text-sm text-slate-400">
                        <span>Subtotal USD</span>
                        <span className="font-mono text-slate-300">{formatCurrencyUSD(totals.usd)}</span>
                    </div>
                )}

                {totals.ars > 0 && (
                    <div className="flex justify-between w-full md:w-1/2 text-sm text-slate-400">
                        <span>Subtotal ARS</span>
                        <span className="font-mono text-slate-300">{formatCurrencyARS(totals.ars)}</span>
                    </div>
                )}

                {/* Grand Total */}
                <div className="flex justify-between w-full md:w-1/2 text-lg text-slate-300 mt-2 pt-2 border-t border-slate-700 border-dashed">
                    <span>Total General Estimado</span>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-emerald-400 block font-mono">
                            {formatCurrencyARS(grandTotalARS)}
                        </span>
                        {totals.usd > 0 && (
                            <span className="text-xs text-slate-500 font-mono">
                                Incluye conversión a {formatCurrencyARS(exchangeRate.value)}
                            </span>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
