from functools import wraps
from flask import session
from .json_response import JsonResponse


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Sprawdzamy, czy użytkownik jest zalogowany (np. czy jest w sesji)
        if (
            "user" not in session
        ):  # Załóżmy, że 'user_id' to informacja o zalogowanym użytkowniku
            # Jeśli nie jest zalogowany, przekierowujemy do strony logowania
            return JsonResponse(401, "Unauthorized").get_response()
        return f(*args, **kwargs)  # Jeśli jest zalogowany, wywołaj oryginalną funkcję

    return decorated_function
