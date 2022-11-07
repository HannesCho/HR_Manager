export default function authHeader() {
  const accessToken = localStorage.getItem("accessTocken");
  if (accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return { Authorization: "" };
  }
}
