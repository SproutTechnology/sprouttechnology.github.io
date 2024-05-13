import { useState, useEffect } from "react";

export function useCurrentView() {
    const offsetTop = 100;

    const [currentView, setCurrentView] = useState<string>("");

    const handleScroll = () => {
        const views = document.querySelectorAll('div[data-type="ViewContainer"]');

        for (let index = 0; index < views.length; index++) {
            const view = views[index];

            const viewRect = view.getBoundingClientRect();
            const top = viewRect.top + viewRect.height - offsetTop;

            if (top > 0 && top <= viewRect.height) {
                setCurrentView(view.id || "");
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const location = window.location.toString().split("#")[0];
        if (currentView === "") {
            history.replaceState(null, "", location);
        } else {
            history.replaceState(null, "", location + "#" + currentView);
        }
    }, [currentView]);

    return currentView;
}
