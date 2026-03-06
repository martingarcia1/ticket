import React from 'react';
import { Printer } from 'lucide-react';
import ClientForm from './ClientForm';
import ServiceList from './ServiceList';

export default function TicketEditor({
    clientInfo,
    items,
    totals,
    grandTotalARS,
    exchangeRate,
    handleClientChange,
    handleItemChange,
    addItem,
    addFromCatalog,
    removeItem,
    formatCurrencyARS,
    formatCurrencyUSD,
    handlePrint
}) {
    return (
        <div className="flex flex-col">
            <ClientForm
                clientInfo={clientInfo}
                onChange={handleClientChange}
            />
            <ServiceList
                items={items}
                onAdd={addItem}
                onAddFromCatalog={addFromCatalog}
                onRemove={removeItem}
                onChange={handleItemChange}
                totals={totals}
                grandTotalARS={grandTotalARS}
                exchangeRate={exchangeRate}
                formatCurrencyARS={formatCurrencyARS}
                formatCurrencyUSD={formatCurrencyUSD}
            />

            <button
                onClick={handlePrint}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-3 transition-all hover:-translate-y-1"
            >
                <Printer size={24} /> Imprimir / Exportar a PDF
            </button>
        </div>
    );
}
