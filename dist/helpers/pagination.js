"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const paginationHelper = (query, objPagination) => {
    if (query.page) {
        objPagination.currentPage = parseInt(query.page);
    }
    ;
    if (query.limit) {
        objPagination.limit = parseInt(query.limit);
    }
    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limit;
    return objPagination;
};
exports.default = paginationHelper;
