// import { FilterQuery, Query } from "mongoose";

// class QueryBuilder<T> {
//   constructor(
//     public modelQuery: Query<T[], T>,
//     public query: Record<string, unknown>
//   ) {}

//   search(searchableFields: string[]) {
//     const search = this?.query?.search;
//     if (search) {
//       this.modelQuery = this.modelQuery.find({
//         $or: searchableFields.map(
//           (field) =>
//             ({
//               [field]: { $regex: search, $options: "i" },
//             } as FilterQuery<T>)
//         ),
//       });
//     }
//     return this;
//   }

//   // filter() {
//   //   //find 'author' in the query
//   //   const authorId = this.query.author as string;

//   //   if (authorId) {
//   //     this.modelQuery = this.modelQuery.find({
//   //       author: authorId,
//   //     } as FilterQuery<T>);
//   //   }
//   //   return this;
//   // }
//   filter() {
//     const queryObj = { ...this.query };

//     const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
//     excludeFields.forEach((el) => delete queryObj[el]);

//     // Handle special filters
//     const filterObj: Record<string, unknown> = {};

//     for (const [key, value] of Object.entries(queryObj)) {
//       if (key === "categoryId") {
//         filterObj["category._id"] = value;
//       } else {
//         filterObj[key] = value;
//       }
//     }

//     this.modelQuery = this.modelQuery.find(filterObj as FilterQuery<T>);

//     return this;
//   }

//   sort() {
//     const sortBy = (this?.query?.sortBy as string) || "createdAt";

//     const sortOrder = (this?.query?.sortOrder as string) || "desc";
//     // combining the sortBy with the order to get the optimum result
//     const finalSort = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
//     this.modelQuery = this.modelQuery.sort(finalSort);
//     return this;
//   }
// }

// export default QueryBuilder;
import mongoose, { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search by multiple fields using $or + regex
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm as string;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    const filterObj: Record<string, unknown> = {};

    const specialFiltersMap: Record<string, string> = {
      categoryId: "category",
    };

    for (const [key, value] of Object.entries(queryObj)) {
      const dbKey = specialFiltersMap[key] || key;
      console.log("dbKey", dbKey);
      if (value === "true") {
        filterObj[dbKey] = true;
      } else if (value === "false") {
        filterObj[dbKey] = false;
      }
      // Convert value to ObjectId if the key ends with 'Id'
      else if (
        key.toLowerCase().endsWith("id") &&
        mongoose.Types.ObjectId.isValid(value as string)
      ) {
        filterObj[dbKey] = new mongoose.Types.ObjectId(value as string);
      } else if (
        dbKey === "rating" &&
        typeof value === "string" &&
        !isNaN(parseFloat(value))
      ) {
        filterObj[dbKey] = { $gte: parseFloat(value) };
      } else {
        filterObj[dbKey] = value;
      }
    }

    this.modelQuery = this.modelQuery.find(filterObj as FilterQuery<T>);

    return this;
  }

  // Sort by multiple fields (comma separated), default to -createdAt
  sort() {
    const sort =
      (this.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  // Paginate with default page=1 and limit=10
  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // Select specific fields, default to excluding __v
  fields() {
    const fields =
      (this.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
