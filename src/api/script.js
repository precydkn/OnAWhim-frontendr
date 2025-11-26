const BACKEND_URL = "https://onawhim-backend-kli7.onrender.com";

//---login function---
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        return { ok: response.ok, data };
    } catch (err) {
        return { ok: false, data: { error: 'Network error' } };
    }
};
//---

//---signup function---
export const signupUser = async (email, password) => {
    try {
        const response = await fetch(`${BACKEND_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        return { ok: response.ok, data };
    } catch (err) {
        return { ok: false, data: { error: 'Network error' } };
    }
};
//---