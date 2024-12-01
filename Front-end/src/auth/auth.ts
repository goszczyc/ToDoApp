function isAuthenticated(): boolean {
    const userId = sessionStorage.getItem("user");
    if (userId != null) return true;
    return false;
}

export { isAuthenticated };
