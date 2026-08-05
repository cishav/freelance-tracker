import { useEffect, useRef, useState } from "react";

function AddClientForm({onAddClient}){

    const [name, setName] = useState("");
    const [platform, setPlatform] = useState("");
    const nameInputRef = useRef(null);

    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

    function handleSubmit(e){
        e.preventDefault();
        onAddClient({name, platform, status:"In Progress"});
        setName("");
        setPlatform("");
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
            
            <button className="btn-primary" type="submit">Add Client</button>
        </form>
    )
}

export default AddClientForm;