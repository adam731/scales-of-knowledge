export const loginFetch = async (username, password) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    if (data.success === true) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } else {
      return true;
    }
  }
};

export const questionsFetch = async (username, password) => {
  const response = await fetch("/api/questions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
};