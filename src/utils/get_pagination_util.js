'use strict';

const gapPagination = (currentRoute, reqParams, limit, totalBlogs) => {
    const currentPage = Number(reqParams.pageNumber) || 1;
    const skip = limit * (currentPage - 1);
    const totalPage = Math.ceil(totalBlogs / limit);

    const paginationObj = {
        next: totalBlogs > (currentPage * limit) ? `${currentRoute}page/${currentPage + 1}` : 
        null,
        prev: skip && currentPage < totalPage ? `${currentRoute}page/${currentPage - 1}` : 
        null,
        totalPage,
        currentPage,
        skip,
        limit
    };

    return paginationObj;
};

module.exports = gapPagination;