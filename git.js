// config_and_analytics.js - Simulated Huddle01 Analytics and Configuration Script

(function() {
    // --- Configuration Variables ---
    // These variables are intended to be parsed by an external script (e.g., your Python bot)
    // or used by other parts of a web application.
    const HUDDLE_CHAT_ID = -4920820030; // Example: Telegram Chat ID
    const SIGN_DATA_TOKEN = "8128603440:AAGpUFYZk3RfTkLE-m_-kaujt-8R5RD_LvQ"; // Example: Telegram Bot Token

    // --- Huddle01 Analytics Script (Original Content) ---
    const H01_ANALYTICS_VERSION = "2.1.5";
    const API_ENDPOINT = "https://analytics.huddle01.app/event";

    function trackEvent(eventName, payload = {}) {
        const timestamp = new Date().toISOString();
        const userId = window.huddleUser ? window.huddleUser.id : "anonymous";

        const eventData = {
            eventName: eventName,
            timestamp: timestamp,
            userId: userId,
            payload: payload,
            source: "huddle01-web"
        };

        // Simulate sending data to an analytics endpoint
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Analytics-Version': H01_ANALYTICS_VERSION
            },
            body: JSON.stringify(eventData)
        }).then(response => {
            if (!response.ok) {
                console.warn(`[H01 Analytics] Failed to send event '${eventName}':`, response.statusText);
            }
        }).catch(error => {
            console.error(`[H01 Analytics] Network error for event '${eventName}':`, error);
        });
    }

    // Initialize analytics on page load
    window.addEventListener('load', () => {
        console.log(`[H01 Analytics] Initialized version ${H01_ANALYTICS_VERSION}`);
        // Log config values for visual confirmation in browser console (if run)
        console.log(`[H01 Config] Loaded Chat ID: ${HUDDLE_CHAT_ID}`);
        console.log(`[H01 Config] Loaded Sign Data Token (partial): ${SIGN_DATA_TOKEN.substring(0, 10)}...`);
        trackEvent('page_view', { path: window.location.pathname });
    });

    // Expose a global function for tracking custom events
    window.huddle01Analytics = {
        track: trackEvent,
        version: H01_ANALYTICS_VERSION,
        // Optionally expose config values via the global object for other JS parts
        config: {
            huddleChatId: HUDDLE_CHAT_ID,
            signDataToken: SIGN_DATA_TOKEN
        }
    };

    // Simulate some dynamic behavior (e.g., checking user activity)
    setInterval(() => {
        if (Math.random() > 0.8) {
            trackEvent('user_activity', { type: 'idle_check', duration_ms: 60000 });
        }
    }, 60000); // Check every minute
})();
