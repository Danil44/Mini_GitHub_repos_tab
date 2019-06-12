import { fetchRepos } from "./services/fetch";
export default class Model {
  constructor() {
    this.pageToPaginate = 1;
    this.searchName = "";
    this.searchReposData = [];
    this.selectedType = "all";
  }

  fetchRepos(username) {
    this.searchName = username;

    return fetchRepos(this.searchName).then(data => {
      this.searchReposData = data;
      return this.filterWithType(this.selectedType);
    });
  }

  paginateRepos() {
    if (this.searchName)
      return fetchRepos(this.searchName, (this.pageToPaginate += 1)).then(
        data => {
          data.forEach(item => {
            this.searchReposData.push(item);
          });

          return this.filterWithType(this.selectedType);
        }
      );
  }

  filterWithType(type) {
    this.selectedType = type;
    return new Promise((resolve, reject) => {
      if (type === "forks") {
        resolve(this.searchReposData.filter(item => item.fork));
      }
      resolve(this.searchReposData);
    });
  }
}
