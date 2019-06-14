import { fetchRepos } from "./services/fetch";
export default class Model {
  constructor() {
    this.pageToPaginate = 1;
    this.searchName = "";
    this.fetchedRepos = [];
    this.reposList = [];
    this.filter = {
      type: ""
    };
    this.sortOption = "";
  }

  fetchRepos(name) {
    this.searchName = name;
    return fetchRepos(name).then(data => {
      this.fetchedRepos = data;
      this.reposList = data;
      return data;
    });
  }

  paginateRepos() {
    return fetchRepos(this.searchName, (this.pageToPaginate += 1)).then(
      nextData => {
        this.fetchedRepos.push(...nextData);
        return this.reposList;
      }
    );
  }

  filterWithType(type = "all") {
    this.filter.type = type;
    return new Promise((res, rej) => {
      if (type === "forks") {
        res((this.reposList = this.reposList.filter(item => item.fork)));
      } else {
        this.reposList = this.fetchedRepos;
        res(this.fetchedRepos);
      }
    });
  }

  sortReposList(option) {
    return this.filterWithType(this.filter.type).then(data => {
      this.sortOption = option;
      if (option !== this.sortOption) {
        return data.sort((a, b) =>
          String(a[option]).toUpperCase() > String(b[option]).toUpperCase()
            ? 1
            : -1
        );
      } else {
        return data;
      }
    });
  }

  reverseReposList() {
    return this.reposList.reverse();
  }
}
