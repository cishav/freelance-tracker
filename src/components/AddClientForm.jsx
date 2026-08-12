import { useContext, useEffect, useRef, useState } from "react";
import ToastContext from "../context/ToastContext";

function AddClientForm({onAddClient}){

    const [name, setName] = useState("");
    const [platform, setPlatform] = useState("");
    const nameInputRef = useRef(null);
    const { showToast } = useContext(ToastContext);
    const [paymentAmount, setPaymentAmount] = useState('');

    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

    function handleSubmit(e){
        e.preventDefault();
        onAddClient({name, platform, status:"In Progress", paymentAmount: Number(paymentAmount) || 0});
        setName("");
        setPlatform("");
        setPaymentAmount(0);
    }

    return (
        <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Client Name</label>
                <input ref={nameInputRef} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Client name"/>
            </div>

            <div className="form-group">
                <label>Platform</label>
                <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="e.g. Upwork, Fiverr, Direct"/>
            </div>

            <div className="form-group">
                <label>Payment Amount (In USD)</label>
                <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="e.g. 1 USD"/>
            </div>
            
            <button className="btn-primary" type="submit">Add Client</button>
        </form>
    )
}

export default AddClientForm;