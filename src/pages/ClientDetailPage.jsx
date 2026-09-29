import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientsContext from "../context/ClientsContext";
import TimeSinceAdded from "../components/TimeSinceAdded";
import ToastContext from "../context/ToastContext";
import CurrencyContext from "../context/CurrencyContext";

function ClientDetailPage(){

    const { addedAt } = useParams();

    const { clients, handleAddNote } = useContext(ClientsContext);

    const client = clients.find((client) => client.addedAt === Number(addedAt));

    if(!client){
        return (
            <div className="client-card">
                <p>Sorry there is no such client.</p>
            </div>
        )
    }

    const [note, setNote] = useState('');

    const { showToast } = useContext(ToastContext);

    const { currency, rate } = useContext(CurrencyContext);

    const displayAmount = currency === "NPR" && rate
        ? `NPR ${(client.paymentAmount * rate).toFixed(2)}`
        : `USD ${client.paymentAmount.toFixed(2)}`;

    function handleSubmit(e){
        e.preventDefault();
        handleAddNote(client.addedAt, { text: note, timestamp: Date.now() });
        setNote('');
    }

    return (
        <div className="client-card">
            <h2>Name: {client.name}</h2>
            <p>Platform: {client.platform}</p>
            <p>Status : {client.status}</p>
            <p>Payment Amount : {displayAmount}</p>
            <TimeSinceAdded addedAt={client.addedAt} />

            <form className="form-card" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Note:</label>
                    <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g Submit Proposal"/>
                </div>
                <button className="btn-primary" type="submit">Add Note</button>
            </form>

            <div className="notes-list">
                <h3>Notes</h3>
                {(!client.notes || client.notes.length === 0) && <p>No notes yet.</p>}
                {client.notes && [...client.notes].reverse().map((note, i) => (
                    <div key={i} className="note-item">
                    <p>{note.text}</p>
                    <small>{new Date(note.timestamp).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClientDetailPage;