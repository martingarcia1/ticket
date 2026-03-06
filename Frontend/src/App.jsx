import Header from './components/Header';
import TicketEditor from './components/TicketEditor';
import TicketPreview from './components/TicketPreview';
import { useTicketState } from './hooks/useTicketState';
import './index.css';

function App() {
  const state = useTicketState();

  return (
    <div className="min-h-screen">

      {/* Main App Container - Hidden when printing */}
      <div className="max-w-4xl mx-auto p-4 md:p-8 flex flex-col gap-8 no-print">
        <Header />
        <TicketEditor {...state} />
      </div>

      {/* Actual Printable Ticket - Hidden on screen, shown when printing */}
      <TicketPreview {...state} />

    </div>
  );
}

export default App;
