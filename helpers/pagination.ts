interface ObjectPagination {
    currentPage: number,
    limit: number,
    skip?: number
};

const paginationHelper = (query: Record<string, any>, objPagination: ObjectPagination): ObjectPagination => {
    // pagination
    if (query.page) {
        objPagination.currentPage = parseInt(query.page);
    };

    if (query.limit) {
        objPagination.limit = parseInt(query.limit);
    }

    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limit;


    return objPagination;
    // End pagination
}

export default paginationHelper;