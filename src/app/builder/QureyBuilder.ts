import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {

  constructor(
    public modelQuery: Query<T[], T>,
    public query: Record<string, unknown>
  ) {}

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  filter() {
    //find 'author' in the query
    const authorId = this.query.author as string;

    if (authorId) {
      this.modelQuery = this.modelQuery.find({
        author: authorId,
      } as FilterQuery<T>);
    }
    return this;
  }

  sort() {

    const sortBy = (this?.query?.sortBy as string) || "createdAt";

    const sortOrder = (this?.query?.sortOrder as string) || "desc";
// combining the sortBy with the order to get the optimum result
    const finalSort = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
    this.modelQuery = this.modelQuery.sort(finalSort);
    return this;
  }
}

export default QueryBuilder;
