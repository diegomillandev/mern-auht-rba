let navigateFn = () => {
    console.warn("navigate() called before initialization");
};

export const setNavigate = (fn) => {
    navigateFn = fn;
};

export const navigate = (...args) => {
    navigateFn(...args);
};