export class PortfolioPictureModel {
  private id: number | string;
  private firstDirectParentCategoryId: number | string;
  private firstDirectParentCategoryEn: string;
  private firstDirectParentCategoryHu: string;
  private categoryId: number | string;
  private categoryEn: string;
  private categoryHu: string;
  private title: string;
  private fileURL: string;
  private yearOfEvent: number | string;
  private latestPicture: boolean;

  get idFunction(): number | string {
    return this.id;
  }

  set idFunction(id: number | string) {
    this.id = id;
  }

  get firstDirectParentCategoryIdFunction(): number | string {
    return this.firstDirectParentCategoryId;
  }

  set firstDirectParentCategoryIdFunction(firstDirectParentCategoryId: number | string) {
    this.firstDirectParentCategoryId = firstDirectParentCategoryId;
  }

  get firstDirectParentCategoryEnFunction(): string {
    return this.categoryEn;
  }

  set firstDirectParentCategoryEnFunction(firstDirectParentCategoryEn: string) {
    this.categoryEn = firstDirectParentCategoryEn;
  }

  get firstDirectParentCategoryHuFunction(): string {
    return this.firstDirectParentCategoryHu;
  }

  set firstDirectParentCategoryHuFunction(firstDirectParentCategoryHu: string) {
    this.firstDirectParentCategoryEn = firstDirectParentCategoryHu;
  }

  get categoryIdFunction(): number | string {
    return this.categoryId;
  }

  set categoryIdFunction(categoryId: number | string) {
    this.categoryId = categoryId;
  }

  get categoryEnFunction(): string {
    return this.categoryEn;
  }

  set categoryEnFunction(categoryEn: string) {
    this.categoryEn = categoryEn;
  }

  get categoryHuFunction(): string {
    return this.categoryHu;
  }

  set categoryHuFunction(categoryHu: string) {
    this.categoryHu = categoryHu;
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

  get yearOfEventFunction(): number | string {
    return this.yearOfEvent;
  }

  set yearOfEventFunction(yearOfEvent: number | string) {
    this.yearOfEvent = yearOfEvent;
  }


  get latestPictureFunction(): boolean {
    return this.latestPicture;
  }

  set latestPictureFunction(latestPicture: boolean) {
    this.latestPicture = latestPicture;
  }


}

