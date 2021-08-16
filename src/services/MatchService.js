import { apiFetch, BASE_URL } from "./api_fetch.js";

function MatchService() {
  if (!MatchService.instance) {
    MatchService.instance = this;
  }
  return MatchService.instance;
}

MatchService.prototype.list = () =>
  apiFetch(`${BASE_URL}/matches`, {
    method: "GET",
  });

export default MatchService;
