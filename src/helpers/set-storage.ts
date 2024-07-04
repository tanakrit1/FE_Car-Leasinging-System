const setLoginStorage = (profile: any, token: string) => {
    sessionStorage.setItem("profile", JSON.stringify(profile));
    sessionStorage.setItem("token", token);
};

const getLoginStorage = () => {
    const profile: any = sessionStorage?.getItem("profile");
    const token = sessionStorage?.getItem("token");
    return { profile: JSON.parse(profile), token: token}
}

const removeLoginStorage = () => {
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("token");
}

export { setLoginStorage, getLoginStorage, removeLoginStorage }