function isAuthenticated(): boolean {
    const userId = sessionStorage.getItem("user");
    console.log(userId);
    if (userId != null) return true;
    return false;
}

export { isAuthenticated };
