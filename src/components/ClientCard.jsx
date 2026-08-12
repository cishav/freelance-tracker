import { useState, memo, useContext } from "react";
import TimeSinceAdded from "./TimeSinceAdded";
import { Link } from "react-router-dom";
import ToastContext from "../context/ToastContext";
import CurrencyContext from "../context/CurrencyContext";

function ClientCard({ name, platform, status, paymentAmount, addedAt, onMarkPaid, onUpdate, onDelete }){

    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(name);
    const [editPlatform, setEditPlatform] = useState(platform);
    const [editPaymentAmount, setEditPaymentAmount] = useState(paymentAmount);
    const { showToast } = useContext(ToastContext);
    const { currency, rate } = useContext(CurrencyContext);

    const displayAmount = currency === "NPR" && rate
        ? `NPR ${(paymentAmount * rate).toFixed(2)}`
        : `USD ${paymentAmount.toFixed(2)}`;

    let paidMessage;
    if(status === 'Paid'){
        paidMessage = <p className="paid-message">✅ Payment received</p>;
    }

    function handleSave(){
        onUpdate({ name: editName, platform: editPlatform, paymentAmount: Number(editPaymentAmount) || 0 });
        setIsEditing(false);
    }

    if(isEditing){
        return (
            <div className="client-card">
                <div className="form-group">
                    <input type="text" value={editName} placeholder="Edit Name" onChange={(e) => setEditName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="text" value={editPlatform} placeholder="Edit Platform" onChange={(e) => setEditPlatform(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="number" value={editPaymentAmount} placeholder="Edit Payment Amount" onChange={(e) => setEditPaymentAmount(e.target.value)} />
                </div>
                <div className="card-actions">
                    <button className="btn-primary" onClick={handleSave}>Save</button>
                    <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </div>
        )
    }

    return (
        <div className="client-card">
            <h2>Name: <Link to={`/clients/${addedAt}`}>{name}</Link></h2>
            <p>Platform: {platform}</p>
            <p>Status : {status}</p>
            <p>Payment Amount : {displayAmount}</p>
            <TimeSinceAdded addedAt={addedAt} />
            {paidMessage}
            <div className="card-actions">
                {status !== "Paid" && (
                    <button className="btn-success" onClick={onMarkPaid}>Mark as Paid</button>
                )}
                <button className="btn-secondary" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="btn-danger" onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default memo(ClientCard);