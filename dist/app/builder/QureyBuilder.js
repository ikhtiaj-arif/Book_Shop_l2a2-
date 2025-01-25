"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: "i" },
                })),
            });
        }
        return this;
    }
    filter() {
        //find 'author' in the query
        const authorId = this.query.author;
        if (authorId) {
            this.modelQuery = this.modelQuery.find({
                author: authorId,
            });
        }
        return this;
    }
    sort() {
        var _a, _b;
        const sortBy = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || "createdAt";
        const sortOrder = ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) || "desc";
        // combining the sortBy with the order to get the optimum result
        const finalSort = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;
        this.modelQuery = this.modelQuery.sort(finalSort);
        return this;
    }
}
exports.default = QueryBuilder;
