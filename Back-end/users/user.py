class User:
    def __init__(self, user_id: int = 0, email: str = "", password: str = ""):
        self.user_id = user_id
        self.email = email
        self.password = password