import { searchMoviesApi } from "../api";
import { SEARCH_ERROR, SEARCH_SUCCESS, SEARCH_PENDING } from "./actionTypes";

export function searchMovie(dispatch, name, year, page) {
  dispatch({ type: SEARCH_PENDING });
  searchMoviesApi(name, year, page).then((res) => {
    if (res && res.status < 350 && res.data && res.data.Response == "True") {
      if (res.data.totalResults) {
        dispatch({ type: SEARCH_SUCCESS, payload: res.data });
      } else {
        dispatch({
          type: SEARCH_ERROR,
          message: "No result found for search",
        });
      }
    } else {
      dispatch({
        type: SEARCH_ERROR,
        message: "Something went wrong",
      });
    }
  });
}
