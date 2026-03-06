import { useState, useEffect } from 'react';

// Honorarios fijos basados en la imagen proveida
export const SERVICE_CATALOG = [
    { id: 'c1', description: 'Consulta y análisis inicial', price: 50, currency: 'USD', type: 'Hr' },
    { id: 'c2', description: 'Servicio técnico y mantenimiento mensual', price: 200, currency: 'USD', type: 'Mes' },
    { id: 'c3', description: 'Desarrollo Landing Page', price: 250, currency: 'USD', type: 'Proyecto' },
    { id: 'c4', description: 'Desarrollo sitio multipage mensual', price: 600, currency: 'USD', type: 'Mes' },
    { id: 'c5', description: 'Desarrollo Ecommerce mensual', price: 1000, currency: 'USD', type: 'Mes' },
    { id: 'c6', description: 'Ingreso de stock', price: 100000, currency: 'ARS', type: 'Servicio' },
    { id: 'c7', description: 'Instalación de sistema/programas', price: 200000, currency: 'ARS', type: 'Servicio' },
    { id: 'c8', description: 'Consultas y soporte técnico', price: 50000, currency: 'ARS', type: 'Consulta' },
    { id: 'c9', description: 'Mantenimiento mensual soporte web', price: 250000, currency: 'ARS', type: 'Mes' },
];

export function useTicketState() {
    const [clientInfo, setClientInfo] = useState({
        name: '',
        company: '',
        date: new Date().toISOString().split('T')[0],
        ticketNumber: Math.floor(1000 + Math.random() * 9000).toString(),
    });

    const [items, setItems] = useState([
        { id: 1, description: 'Desarrollo Landing Page', quantity: 1, price: 250, currency: 'USD' },
    ]);

    const [exchangeRate, setExchangeRate] = useState({ value: 0, loading: true, error: false });

    // Fetch real-time Dolar Blue from DolarAPI.com (Free & Public for Argentina)
    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const res = await fetch('https://dolarapi.com/v1/dolares/blue');
                const data = await res.json();
                setExchangeRate({ value: data.venta, loading: false, error: false });
            } catch (err) {
                console.error("Error fetching exchange rate:", err);
                // Fallback to a reasonable default if API fails
                setExchangeRate({ value: 1050, loading: false, error: true });
            }
        };
        fetchExchangeRate();
    }, []);

    const handleClientChange = (e) => {
        setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
    };

    const handleItemChange = (id, field, value) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const addFromCatalog = (catalogItem) => {
        const newItem = {
            id: Date.now(),
            description: catalogItem.description,
            quantity: 1,
            price: catalogItem.price,
            currency: catalogItem.currency,
        };
        setItems([...items, newItem]);
    };

    const addItem = () => {
        const newItem = {
            id: Date.now(),
            description: '',
            quantity: 1,
            price: 0,
            currency: 'ARS'
        };
        setItems([...items, newItem]);
    };

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    // Dual Currency Calculations
    const totals = items.reduce((acc, item) => {
        const lineTotal = Number(item.quantity) * Number(item.price);
        if (item.currency === 'USD') {
            acc.usd += lineTotal;
        } else {
            acc.ars += lineTotal;
        }
        return acc;
    }, { usd: 0, ars: 0 });

    const grandTotalARS = totals.ars + (totals.usd * exchangeRate.value);

    const formatCurrencyARS = (amount) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
    };

    const formatCurrencyUSD = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const handlePrint = () => {
        window.print();
    };

    return {
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
    };
}
