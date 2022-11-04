export default function authHeader() {
  const userStr = localStorage.getItem("user");
  const accessTocken = localStorage.getItem("accessTocken");
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user && accessTocken) {
    return { Authorization: "Bearer " + accessTocken };
  } else {
    return { Authorization: "" };
  }
}
