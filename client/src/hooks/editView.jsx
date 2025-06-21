import React, { useCallback } from "react";
import { useMemo, useState } from "react";

export default function useEditView() {
    const [checked, setChecked] = useState(false);
    const toggleChecked = useCallback((event) => {
        setChecked(event.target.checked);
    }, [setChecked]);
    const view = useMemo(() => (
        <div className="grid grid-cols-3 mb-4 md:mb-8">
            {!checked ? <p className="text-primary text-right">Write</p> : <p></p>}
            <div className="flex items-center justify-center">
                <input type="checkbox" onChange={toggleChecked} className="toggle border-primary text-primary checked:border-accent checked:text-accent" />
            </div>
            {checked ? <p className="text-accent text-left">Preview</p> : <p></p>}
        </div>
    ), [checked, toggleChecked]);
    return [view, checked];
}