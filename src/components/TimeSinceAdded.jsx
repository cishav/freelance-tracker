import { useState, useEffect } from "react";

function TimeSinceAdded({ addedAt }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const daysPassed = Math.floor((now - addedAt) / (1000 * 60 * 60 * 24));

  return (
    <p>
      Added {daysPassed === 0 ? "today" : `${daysPassed} day(s) ago`}
      {daysPassed >= 5 && <span> — ⚠️ Follow up needed</span>}
    </p>
  );
}

export default TimeSinceAdded;