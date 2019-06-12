import EventEmitter from "./services/event-emmiter";
import "babel-polyfill";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();

    this.model = model;
    this.view = view;

    view.on("fetch", this.fetchRepos.bind(this));
    view.on("paginate", this.paginateRepos.bind(this));
    view.on("type-filter", this.filterWithType.bind(this));
  }

  fetchRepos(username) {
    this.model
      .fetchRepos(username)
      .then(data => this.view.showFoundRepos(data));
  }

  paginateRepos() {
    this.model.paginateRepos().then(data => this.view.showFoundRepos(data));
  }

  filterWithType(type) {
    this.model
      .filterWithType(type)
      .then(data => this.view.showFoundRepos(data))
      .catch(err => console.log(err));
  }
}
