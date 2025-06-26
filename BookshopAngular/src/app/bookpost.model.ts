export class BookPost {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public genre: string,
    public description: string,
    public condition: string,
    public price: number,
    public imageUrl: string,
    public userId: number,
    public date?: string | null,
  ) {}
}
