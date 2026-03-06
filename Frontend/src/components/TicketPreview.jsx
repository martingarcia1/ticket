import React from 'react';
import { Receipt } from 'lucide-react';

export default function TicketPreview({
    clientInfo,
    items,
    totals,
    grandTotalARS,
    exchangeRate,
    formatCurrencyARS,
    formatCurrencyUSD
}) {
    return (
        <div className="bg-white text-black p-8 md:p-12 hidden print:flex min-h-screen flex-col w-full">

            {/* Header */}
            <div className="text-center mb-10 border-b-2 border-slate-200 pb-6">
                <h2 className="text-3xl font-bold mb-2 flex justify-center items-center gap-3">
                    <Receipt size={36} /> PRESUPUESTO DE PROYECTO
                </h2>
                <p className="text-slate-600 text-lg">Sergio Martin Garcia - Desarrollo Web</p>
                <p className="text-slate-500">Contacto: @martiin_garcia_</p>
            </div>

            {/* Client Info Block */}
            <div className="bg-slate-50 border-l-4 border-slate-500 p-6 rounded-r-lg mb-10 grid grid-cols-2 gap-6">
                <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Cliente</span>
                    <span className="text-xl font-medium text-slate-900">{clientInfo.name || 'Consumidor Final'}</span>
                </div>
                <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Empresa</span>
                    <span className="text-xl font-medium text-slate-900">{clientInfo.company || '---'}</span>
                </div>
                <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Nº Comprobante</span>
                    <span className="text-xl font-medium text-slate-900">#{clientInfo.ticketNumber}</span>
                </div>
                <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Fecha</span>
                    <span className="text-xl font-medium text-slate-900">{clientInfo.date}</span>
                </div>
            </div>

            {/* Table */}
            <table className="w-full mb-10 border-collapse">
                <thead>
                    <tr className="bg-slate-100 border-b-2 border-slate-300">
                        <th className="py-3 px-4 text-left text-sm font-bold text-slate-700 uppercase">Tarea / Actividad</th>
                        <th className="py-3 px-4 text-right text-sm font-bold text-slate-700 uppercase w-24">Cant.</th>
                        <th className="py-3 px-4 text-right text-sm font-bold text-slate-700 uppercase w-40">Tarifa</th>
                        <th className="py-3 px-4 text-right text-sm font-bold text-slate-700 uppercase w-40">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        const isUsd = item.currency === 'USD';
                        const priceStr = isUsd ? formatCurrencyUSD(item.price) : formatCurrencyARS(item.price);
                        const subtotalStr = isUsd
                            ? formatCurrencyUSD(Number(item.quantity) * Number(item.price))
                            : formatCurrencyARS(Number(item.quantity) * Number(item.price));

                        return (
                            <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="py-4 px-4 font-medium text-slate-800">{item.description || 'Item sin descripción'}</td>
                                <td className="py-4 px-4 text-right text-slate-700">{item.quantity}</td>
                                <td className="py-4 px-4 text-right text-slate-700 font-mono">{priceStr}</td>
                                <td className="py-4 px-4 text-right font-semibold text-slate-900 font-mono">{subtotalStr}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Pre-computation breakdowns and Final Total */}
            <div className="mt-auto flex justify-end">
                <div className="w-2/3 md:w-1/2">

                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        {totals.usd > 0 && (
                            <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-200">
                                <span className="text-slate-600 font-medium">Subtotal en Dólares</span>
                                <span className="text-lg font-bold text-slate-800 font-mono">{formatCurrencyUSD(totals.usd)}</span>
                            </div>
                        )}

                        {totals.ars > 0 && (
                            <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-200">
                                <span className="text-slate-600 font-medium">Subtotal en Pesos</span>
                                <span className="text-lg font-bold text-slate-800 font-mono">{formatCurrencyARS(totals.ars)}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-2">
                            <span className="text-xl font-extrabold text-slate-900">TOTAL ESTIMADO</span>
                            <div className="text-right">
                                <span className="text-2xl font-extrabold text-slate-900 font-mono block">
                                    {formatCurrencyARS(grandTotalARS)}
                                </span>
                                {totals.usd > 0 && (
                                    <span className="text-xs text-slate-500 font-medium mt-1 block">
                                        Cotización USD Venta: {formatCurrencyARS(exchangeRate.value)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Observations & Footers */}
            <div className="mt-16 text-slate-700 text-sm">
                <h3 className="font-bold text-lg mb-2 text-slate-900">Observaciones:</h3>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Los valores pueden variar según el alcance del proyecto.</li>
                    <li>Incluye asesoramiento personalizado.</li>
                    <li>No incluye hosting ni dominio (a menos que se acuerde).</li>
                </ul>
                <p className="font-medium">Forma de pago: A convenir</p>
            </div>

        </div>
    );
}
