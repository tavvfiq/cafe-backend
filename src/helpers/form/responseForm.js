const responseForm = {
  success: function (res, data, status) {
    const responseObj = {
      isSuccess: true,
      status: status,
      data: data,
    };
    res.json(responseObj);
  },
  error: function (res, err, status) {
    const responseObj = {
      isSuccess: false,
      status: status,
      data: err,
    };
    res.json(responseObj);
  },
  pagination: function (query, res, data, status) {
    let page = query.page;
    let limit = 0;
    let prevPage = "";
    let nextPage = "";
    if (data.length !== 0) {
      page = Number(query.page);
      limit = Number(query.limit);
      prevPage =
        page === 1
          ? ""
          : `/menu?search=${query.search}&sortby=${query.sortby}&order=${
              query.order
            }&page=${page - 1}&limit=${limit}`;
      nextPage = `/menu?search=${query.search}&sortby=${query.sortby}&order=${
        query.order
      }&page=${page + 1}&limit=${limit}`;
    }
    const resObj = {
      isSuccess: true,
      status: status,
      data,
      pageInfo: {
        page,
        prevPage,
        nextPage,
      },
    };
    res.json(resObj);
  },
};

module.exports = responseForm;
