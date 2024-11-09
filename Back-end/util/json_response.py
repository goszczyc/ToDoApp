class JsonResponse:

    def __init__(self, http_code: int, message: str = "", data: dict | None = None):
        self.http_code = http_code
        self.message = message
        self.data = data

    def get_response(self) -> tuple[dict, int]:
        return {"message": self.message, "data": self.data}, self.http_code
