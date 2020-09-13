const responseForm = {
  success: function (res, data, status) {
    const responseObj = {
      isSuccess: true,
      status: status,
      data,
    };
    res.json(responseObj);
  },
  menuResponse: function (res, menu, status) {
    const responseObj = {
      isSuccess: true,
      status: status,
      menu,
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
  pagination: function (query, res, { menu }, status) {
    let page = query.page;
    let limit = 0;
    let prevPage = "";
    let nextPage = "";
    if (menu.length !== 0) {
      if (query.filter === undefined) {
        page = Number(query.page);
        limit = Number(query.limit);
        prevPage =
          page === 1
            ? ""
            : `/menu?search=${query.search}&sortby=${query.sortby}&order=${
                query.order
              }&page=${page - 1}&limit=${limit}`;
        menu.length < limit
          ? ""
          : (nextPage = `/menu?search=${query.search}&sortby=${
              query.sortby
            }&order=${query.order}&page=${page + 1}&limit=${limit}`);
      } else {
        page = Number(query.page);
        limit = Number(query.limit);
        prevPage =
          page === 1
            ? ""
            : `/menu?search=${query.search}&filter=${query.filter}&sortby=${
                query.sortby
              }&order=${query.order}&page=${page - 1}&limit=${limit}`;
        menu.length < limit
          ? ""
          : (nextPage = `/menu?search=${query.search}&filter=${
              query.filter
            }&sortby=${query.sortby}&order=${query.order}&page=${
              page + 1
            }&limit=${limit}`);
      }
    }
    const resObj = {
      isSuccess: true,
      status: status,
      menu,
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
