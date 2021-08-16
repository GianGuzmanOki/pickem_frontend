import { apiFetch, BASE_URL } from "./api_fetch.js";

function PickService() {
  if (!PickService.instance) {
    PickService.instance = this;
  }
  return PickService.instance;
}

PickService.prototype.create = (pick) =>
  apiFetch(`${BASE_URL}/picks`, {
    method: "POST",
    body: JSON.stringify(pick),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  });

export default PickService;
