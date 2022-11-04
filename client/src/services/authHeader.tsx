export default function authHeader() {
  const accessTocken = localStorage.getItem("accessTocken");
  if (accessTocken) {
    return { Authorization: "Bearer " + accessTocken };
  } else {
    return { Authorization: "" };
  }
}
