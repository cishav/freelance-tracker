import { useState, memo } from "react";
import TimeSinceAdded from "./TimeSinceAdded";

function ClientCard({ name, platform, status, addedAt, onMarkPaid, onUpdate, onDelete }){

    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(name);
    const [editPlatform, setEditPlatform] = useState(platform);

    let paidMessage;
    if(status === 'Paid'){
        paidMessage = <p className="paid-message">✅ Payment received</p>;
    }

    function handleSave(){
        onUpdate({ name: editName, platform: editPlatform });
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
                <div className="card-actions">
                    <button className="btn-primary" onClick={handleSave}>Save</button>
                    <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            </div>
        )
    }

    return (
        <div className="client-card">
            <h2>Name: {name}</h2>
            <p>Platform: {platform}</p>
            <p>Status : {status}</p>
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