export class PortfolioPictureModel {
  private id: string;
  private nodeId: string;
  private subfolder: string;
  private category: string;
  private title: string;
  private fileURL: string;
  private createDate: string;

  get idFunction(): string {
    return this.id;
  }

  set idFunction(id: string) {
    this.id = id;
  }

  get nodeIdFunction(): string {
    return this.nodeId;
  }

  set nodeIdFunction(nodeId: string) {
    this.nodeId = nodeId;
  }

  get subfolderFunction(): string {
    return this.subfolder;
  }

  set subfolderFunction(subfolder: string) {
    this.subfolder = subfolder;
  }

  get categoryFunction(): string {
    return this.category;
  }

  set categoryFunction(category: string) {
    this.category = category;
  }

  get titleFunction(): string {
    return this.title;
  }

  set titleFunction(title: string) {
    this.title = title;
  }

  get fileURLFunction(): string {
    return this.fileURL;
  }

  set fileURLFunction(filename: string) {
    this.fileURL = filename;
  }

  get dateOfEventFunction(): string {
    return this.createDate;
  }

  set dateOfEventFunction(createDate: string) {
    this.createDate = createDate;
  }

}

