import { apiFetch, BASE_URL } from "./api_fetch.js";

function MatchService() {
  if (!MatchService.instance) {
    MatchService.instance = this;
  }
  return MatchService.instance;
}

MatchService.prototype.list = ({page}) =>
  apiFetch(`${BASE_URL}/matches?page=${page}`, {
    method: "GET",
  });

export default MatchService;
