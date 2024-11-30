import Cookies from "universal-cookie";

class CookiesManager {
  private cookies: Cookies;
  constructor() {
    this.cookies = new Cookies();
  }
  add(name: string, value: string, days: number = 7) {
    const maxAge = days * 24 * 60 * 60;
    return this.cookies.set(name, value, { path: "/", maxAge });
  }
  get(name: string) {
    return this.cookies.get(name);
  }
  remove(name: string) {
    return this.cookies.remove(name, { path: "/" });
  }
}
const cookiesManager = new CookiesManager();
export default cookiesManager;
